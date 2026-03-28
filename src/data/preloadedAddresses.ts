
export const PRELOADED_ADDRESSES: Record<string, any[]> = {
  'CURITIBA': [
    {
      pickup: { address: "Shopping Estação, Av. Sete de Setembro, 2775 - Rebouças, Curitiba - PR", lat: -25.4382, lng: -49.2672 },
      destination: { address: "Aeroporto Afonso Pena, Av. Rocha Pombo, s/n - Águas Belas, São José dos Pinhais - PR", lat: -25.5317, lng: -49.1761 }
    },
    {
      pickup: { address: "Jardim Botânico de Curitiba, R. Eng. Ostoja Roguski, s/n - Jardim Botânico, Curitiba - PR", lat: -25.4431, lng: -49.2397 },
      destination: { address: "Museu Oscar Niemeyer, R. Mal. Hermes, 999 - Centro Cívico, Curitiba - PR", lat: -25.4104, lng: -49.2671 }
    }
  ],
  'PORTO ALEGRE': [
    {
      pickup: { address: "Aeroporto Salgado Filho, Av. Severo Dullius, 90442 - Anchieta, Porto Alegre - RS", lat: -29.9939, lng: -51.1711 },
      destination: { address: "Shopping Iguatemi, Av. João Wallig, 1800 - Passo d'Areia, Porto Alegre - RS", lat: -30.0277, lng: -51.1631 }
    },
    {
      pickup: { address: "Estádio Beira-Rio, Av. Padre Cacique, 891 - Praia de Belas, Porto Alegre - RS", lat: -30.0655, lng: -51.2359 },
      destination: { address: "Parque Farroupilha (Redenção), Av. João Pessoa, s/n - Farroupilha, Porto Alegre - RS", lat: -30.0368, lng: -51.2186 }
    }
  ],
  'SALVADOR': [
    {
      pickup: { address: "Aeroporto de Salvador, Praça Gago Coutinho, s/n - São Cristóvão, Salvador - BA", lat: -12.9111, lng: -38.3322 },
      destination: { address: "Pelourinho, Largo do Pelourinho, s/n - Centro Histórico, Salvador - BA", lat: -12.9718, lng: -38.5086 }
    },
    {
      pickup: { address: "Shopping da Bahia, Av. Tancredo Neves, 148 - Caminho das Árvores, Salvador - BA", lat: -12.9801, lng: -38.4641 },
      destination: { address: "Farol da Barra, Largo do Farol da Barra, s/n - Barra, Salvador - BA", lat: -13.0104, lng: -38.5329 }
    }
  ],
  'FORTALEZA': [
    {
      pickup: { address: "Aeroporto de Fortaleza, Av. Sen. Carlos Jereissati, 3000 - Serrinha, Fortaleza - CE", lat: -3.7761, lng: -38.5326 },
      destination: { address: "Beach Park, R. Porto das Dunas, 2734 - Porto das Dunas, Aquiraz - CE", lat: -3.8408, lng: -38.3919 }
    },
    {
      pickup: { address: "Shopping Iguatemi Bosque, Av. Washington Soares, 85 - Edson Queiroz, Fortaleza - CE", lat: -3.7554, lng: -38.4889 },
      destination: { address: "Praia do Futuro, Av. Clóvis Arrais Maia, s/n - Praia do Futuro, Fortaleza - CE", lat: -3.7411, lng: -38.4439 }
    }
  ],
  'BRASÍLIA': [
    {
      pickup: { address: "Aeroporto de Brasília, Lago Sul, Brasília - DF", lat: -15.8697, lng: -47.9172 },
      destination: { address: "Esplanada dos Ministérios, Eixo Monumental, Brasília - DF", lat: -15.7975, lng: -47.8642 }
    },
    {
      pickup: { address: "Brasília Shopping, SCN Quadra 5, Bloco A - Asa Norte, Brasília - DF", lat: -15.7892, lng: -47.8894 },
      destination: { address: "Pontão do Lago Sul, SHIS QL 10, Lote 1/30 - Lago Sul, Brasília - DF", lat: -15.8247, lng: -47.8719 }
    }
  ],
  'RECIFE': [
    {
      pickup: { address: "Aeroporto do Recife, Praça Min. Salgado Filho, s/n - Imbiribeira, Recife - PE", lat: -8.1263, lng: -34.9228 },
      destination: { address: "Marco Zero, Praça Rio Branco, s/n - Recife Antigo, Recife - PE", lat: -8.0631, lng: -34.8711 }
    },
    {
      pickup: { address: "Shopping Recife, R. Padre Carapuceiro, 777 - Boa Viagem, Recife - PE", lat: -8.1191, lng: -34.9050 },
      destination: { address: "Praia de Boa Viagem, Av. Boa Viagem, s/n - Boa Viagem, Recife - PE", lat: -8.1297, lng: -34.8925 }
    }
  ],
  'GOIÂNIA': [
    {
      pickup: { address: "Aeroporto de Goiânia, Alameda Orlando de Moraes, s/n - Santa Genoveva, Goiânia - GO", lat: -16.6325, lng: -49.2211 },
      destination: { address: "Flamboyant Shopping, Av. Dep. Jamel Cecílio, 3300 - Jardim Goiás, Goiânia - GO", lat: -16.7097, lng: -49.2344 }
    },
    {
      pickup: { address: "Parque Vaca Brava, Av. T-10, s/n - Setor Bueno, Goiânia - GO", lat: -16.7056, lng: -49.2719 },
      destination: { address: "Terminal Rodoviário de Goiânia, R. 44, 399 - Setor Norte Ferroviário, Goiânia - GO", lat: -16.6647, lng: -49.2611 }
    }
  ],
  'MANAUS': [
    {
      pickup: { address: "Aeroporto de Manaus, Av. Santos Dumont, 1350 - Tarumã, Manaus - AM", lat: -3.0358, lng: -60.0464 },
      destination: { address: "Teatro Amazonas, Largo de São Sebastião, s/n - Centro, Manaus - AM", lat: -3.1303, lng: -60.0236 }
    },
    {
      pickup: { address: "Manauara Shopping, Av. Mário Ypiranga, 1300 - Adrianópolis, Manaus - AM", lat: -3.1039, lng: -60.0114 },
      destination: { address: "Ponta Negra, Av. Coronel Teixeira, s/n - Ponta Negra, Manaus - AM", lat: -3.0611, lng: -60.1011 }
    }
  ],
  'BELÉM': [
    {
      pickup: { address: "Aeroporto de Belém, Av. Júlio César, s/n - Val de Cans, Belém - PA", lat: -1.3831, lng: -48.4789 },
      destination: { address: "Estação das Docas, Av. Mal. Hermes, s/n - Campina, Belém - PA", lat: -1.4508, lng: -48.5011 }
    },
    {
      pickup: { address: "Shopping Pátio Belém, Travessa Padre Eutíquio, 1078 - Batista Campos, Belém - PA", lat: -1.4554, lng: -48.4889 },
      destination: { address: "Basílica de Nossa Senhora de Nazaré, Praça Justo Chermont, s/n - Nazaré, Belém - PA", lat: -1.4525, lng: -48.4786 }
    }
  ],
  'FLORIANÓPOLIS': [
    {
      pickup: { address: "Aeroporto de Florianópolis, Rod. Ac. ao Aeroporto, 6200 - Carianos, Florianópolis - SC", lat: -27.6701, lng: -48.5458 },
      destination: { address: "Beiramar Shopping, R. Bocaiúva, 2468 - Centro, Florianópolis - SC", lat: -27.5854, lng: -48.5441 }
    },
    {
      pickup: { address: "Mercado Público de Florianópolis, R. Conselheiro Mafra, 255 - Centro, Florianópolis - SC", lat: -27.5975, lng: -48.5511 },
      destination: { address: "Praia de Jurerê Internacional, Av. dos Búzios, s/n - Jurerê, Florianópolis - SC", lat: -27.4411, lng: -48.4911 }
    }
  ],
  'VITÓRIA': [
    {
      pickup: { address: "Aeroporto de Vitória, Av. Roza Helena Schorling Albuquerque, s/n - Goiabeiras, Vitória - ES", lat: -20.2581, lng: -40.2864 },
      destination: { address: "Shopping Vitória, Av. Américo Buaiz, 200 - Enseada do Suá, Vitória - ES", lat: -20.3154, lng: -40.2889 }
    },
    {
      pickup: { address: "Praia de Camburi, Av. Dante Michelini, s/n - Camburi, Vitória - ES", lat: -20.2781, lng: -40.2811 },
      destination: { address: "Convento da Penha, R. Vasco Coutinho, s/n - Prainha, Vila Velha - ES", lat: -20.3289, lng: -40.2861 }
    }
  ],
  'NATAL': [
    {
      pickup: { address: "Aeroporto de Natal, Av. Ruy Pereira dos Santos, 3100 - Aeroporto, São Gonçalo do Amarante - RN", lat: -5.7689, lng: -35.3664 },
      destination: { address: "Praia de Ponta Negra, Av. Erivan França, s/n - Ponta Negra, Natal - RN", lat: -5.8854, lng: -35.1741 }
    },
    {
      pickup: { address: "Midway Mall, Av. Bernardo Vieira, 3775 - Tirol, Natal - RN", lat: -5.8111, lng: -35.2058 },
      destination: { address: "Morro do Careca, Vila de Ponta Negra, Natal - RN", lat: -5.8911, lng: -35.1689 }
    }
  ],
  'MACEIÓ': [
    {
      pickup: { address: "Aeroporto de Maceió, Rod. BR-104, s/n - Tabuleiro do Martins, Maceió - AL", lat: -9.5108, lng: -35.7917 },
      destination: { address: "Maceió Shopping, Av. Comendador Gustavo Paiva, 2990 - Mangabeiras, Maceió - AL", lat: -9.6454, lng: -35.7089 }
    },
    {
      pickup: { address: "Praia de Pajuçara, Av. Dr. Antônio Gouveia, s/n - Pajuçara, Maceió - AL", lat: -9.6681, lng: -35.7011 },
      destination: { address: "Praia de Ponta Verde, Av. Silvio Carlos Viana, s/n - Ponta Verde, Maceió - AL", lat: -9.6611, lng: -35.6941 }
    }
  ],
  'CAMPO GRANDE': [
    {
      pickup: { address: "Aeroporto de Campo Grande, Av. Duque de Caxias, s/n - Vila Serradinho, Campo Grande - MS", lat: -20.4697, lng: -54.6703 },
      destination: { address: "Shopping Campo Grande, Av. Afonso Pena, 4909 - Santa Fé, Campo Grande - MS", lat: -20.4554, lng: -54.5889 }
    },
    {
      pickup: { address: "Parque das Nações Indígenas, Av. Afonso Pena, s/n - Itanhangá Park, Campo Grande - MS", lat: -20.4511, lng: -54.5711 },
      destination: { address: "Terminal Rodoviário de Campo Grande, Av. Gury Marques, 1215 - Universitário, Campo Grande - MS", lat: -20.5111, lng: -54.6111 }
    }
  ],
  'CUIABÁ': [
    {
      pickup: { address: "Aeroporto de Cuiabá, Av. João Ponce de Arruda, s/n - Jardim Aeroporto, Várzea Grande - MT", lat: -15.6528, lng: -56.1167 },
      destination: { address: "Pantanal Shopping, Av. Historiador Rubens de Mendonça, 3300 - Jardim Aclimação, Cuiabá - MT", lat: -15.5854, lng: -56.0689 }
    },
    {
      pickup: { address: "Parque das Águas, Av. Hermina Torquarto da Silva, s/n - Centro Político Administrativo, Cuiabá - MT", lat: -15.5711, lng: -56.0711 },
      destination: { address: "Arena Pantanal, Av. Agrícola Paes de Barros, s/n - Verdão, Cuiabá - MT", lat: -15.6039, lng: -56.1211 }
    }
  ],
  'SÃO LUÍS': [
    {
      pickup: { address: "Aeroporto de São Luís, Av. dos Libaneses, s/n - Tirirical, São Luís - MA", lat: -2.5869, lng: -44.2361 },
      destination: { address: "São Luís Shopping, Av. Prof. Carlos Cunha, 1000 - Jaracaty, São Luís - MA", lat: -2.5054, lng: -44.2889 }
    },
    {
      pickup: { address: "Centro Histórico de São Luís, R. Portugal, s/n - Praia Grande, São Luís - MA", lat: -2.5289, lng: -44.3061 },
      destination: { address: "Praia da Ponta d'Areia, Av. dos Holandeses, s/n - Ponta d'Areia, São Luís - MA", lat: -2.4811, lng: -44.3111 }
    }
  ],
  'TERESINA': [
    {
      pickup: { address: "Aeroporto de Teresina, Av. Centenário, s/n - Aeroporto, Teresina - PI", lat: -5.0606, lng: -42.8242 },
      destination: { address: "Teresina Shopping, Av. Raul Lopes, 1000 - Noivos, Teresina - PI", lat: -5.0854, lng: -42.7889 }
    },
    {
      pickup: { address: "Parque Potycabana, Av. Raul Lopes, s/n - Noivos, Teresina - PI", lat: -5.0911, lng: -42.7911 },
      destination: { address: "Ponte Estaiada, Av. Raul Lopes, s/n - Fátima, Teresina - PI", lat: -5.0711, lng: -42.8011 }
    }
  ],
  'JOÃO PESSOA': [
    {
      pickup: { address: "Aeroporto de João Pessoa, Av. Mal. Rondon, s/n - Bayeux, João Pessoa - PB", lat: -7.1483, lng: -34.9506 },
      destination: { address: "Manaíra Shopping, Av. Gov. Flávio Ribeiro Coutinho, 805 - Manaíra, João Pessoa - PB", lat: -7.0954, lng: -34.8389 }
    },
    {
      pickup: { address: "Farol do Cabo Branco, Av. Cabo Branco, s/n - Cabo Branco, João Pessoa - PB", lat: -7.1475, lng: -34.7967 },
      destination: { address: "Praia de Tambaú, Av. Alm. Tamandaré, s/n - Tambaú, João Pessoa - PB", lat: -7.1111, lng: -34.8211 }
    }
  ],
  'ARACAJU': [
    {
      pickup: { address: "Aeroporto de Aracaju, Av. Sen. Júlio César Leite, s/n - Aeroporto, Aracaju - SE", lat: -10.9853, lng: -37.0733 },
      destination: { address: "Shopping Jardins, Av. Min. Geraldo Barreto Sobral, 215 - Jardins, Aracaju - SE", lat: -10.9354, lng: -37.0589 }
    },
    {
      pickup: { address: "Orla de Atalaia, Av. Santos Dumont, s/n - Atalaia, Aracaju - SE", lat: -10.9811, lng: -37.0411 },
      destination: { address: "Passarela do Caranguejo, Av. Santos Dumont, s/n - Atalaia, Aracaju - SE", lat: -10.9911, lng: -37.0489 }
    }
  ],
  'PORTO VELHO': [
    {
      pickup: { address: "Aeroporto de Porto Velho, Av. Gov. Jorge Teixeira, s/n - Aeroporto, Porto Velho - RO", lat: -8.7136, lng: -63.9028 },
      destination: { address: "Porto Velho Shopping, Av. Rio Madeira, 3288 - Flodoaldo Pontes Pinto, Porto Velho - RO", lat: -8.7454, lng: -63.8789 }
    },
    {
      pickup: { address: "Estrada de Ferro Madeira-Mamoré, Av. Sete de Setembro, s/n - Centro, Porto Velho - RO", lat: -8.7611, lng: -63.9111 },
      destination: { address: "Parque da Cidade, Av. Calama, s/n - Flodoaldo Pontes Pinto, Porto Velho - RO", lat: -8.7311, lng: -63.8611 }
    }
  ],
  'BOA VISTA': [
    {
      pickup: { address: "Aeroporto de Boa Vista, Praça Santos Dumont, 100 - Aeroporto, Boa Vista - RR", lat: 2.8414, lng: -60.6922 },
      destination: { address: "Roraima Garden Shopping, Av. Ville Roy, 1544 - Caçari, Boa Vista - RR", lat: 2.8354, lng: -60.6589 }
    },
    {
      pickup: { address: "Praça das Águas, Av. Ene Garcez, s/n - Centro, Boa Vista - RR", lat: 2.8211, lng: -60.6711 },
      destination: { address: "Parque Anauá, Av. Brigadeiro Eduardo Gomes, s/n - Aeroporto, Boa Vista - RR", lat: 2.8511, lng: -60.6811 }
    }
  ],
  'MACAPÁ': [
    {
      pickup: { address: "Aeroporto de Macapá, R. Hildemar Maia, s/n - Santa Rita, Macapá - AP", lat: 0.0508, lng: -51.0717 },
      destination: { address: "Amapá Garden Shopping, Rod. JK, s/n - Universidade, Macapá - AP", lat: 0.0054, lng: -51.0889 }
    },
    {
      pickup: { address: "Monumento Marco Zero do Equador, Rod. JK, s/n - Jardim Marco Zero, Macapá - AP", lat: 0.0000, lng: -51.0789 },
      destination: { address: "Fortaleza de São José de Macapá, R. Cândido Mendes, s/n - Centro, Macapá - AP", lat: 0.0389, lng: -51.0489 }
    }
  ],
  'RIO BRANCO': [
    {
      pickup: { address: "Aeroporto de Rio Branco, Rod. BR-364, s/n - Aeroporto Velho, Rio Branco - AC", lat: -9.8683, lng: -67.8944 },
      destination: { address: "Via Verde Shopping, Estrada da Floresta, 2320 - Floresta Sul, Rio Branco - AC", lat: -9.9554, lng: -67.8589 }
    },
    {
      pickup: { address: "Palácio Rio Branco, R. Benjamin Constant, s/n - Centro, Rio Branco - AC", lat: -9.9711, lng: -67.8111 },
      destination: { address: "Parque da Maternidade, Av. Ceará, s/n - Centro, Rio Branco - AC", lat: -9.9611, lng: -67.8211 }
    }
  ],
  'PALMAS': [
    {
      pickup: { address: "Aeroporto de Palmas, Av. Joaquim Teotônio Segurado, s/n - Plano Diretor Sul, Palmas - TO", lat: -10.2903, lng: -48.3578 },
      destination: { address: "Capim Dourado Shopping, Av. JK, s/n - Plano Diretor Norte, Palmas - TO", lat: -10.1854, lng: -48.3389 }
    },
    {
      pickup: { address: "Praça dos Girassóis, Av. NS-01, s/n - Plano Diretor Centro, Palmas - TO", lat: -10.1811, lng: -48.3311 },
      destination: { address: "Praia da Graciosa, Av. NS-15, s/n - Plano Diretor Sul, Palmas - TO", lat: -10.2011, lng: -48.3611 }
    }
  ],
  'RIBEIRÃO PRETO': [
    {
      pickup: { address: "Aeroporto de Ribeirão Preto, Av. Thomaz Alberto Whately, s/n - Jardim Aeroporto, Ribeirão Preto - SP", lat: -21.1364, lng: -47.7767 },
      destination: { address: "Ribeirão Shopping, Av. Cel. Fernando Ferreira Leite, 1540 - Jardim Nova Aliança, Ribeirão Preto - SP", lat: -21.2154, lng: -47.8189 }
    },
    {
      pickup: { address: "Novo Shopping, Av. Pres. Kennedy, 1500 - Ribeirânia, Ribeirão Preto - SP", lat: -21.1911, lng: -47.7611 },
      destination: { address: "Terminal Rodoviário de Ribeirão Preto, Av. Jerônimo Gonçalves, 640 - Centro, Ribeirão Preto - SP", lat: -21.1781, lng: -47.8111 }
    }
  ],
  'SOROCABA': [
    {
      pickup: { address: "Shopping Iguatemi Esplanada, Av. Gisele Constantino, 1850 - Parque Campolim, Sorocaba - SP", lat: -23.5354, lng: -47.4689 },
      destination: { address: "Aeroporto de Sorocaba, Av. Santos Dumont, s/n - Vila Santa Clara, Sorocaba - SP", lat: -23.4831, lng: -47.4889 }
    },
    {
      pickup: { address: "Terminal Santo Antônio, R. Dr. Álvaro Soares, 430 - Centro, Sorocaba - SP", lat: -23.4975, lng: -47.4511 },
      destination: { address: "Parque das Águas, Av. Dom Aguirre, s/n - Jardim Abaeté, Sorocaba - SP", lat: -23.4711, lng: -47.4311 }
    }
  ],
  'JOINVILLE': [
    {
      pickup: { address: "Aeroporto de Joinville, Av. Santos Dumont, 9000 - Jardim Sofia, Joinville - SC", lat: -26.2231, lng: -48.7989 },
      destination: { address: "Garten Shopping, Av. Rolf Wiest, 333 - Bom Retiro, Joinville - SC", lat: -26.2554, lng: -48.8489 }
    },
    {
      pickup: { address: "Rua das Palmeiras, R. das Palmeiras, s/n - Centro, Joinville - SC", lat: -26.3011, lng: -48.8411 },
      destination: { address: "Expocentro Edmundo Doubrawa, Av. José Vieira, 315 - América, Joinville - SC", lat: -26.2911, lng: -48.8311 }
    }
  ],
  'LONDRINA': [
    {
      pickup: { address: "Aeroporto de Londrina, R. Ten. João Maurício Medeiros, 300 - Aeroporto, Londrina - PR", lat: -23.3331, lng: -51.1389 },
      destination: { address: "Catuaí Shopping Londrina, Rod. Celso Garcia Cid, s/n - Gleba Fazenda Palhano, Londrina - PR", lat: -23.3454, lng: -51.1889 }
    },
    {
      pickup: { address: "Lago Igapó, Av. Higienópolis, s/n - Jardim Higienópolis, Londrina - PR", lat: -23.3211, lng: -51.1611 },
      destination: { address: "Terminal Rodoviário de Londrina, Av. Dez de Dezembro, 1830 - Vila Siam, Londrina - PR", lat: -23.3111, lng: -51.1411 }
    }
  ],
  'SANTOS': [
    {
      pickup: { address: "Aquário de Santos, Av. Bartolomeu de Gusmão, s/n - Ponta da Praia, Santos - SP", lat: -23.9864, lng: -46.3089 },
      destination: { address: "Shopping Praiamar, R. Alexandre Martins, 80 - Aparecida, Santos - SP", lat: -23.9754, lng: -46.3111 }
    },
    {
      pickup: { address: "Estádio Vila Belmiro, R. Princesa Isabel, s/n - Vila Belmiro, Santos - SP", lat: -23.9511, lng: -46.3389 },
      destination: { address: "Balsa Santos-Guarujá, Praça da República, s/n - Centro, Santos - SP", lat: -23.9311, lng: -46.3211 }
    }
  ],
  'SÃO JOSÉ DOS CAMPOS': [
    {
      pickup: { address: "Aeroporto de São José dos Campos, Av. Brig. Faria Lima, 1941 - Putim, São José dos Campos - SP", lat: -23.2289, lng: -45.8711 },
      destination: { address: "CenterVale Shopping, Av. Dep. Benedito Matarazzo, 9403 - Jardim Oswaldo Cruz, São José dos Campos - SP", lat: -23.2054, lng: -45.8789 }
    },
    {
      pickup: { address: "Parque Vicentina Aranha, R. Eng. Prudente Meireles de Morais, 302 - Vila Adyana, São José dos Campos - SP", lat: -23.1911, lng: -45.8911 },
      destination: { address: "Colinas Shopping, Av. São João, 2200 - Jardim das Colinas, São José dos Campos - SP", lat: -23.2011, lng: -45.9111 }
    }
  ],
  'UBERLÂNDIA': [
    {
      pickup: { address: "Aeroporto de Uberlândia, Av. Ten. Aviador Rafael Rezende, s/n - Jardim Uberlândia, Uberlândia - MG", lat: -18.8831, lng: -48.2289 },
      destination: { address: "Center Shopping Uberlândia, Av. João Naves de Ávila, 1331 - Tibery, Uberlândia - MG", lat: -18.9154, lng: -48.2611 }
    },
    {
      pickup: { address: "Parque do Sabiá, R. Haia, s/n - Tibery, Uberlândia - MG", lat: -18.9011, lng: -48.2311 },
      destination: { address: "Uberlândia Shopping, Av. Paulo Gracindo, 15 - Morada da Colina, Uberlândia - MG", lat: -18.9511, lng: -48.2811 }
    }
  ],
  'NITERÓI': [
    {
      pickup: { address: "MAC Niterói, Mirante da Boa Viagem, s/n - Boa Viagem, Niterói - RJ", lat: -22.9078, lng: -43.1258 },
      destination: { address: "Plaza Shopping Niterói, R. Quinze de Novembro, 8 - Centro, Niterói - RJ", lat: -22.8954, lng: -43.1211 }
    },
    {
      pickup: { address: "Barcas Niterói, Praça Arariboia, s/n - Centro, Niterói - RJ", lat: -22.8911, lng: -43.1289 },
      destination: { address: "Praia de Icaraí, Av. Jorn. Alberto Francisco Torres, s/n - Icaraí, Niterói - RJ", lat: -22.9089, lng: -43.1111 }
    }
  ],
  'CAMPINAS': [
    {
      pickup: { address: "Aeroporto de Viracopos, Rod. Santos Dumont, s/n - Jardim das Bandeiras, Campinas - SP", lat: -23.0069, lng: -47.1344 },
      destination: { address: "Shopping Iguatemi Campinas, Av. Iguatemi, 777 - Vila Brandina, Campinas - SP", lat: -22.8925, lng: -47.0258 }
    },
    {
      pickup: { address: "Parque Portugal (Lagoa do Taquaral), Av. Dr. Heitor Penteado, s/n - Taquaral, Campinas - SP", lat: -22.8754, lng: -47.0558 },
      destination: { address: "Parque Dom Pedro Shopping, Av. Guilherme Campos, 500 - Jardim Santa Genebra, Campinas - SP", lat: -22.8489, lng: -47.0631 }
    }
  ],
  'GUARULHOS': [
    {
      pickup: { address: "Aeroporto de Guarulhos, Rod. Hélio Smidt, s/n - Aeroporto, Guarulhos - SP", lat: -23.4356, lng: -46.4731 },
      destination: { address: "Internacional Shopping Guarulhos, Rod. Pres. Dutra, s/n - Itapegica, Guarulhos - SP", lat: -23.4854, lng: -46.5189 }
    },
    {
      pickup: { address: "Bosque Maia, Av. Paulo Faccini, s/n - Centro, Guarulhos - SP", lat: -23.4589, lng: -46.5211 },
      destination: { address: "Parque Shopping Maia, Av. Bartolomeu de Carlos, 230 - Jardim Flor da Montanha, Guarulhos - SP", lat: -23.4411, lng: -46.5311 }
    }
  ],
  'SÃO BERNARDO DO CAMPO': [
    {
      pickup: { address: "São Bernardo Plaza Shopping, Av. Rotary, 624 - Centro, São Bernardo do Campo - SP", lat: -23.7154, lng: -46.5489 },
      destination: { address: "Parque Estoril, R. Portugal, s/n - Riacho Grande, São Bernardo do Campo - SP", lat: -23.7611, lng: -46.5111 }
    },
    {
      pickup: { address: "Golden Square Shopping, Av. Kennedy, 700 - Jardim do Mar, São Bernardo do Campo - SP", lat: -23.6889, lng: -46.5511 },
      destination: { address: "Shopping Metrópole, Praça Samuel Sabatini, 200 - Centro, São Bernardo do Campo - SP", lat: -23.6911, lng: -46.5411 }
    }
  ],
  'OSASCO': [
    {
      pickup: { address: "SuperShopping Osasco, Av. dos Autonomistas, 1828 - Vila Yara, Osasco - SP", lat: -23.5411, lng: -46.7689 },
      destination: { address: "Osasco Plaza Shopping, R. Ten. Avelar Pires de Azevedo, 81 - Centro, Osasco - SP", lat: -23.5325, lng: -46.7758 }
    },
    {
      pickup: { address: "Parque Chico Mendes, R. Lázaro Suave, 15 - City Bussocaba, Osasco - SP", lat: -23.5611, lng: -46.7811 },
      destination: { address: "Shopping União de Osasco, Av. dos Autonomistas, 1400 - Vila Yara, Osasco - SP", lat: -23.5454, lng: -46.7611 }
    }
  ],
  'SÃO GONÇALO': [
    {
      pickup: { address: "Partage Shopping São Gonçalo, Av. Pres. Kennedy, 425 - Centro, São Gonçalo - RJ", lat: -22.8244, lng: -43.0511 },
      destination: { address: "São Gonçalo Shopping, Rod. Niterói-Manilha, s/n - Boa Vista, São Gonçalo - RJ", lat: -22.8154, lng: -43.0389 }
    },
    {
      pickup: { address: "Prefeitura de São Gonçalo, R. Feliciano Sodré, 100 - Centro, São Gonçalo - RJ", lat: -22.8269, lng: -43.0539 },
      destination: { address: "Hospital Alberto Torres, R. Osório Costa, s/n - Colubandê, São Gonçalo - RJ", lat: -22.8411, lng: -42.9911 }
    }
  ],
  'DUQUE DE CAXIAS': [
    {
      pickup: { address: "Caxias Shopping, Rod. Washington Luíz, 2895 - Parque Duque, Duque de Caxias - RJ", lat: -22.7954, lng: -43.2889 },
      destination: { address: "Outlet Premium Rio de Janeiro, Rod. Washington Luíz, s/n - Santa Cruz da Serra, Duque de Caxias - RJ", lat: -22.6511, lng: -43.3111 }
    },
    {
      pickup: { address: "Rodoviária de Duque de Caxias, R. Mariano Sendra dos Santos, s/n - Centro, Duque de Caxias - RJ", lat: -22.7856, lng: -43.3117 },
      destination: { address: "Hospital Moacyr do Carmo, Rod. Washington Luíz, s/n - Parque Beira Mar, Duque de Caxias - RJ", lat: -22.7711, lng: -43.2911 }
    }
  ]
};
