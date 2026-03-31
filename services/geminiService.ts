
import { GoogleGenAI, ThinkingLevel, Type } from "@google/genai";
import { PASSENGER_PROFILES } from "@/src/data/passengerProfiles";
import AddressManager from "@/src/services/addressManager";

// Cache de Rotas OSRM - Versão 6 (Limpa caches antigos de linhas retas)
const CACHE_KEY = 'UBER_V6_ROUTE_CACHE_FIXED';
const ROUTE_CACHE: Record<string, any> = (() => {
  try {
    const saved = localStorage.getItem(CACHE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    return {};
  }
})();

export const getCachedRoute = (key: string) => {
  return ROUTE_CACHE[key];
};

export const setCachedRoute = (key: string, data: any) => {
  // NUNCA salvar rotas mockadas/retas no cache persistente
  if (!data || data.isMock) return;
  
  ROUTE_CACHE[key] = data;
  try {
    const keys = Object.keys(ROUTE_CACHE);
    if (keys.length > 150) {
      delete ROUTE_CACHE[keys[0]];
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(ROUTE_CACHE));
  } catch (e) {
    console.warn("Erro ao salvar cache de rotas:", e);
  }
};

// Lista ampliada de mirrors do OSRM
const OSRM_ENDPOINTS = [
  "https://router.project-osrm.org/route/v1/driving/",
  "https://routing.openstreetmap.de/routed-car/route/v1/driving/",
  "https://routing.openstreetmap.de/routed-bike/route/v1/driving/", // Fallback de emergência
  "https://osrm.map.ir/route/v1/driving/"
];

let currentEndpointIndex = 0;

const getNextEndpoint = () => {
  const endpoint = OSRM_ENDPOINTS[currentEndpointIndex];
  currentEndpointIndex = (currentEndpointIndex + 1) % OSRM_ENDPOINTS.length;
  return endpoint;
};

/**
 * Tenta buscar a rota em múltiplos mirrors com timeout agressivo
 */
export const fetchRouteFromOSRM = async (pickup: [number, number], destination: [number, number], retries = 3): Promise<any> => {
  const pickupStr = `${pickup[1]},${pickup[0]}`;
  const destStr = `${destination[1]},${destination[0]}`;
  
  for (let i = 0; i <= retries; i++) {
    const baseUrl = getNextEndpoint();
    const url = `${baseUrl}${pickupStr};${destStr}?overview=full&geometries=geojson`;
    
    try {
      const response = await withTimeout(fetch(url), 5000, null);
      
      if (response && response.ok) {
        const data = await response.json();
        if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
          return data.routes[0].geometry;
        }
      }
    } catch (e) {
      console.error(`[OSRM] Falha no mirror ${baseUrl}`);
    }
    
    // Delay curto entre tentativas
    await new Promise(r => setTimeout(r, 300));
  }
  
  return null;
};

/**
 * ESTRATÉGIA AGRESSIVA: Usa a Inteligência Artificial para "desenhar" a rota seguindo as ruas
 * quando o OSRM está totalmente bloqueado.
 */
export const fetchRouteFromAI = async (pickup: string, destination: string, city: string): Promise<any> => {
  console.log(`[🤖 AI Route] OSRM bloqueado. Solicitando rota inteligente para Gemini...`);
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || (window as any).process?.env?.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Você é um motorista experiente em ${city}. 
      Gere uma rota detalhada que siga as ruas reais de "${pickup}" até "${destination}".
      Retorne APENAS um objeto JSON válido no formato GeoJSON do tipo LineString com pelo menos 30 coordenadas [longitude, latitude] que descrevam o trajeto exato pelas vias.
      IMPORTANTE: Retorne APENAS o JSON, sem blocos de código markdown, sem explicações.`,
      config: {
        responseMimeType: "application/json"
      }
    });

    if (response.text) {
      let text = response.text.trim();
      // Remove possíveis blocos de código markdown se a IA ignorar o prompt
      if (text.startsWith('```')) {
        text = text.replace(/```json|```/g, '').trim();
      }
      
      const geojson = JSON.parse(text);
      if (geojson.type === "LineString" && Array.isArray(geojson.coordinates) && geojson.coordinates.length > 2) {
        console.log(`[🤖 AI Route] Rota gerada com sucesso pela IA (${geojson.coordinates.length} pontos).`);
        return geojson;
      }
    }
  } catch (e) {
    console.error("[🤖 AI Route] Erro ao gerar rota via IA:", e);
  }
  return null;
};

/**
 * Gera uma rota mockada de última instância (não deve ser usada se a IA funcionar)
 * Agora com um padrão de "grade" para parecer mais com ruas do que uma linha reta.
 */
export const generateMockRoute = (pickup: [number, number], destination: [number, number]) => {
  const points = [];
  const steps = 25;
  
  // Ponto inicial
  points.push([pickup[1], pickup[0]]);

  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    
    // Interpolação básica
    let lat = pickup[0] + (destination[0] - pickup[0]) * t;
    let lng = pickup[1] + (destination[1] - pickup[1]) * t;
    
    // Adiciona um padrão de "escada" (grade) com jitter
    // Isso faz com que a linha pareça seguir quarteirões
    const gridEffect = Math.sin(t * steps * 0.8) * 0.0008;
    const jitter = (Math.random() - 0.5) * 0.0004;
    
    if (i % 2 === 0) {
      lat += gridEffect + jitter;
    } else {
      lng += gridEffect + jitter;
    }
    
    points.push([lng, lat]);
  }
  
  // Ponto final
  points.push([destination[1], destination[0]]);

  return {
    type: "LineString",
    coordinates: points,
    isMock: true
  };
};

/**
 * Helper para timeout em promessas
 */
const withTimeout = <T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms))
  ]);
};

/**
 * Função principal de geração de viagens
 */
export const generateTripRequest = async (city: string, tripType: string = 'UberX', _lastTripIndex?: number, driverCoords?: [number, number]) => {
  const timestamp = Date.now();
  const cityNormalized = city.trim();
  
  const cycleIndex = AddressManager.getNextIndex(cityNormalized);
  const cityAddresses = await AddressManager.getAddressesForCity(cityNormalized);
  const realAddr = cityAddresses[cycleIndex % cityAddresses.length];

  const passenger = PASSENGER_PROFILES[cycleIndex];
  
  const pickupAddress = realAddr.pickup.address;
  const destinationAddress = realAddr.destination.address;
  const pickupCoords = [realAddr.pickup.lat, realAddr.pickup.lng] as [number, number];
  const destinationCoords = [realAddr.destination.lat, realAddr.destination.lng] as [number, number];

  // 4. Busca de Rota com Hierarquia de Falha
  let routeGeometry = null;
  const routeKey = `${pickupCoords[0].toFixed(4)},${pickupCoords[1].toFixed(4)}|${destinationCoords[0].toFixed(4)},${destinationCoords[1].toFixed(4)}`;
  
  const cached = getCachedRoute(routeKey);
  if (cached) {
    routeGeometry = cached;
  } else {
    // 1ª Tentativa: OSRM Mirrors
    routeGeometry = await fetchRouteFromOSRM(pickupCoords, destinationCoords);
    
    // 2ª Tentativa (Agressiva): Gemini AI gerando rota pelas ruas
    if (!routeGeometry) {
      routeGeometry = await fetchRouteFromAI(pickupAddress, destinationAddress, cityNormalized);
    }
    
    if (routeGeometry) {
      setCachedRoute(routeKey, routeGeometry);
    } else {
      // Último recurso: Mock visual
      routeGeometry = generateMockRoute(pickupCoords, destinationCoords);
    }
  }

  // 5. Cálculos de Preço e Distância
  const basePrice = 15 + (cycleIndex * 8) + Math.random() * 5;
  const tripDistNum = 5 + (cycleIndex * 3);
  const tripDurNum = Math.floor(tripDistNum * 2.2);

  return {
    id: `TRIP-${city.substring(0,3).toUpperCase()}-${timestamp}-${cycleIndex + 1}`,
    passengerName: passenger.name.split(' ')[0],
    fullName: passenger.name,
    rating: passenger.rating,
    ratingCount: passenger.trips,
    passengerImage: passenger.image,
    passengerBio: passenger.bio,
    passengerJoined: passenger.joinedDate,
    distanceToPickup: `${(0.8 + cycleIndex * 0.5).toFixed(1)} km`,
    timeToPickup: `${3 + cycleIndex} min`,
    tripDistance: `${tripDistNum.toFixed(1)} km`,
    duration: `${tripDurNum} min`,
    price: basePrice,
    surgePrice: 1.0 + (cycleIndex * 0.1),
    pickup: pickupAddress,
    destination: destinationAddress,
    pickupCoords,
    destinationCoords,
    routeGeometry,
    type: tripType,
    timestamp,
    cycleIndex: cycleIndex + 1
  };
};

/**
 * Gera uma viagem instantânea (Fallback de emergência)
 */
export const generateInstantMockTrip = async (city: string, tripType: string = 'UberX') => {
  const timestamp = Date.now();
  const cityNormalized = city.trim();
  const cycleIndex = AddressManager.getNextIndex(cityNormalized);
  const passenger = PASSENGER_PROFILES[cycleIndex];
  
  const cityAddresses = await AddressManager.getAddressesForCity(cityNormalized);
  const realAddr = cityAddresses[cycleIndex % cityAddresses.length];

  return {
    id: `TRIP-MOCK-${timestamp}-${cycleIndex + 1}`,
    passengerName: passenger.name.split(' ')[0],
    fullName: passenger.name,
    rating: passenger.rating,
    ratingCount: passenger.trips,
    passengerImage: passenger.image,
    passengerBio: passenger.bio,
    passengerJoined: passenger.joinedDate,
    distanceToPickup: "1.2 km",
    timeToPickup: "4 min",
    tripDistance: "8.5 km",
    duration: "18 min",
    price: 25.50,
    surgePrice: 1.0,
    pickup: realAddr.pickup.address,
    destination: realAddr.destination.address,
    pickupCoords: [realAddr.pickup.lat, realAddr.pickup.lng],
    destinationCoords: [realAddr.destination.lat, realAddr.destination.lng],
    routeGeometry: null,
    type: tripType,
    timestamp,
    cycleIndex: cycleIndex + 1
  };
};

/**
 * Pre-carrega os dados da cidade e as 5 rotas do ciclo para latência zero
 * Agora de forma SEQUENCIAL e com rotação de mirrors para evitar 429.
 */
export const preloadCityData = async (city: string) => {
  console.log(`[🚀 Preload] Iniciando pré-carregamento para: ${city}`);
  const cityAddresses = await AddressManager.getAddressesForCity(city);
  
  if (!cityAddresses || cityAddresses.length === 0) {
    console.warn(`[🚀 Preload] Nenhum endereço encontrado para ${city}`);
    return;
  }

  // Execução SEQUENCIAL para evitar 429 (Too Many Requests)
  for (let i = 0; i < cityAddresses.length; i++) {
    const addr = cityAddresses[i];
    const pCoords: [number, number] = [addr.pickup.lat, addr.pickup.lng];
    const dCoords: [number, number] = [addr.destination.lat, addr.destination.lng];
    const routeKey = `${pCoords[0].toFixed(4)},${pCoords[1].toFixed(4)}|${dCoords[0].toFixed(4)},${dCoords[1].toFixed(4)}`;
    
    // Se já estiver no cache, pula
    if (getCachedRoute(routeKey)) continue;

    try {
      console.log(`[🚀 Preload] Carregando rota ${i + 1}/5 para ${city}...`);
      let routeGeometry = await fetchRouteFromOSRM(pCoords, dCoords);
      
      if (!routeGeometry) {
        console.log(`[🚀 Preload] OSRM falhou para rota ${i + 1}. Tentando IA...`);
        routeGeometry = await fetchRouteFromAI(addr.pickup.address, addr.destination.address, city);
      }

      if (routeGeometry) {
        setCachedRoute(routeKey, routeGeometry);
        console.log(`[🚀 Preload] Rota ${i + 1} salva no cache.`);
      } else {
        // Se falhar tudo, não cacheia mock no preload para permitir tentativa real depois
        console.log(`[🚀 Preload] Rota ${i + 1} falhou totalmente (OSRM + IA).`);
      }
      
      // Delay de 1.2s entre requisições de preload para ser mais "educado" com a API
      await new Promise(r => setTimeout(r, 1200));
    } catch (e) {
      console.warn(`[🚀 Preload] Falha ao pré-carregar rota ${i + 1}:`, e);
    }
  }
  
  console.log(`[🚀 Preload] Finalizado para ${city}.`);
};

export const cacheRoute = async (pCoords: [number, number], dCoords: [number, number], pickupAddr?: string, destAddr?: string, city?: string) => {
  const routeKey = `${pCoords[0].toFixed(4)},${pCoords[1].toFixed(4)}|${dCoords[0].toFixed(4)},${dCoords[1].toFixed(4)}`;
  if (!getCachedRoute(routeKey)) {
    let routeGeometry = await fetchRouteFromOSRM(pCoords, dCoords);
    
    if (!routeGeometry && pickupAddr && destAddr && city) {
      routeGeometry = await fetchRouteFromAI(pickupAddr, destAddr, city);
    }

    if (routeGeometry) {
      setCachedRoute(routeKey, routeGeometry);
    }
  }
};

export const getDriverAdvice = async (query: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: "Você é um assistente virtual para motoristas da Uber. Forneça respostas curtas, úteis e profissionais em português.",
      }
    });
    return response.text || "Desculpe, não consegui processar sua solicitação.";
  } catch (error) {
    return "Estou com dificuldades de conexão, mas posso te ajudar com o que está salvo localmente.";
  }
};

export const getCityCoords = async (city: string): Promise<[number, number]> => {
  return await AddressManager.getCityCoords(city);
};
