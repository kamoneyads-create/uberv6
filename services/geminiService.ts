
import { GoogleGenAI, ThinkingLevel, Type } from "@google/genai";
import { PASSENGER_PROFILES } from "@/src/data/passengerProfiles";
import AddressManager from "@/src/services/addressManager";

// Cache de Rotas OSRM para evitar chamadas repetidas e lentidão
const ROUTE_CACHE: Record<string, any> = {};

export const getCachedRoute = (key: string) => {
  return ROUTE_CACHE[key];
};

export const setCachedRoute = (key: string, data: any) => {
  ROUTE_CACHE[key] = data;
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
 * Função principal de geração de viagens - Agora baseada em um CICLO DE SESSÃO (1 a 5) POR CIDADE
 * Utiliza o AddressManager para garantir endereços reais e persistência local.
 */
export const generateTripRequest = async (city: string, tripType: string = 'UberX', _lastTripIndex?: number, driverCoords?: [number, number]) => {
  const timestamp = Date.now();
  const cityNormalized = city.trim();
  
  // 1. Obter o índice do ciclo atual (0 a 4) para esta cidade
  const cycleIndex = AddressManager.getNextIndex(cityNormalized);
  console.log(`[Sessão Ativa] Gerando solicitação ${cycleIndex + 1} de 5 para ${cityNormalized}`);

  // 2. Obter os 5 conjuntos de endereços reais para a cidade
  const cityAddresses = await AddressManager.getAddressesForCity(cityNormalized);
  const realAddr = cityAddresses[cycleIndex % cityAddresses.length];

  // 3. Selecionar Passageiro Único do Ciclo
  const passenger = PASSENGER_PROFILES[cycleIndex];
  
  const pickupAddress = realAddr.pickup.address;
  const destinationAddress = realAddr.destination.address;
  const pickupCoords = [realAddr.pickup.lat, realAddr.pickup.lng] as [number, number];
  const destinationCoords = [realAddr.destination.lat, realAddr.destination.lng] as [number, number];

  console.log(`[Real Address] Usando: ${pickupAddress} -> ${destinationAddress}`);

  // 4. Buscar Rota OSRM (Cache ou API rápida)
  let routeGeometry = null;
  const routeKey = `${pickupCoords[0].toFixed(4)},${pickupCoords[1].toFixed(4)}|${destinationCoords[0].toFixed(4)},${destinationCoords[1].toFixed(4)}`;
  
  const cached = getCachedRoute(routeKey);
  if (cached) {
    routeGeometry = cached;
  } else {
    try {
      const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${pickupCoords[1]},${pickupCoords[0]};${destinationCoords[1]},${destinationCoords[0]}?overview=full&geometries=geojson`;
      
      const routeFetch = fetch(osrmUrl).then(async r => {
        if (!r.ok) throw new Error(`OSRM HTTP error! status: ${r.status}`);
        return r.json();
      });
      
      const routeData = await withTimeout(routeFetch, 3500, null);
      
      if (routeData && routeData.code === 'Ok' && routeData.routes && routeData.routes.length > 0) {
        routeGeometry = routeData.routes[0].geometry;
        setCachedRoute(routeKey, routeGeometry);
      }
    } catch (e) {
      console.error("Erro ao carregar rota OSRM:", e);
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
 * Agora com timeout maior e retentativas para garantir que as rotas estejam prontas.
 */
export const preloadCityData = async (city: string) => {
  console.log(`[🚀 Preload] Iniciando pré-carregamento para: ${city}`);
  const cityAddresses = await AddressManager.getAddressesForCity(city);
  
  if (!cityAddresses || cityAddresses.length === 0) {
    console.warn(`[🚀 Preload] Nenhum endereço encontrado para ${city}`);
    return;
  }

  const promises = cityAddresses.map(async (addr, index) => {
    const pCoords: [number, number] = [addr.pickup.lat, addr.pickup.lng];
    const dCoords: [number, number] = [addr.destination.lat, addr.destination.lng];
    const routeKey = `${pCoords[0].toFixed(4)},${pCoords[1].toFixed(4)}|${dCoords[0].toFixed(4)},${dCoords[1].toFixed(4)}`;
    
    // Se já estiver no cache, pula
    if (getCachedRoute(routeKey)) return;

    // Tenta carregar com timeout maior (5s) para garantir sucesso no background
    try {
      console.log(`[🚀 Preload] Carregando rota ${index + 1}/5 para ${city}...`);
      const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${pCoords[1]},${pCoords[0]};${dCoords[1]},${dCoords[0]}?overview=full&geometries=geojson`;
      const routeFetch = fetch(osrmUrl);
      const response = await withTimeout(routeFetch, 5000, null);
      
      if (response && response.ok) {
        const data = await response.json();
        if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
          setCachedRoute(routeKey, data.routes[0].geometry);
          console.log(`[🚀 Preload] Rota ${index + 1} salva no cache.`);
        }
      }
    } catch (e) {
      console.warn(`[🚀 Preload] Falha ao pré-carregar rota ${index + 1}:`, e);
    }
  });
  
  await Promise.all(promises);
  console.log(`[🚀 Preload] Finalizado para ${city}.`);
};

const cacheRoute = async (pCoords: [number, number], dCoords: [number, number]) => {
  const routeKey = `${pCoords[0].toFixed(4)},${pCoords[1].toFixed(4)}|${dCoords[0].toFixed(4)},${dCoords[1].toFixed(4)}`;
  if (!getCachedRoute(routeKey)) {
    try {
      const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${pCoords[1]},${pCoords[0]};${dCoords[1]},${dCoords[0]}?overview=full&geometries=geojson`;
      const res = await fetch(osrmUrl);
      if (res.ok) {
        const data = await res.json();
        if (data.routes && data.routes.length > 0) {
          setCachedRoute(routeKey, data.routes[0].geometry);
        }
      }
    } catch (e) {}
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
