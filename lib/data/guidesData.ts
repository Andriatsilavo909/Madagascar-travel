export interface Guide {
    id: string
    slug: string
    title: string
    subtitle: string
    category: "itineraire" | "pratique" | "culture" | "saison"
    image: string
    duration?: string
    difficulty?: "Facile" | "Modéré" | "Difficile"
    content: {
      introduction: string
      sections: {
        title: string
        paragraphs: string[]
        image?: string
      }[]
      practicalInfo?: {
        title?: string
        items: { label: string; value: string }[]
      }
    }
    relatedGuides?: string[]
  }
  
  export const guidesData: Guide[] = [
    // GUIDE 1 - Circuit classique du Sud (RN7)
    {
      id: "1",
      slug: "circuit-classique-sud-rn7",
      title: "Circuit classique du Sud (RN7)",
      subtitle: "L'itinéraire incontournable pour découvrir la diversité de Madagascar",
      category: "itineraire",
      image: "https://media-cdn.tripadvisor.com/media/photo-s/12/2b/01/3d/la-rn7-route-qui-mene.jpg",
      duration: "12-14 jours",
      difficulty: "Modéré",
      content: {
        introduction: "La Route Nationale 7 est l'axe touristique le plus emblématique de Madagascar. Elle relie la capitale Antananarivo à la côte sud-ouest en traversant des paysages d'une variété exceptionnelle : hautes terres, forêts tropicales, canyons désertiques et lagons.",
        sections: [
          {
            title: "Étape 1 : Antananarivo → Antsirabe",
            paragraphs: [
              "Départ de la capitale pour rejoindre Antsirabe, la ville thermale. En chemin, arrêt à Ambatolampy pour visiter les ateliers de fonderie d'aluminium.",
              "Antsirabe est réputée pour ses balades en pousse-pousse et ses maisons coloniales. Profitez-en pour visiter les ateliers de pierres précieuses."
            ]
          },
          {
            title: "Étape 2 : Antsirabe → Ambositra → Fianarantsoa",
            paragraphs: [
              "Traversée des hautes terres betsileo. Arrêt à Ambositra, capitale de l'artisanat Zafimaniry (sculpture sur bois classée à l'UNESCO).",
              "Continuation vers Fianarantsoa, ville perchée au charme colonial, porte d'entrée de la route du vin."
            ]
          },
          {
            title: "Étape 3 : Fianarantsoa → Parc national de Ranomafana",
            paragraphs: [
              "Découverte du parc national de Ranomafana, forêt tropicale humide abritant 12 espèces de lémuriens dont le rare lémur bambou doré.",
              "Randonnée guidée sur les sentiers du parc, observation des caméléons et baignade dans les sources chaudes naturelles."
            ]
          },
          {
            title: "Étape 4 : Ranomafana → Ambalavao → Parc national de l'Isalo",
            paragraphs: [
              "Route vers le sud-ouest avec halte à Ambalavao pour visiter la réserve communautaire d'Anja, où vivent en liberté des lémuriens catta.",
              "Arrivée aux portes du parc national de l'Isalo, massif de grès aux formes ruiniformes spectaculaires."
            ]
          },
          {
            title: "Étape 5 : Randonnée dans l'Isalo",
            paragraphs: [
              "Journée de randonnée dans le parc : canyon des Makis, piscine naturelle, cascade des Nymphes. Possibilité de baignade dans les vasques d'eau claire.",
              "Observation des paysages de savane et des tombeaux Bara nichés dans les falaises."
            ]
          },
          {
            title: "Étape 6 : Isalo → Tuléar → Ifaty",
            paragraphs: [
              "Descente vers la côte sud-ouest jusqu'à Tuléar, puis remontée vers le village de pêcheurs d'Ifaty.",
              "Installation en bord de lagon et découverte de la réserve de Reniala, forêt épineuse aux baobabs nains endémiques."
            ]
          },
          {
            title: "Étape 7 : Détente à Ifaty",
            paragraphs: [
              "Journée de détente sur les plages de sable blanc, snorkeling sur la barrière de corail, balade en pirogue traditionnelle avec les pêcheurs Vezo."
            ]
          }
        ],
        practicalInfo: {
          title: "Infos pratiques",
          items: [
            { label: "Meilleure période", value: "Avril à novembre (saison sèche)" },
            { label: "Transport", value: "4x4 avec chauffeur-guide recommandé" },
            { label: "Hébergement", value: "Lodges et hôtels de charme dans les parcs" },
            { label: "Budget estimé", value: "1500-2500€ par personne (12 jours)" }
          ]
        }
      },
      relatedGuides: ["circuit-ouest-baobabs-tsingy", "randonnee-isalo-conseils"]
    },
  
    // GUIDE 2 - Circuit Ouest : Baobabs et Tsingy
    {
      id: "2",
      slug: "circuit-ouest-baobabs-tsingy",
      title: "Circuit Ouest : Baobabs et Tsingy",
      subtitle: "Aventure et photographie dans l'ouest sauvage",
      category: "itineraire",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM-2PRseL3AlacQ_3811Dmo8_tJdpRmKAg9Q&s",
      duration: "8-10 jours",
      difficulty: "Difficile",
      content: {
        introduction: "L'ouest de Madagascar offre des paysages uniques au monde : l'emblématique Allée des Baobabs et les impressionnantes formations rocheuses des Tsingy de Bemaraha, classées au patrimoine mondial de l'UNESCO.",
        sections: [
          {
            title: "Étape 1 : Morondava et l'Allée des Baobabs",
            paragraphs: [
              "Arrivée à Morondava, petite ville côtière. En fin de journée, direction l'Allée des Baobabs pour admirer le coucher de soleil, moment magique où les géants de plus de 800 ans se découpent sur la lumière dorée.",
              "N'oubliez pas votre trépied pour les photos !"
            ]
          },
          {
            title: "Étape 2 : Forêt de Kirindy",
            paragraphs: [
              "Exploration de la réserve de Kirindy, l'un des derniers vestiges de forêt sèche. Observation du fossa (principal prédateur de Madagascar), de lémuriens nocturnes et du rat géant."
            ]
          },
          {
            title: "Étape 3-4 : Tsingy de Bemaraha",
            paragraphs: [
              "Deux jours d'exploration dans le parc national des Tsingy. Randonnée sur le Grand Tsingy avec ponts suspendus au-dessus des aiguilles calcaires, et découverte du Petit Tsingy accessible à tous.",
              "Via ferrata possible pour les plus sportifs."
            ]
          }
        ],
        practicalInfo: {
          items: [
            { label: "Meilleure période", value: "Mai à novembre (accès possible)" },
            { label: "Transport", value: "4x4 indispensable" },
            { label: "Difficulté", value: "Physique (escalade, ponts suspendus)" }
          ]
        }
      }
    },
  
    // GUIDE 3 - Guide pratique : Quand partir ?
    {
      id: "3",
      slug: "quand-partir-meilleure-periode",
      title: "Quand partir à Madagascar ?",
      subtitle: "Guide complet par région et par activité",
      category: "saison",
      image: "https://www.pinterest.com/pin/9359111722142598/",
      content: {
        introduction: "Madagascar est une île aux climats variés. Choisir la bonne période dépend des régions que vous souhaitez visiter et des activités prévues.",
        sections: [
          {
            title: "Saison sèche (mai à octobre) : la période idéale",
            paragraphs: [
              "C'est la meilleure période pour visiter la plupart des régions. Les températures sont agréables, les routes praticables et les conditions d'observation de la faune optimales.",
              "De juillet à septembre, c'est la saison d'observation des baleines à bosse à Sainte-Marie."
            ]
          },
          {
            title: "Saison des pluies (novembre à avril)",
            paragraphs: [
              "Les pluies sont fréquentes, surtout sur la côte est et dans les parcs nationaux. Risque de cyclones de janvier à mars sur les côtes.",
              "Avantage : les paysages sont verdoyants et il y a moins de touristes."
            ]
          },
          {
            title: "Quand voir quoi ?",
            paragraphs: [
              "Lémuriens : toute l'année, mais plus actifs en saison sèche.",
              "Baleines : juillet à septembre (Sainte-Marie).",
              "Baobabs au coucher du soleil : toute l'année, mais lumière plus belle en saison sèche."
            ]
          }
        ]
      }
    },
  
    // GUIDE 4 - Guide pratique : Budget et coûts
    {
      id: "4",
      slug: "budget-voyage-madagascar",
      title: "Budget de voyage à Madagascar",
      subtitle: "Combien coûte un voyage et comment économiser ?",
      category: "pratique",
      image: "data:image/jpeg;base64,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",
      content: {
        introduction: "Madagascar reste une destination abordable comparée à d'autres îles de l'océan Indien. Voici une estimation des coûts par budget.",
        sections: [
          {
            title: "Budget économique (25-50€/jour)",
            paragraphs: [
              "Hébergement en guesthouse simple (10-20€). Repas dans les gargotes locales (3-5€). Transports en taxi-brousse. Idéal pour les routards et voyageurs avec du temps."
            ]
          },
          {
            title: "Budget confort (50-150€/jour)",
            paragraphs: [
              "Hôtels de charme et lodges confortables (40-80€). Repas dans les restaurants. Transport privé ou location de 4x4 avec chauffeur pour certaines étapes. Excursions guidées."
            ]
          },
          {
            title: "Budget luxe (150€+/jour)",
            paragraphs: [
              "Lodges haut de gamme dans les parcs (Tsara Komba, Isalo Ranch...). Guide privé, vols intérieurs, chauffeur dédié. Expériences exclusives (vol en ULM, croisière privée)."
            ]
          }
        ],
        practicalInfo: {
          title: "À savoir",
          items: [
            { label: "Monnaie", value: "Ariary (MGA). Prévoyez du liquide, les cartes sont peu acceptées hors des grandes villes." },
            { label: "Pourboire", value: "Courant pour les guides et chauffeurs (3-5€/jour)." }
          ]
        }
      }
    },
  
    // GUIDE 5 - Guide pratique : Santé et sécurité
    {
      id: "5",
      slug: "sante-securite-conseils",
      title: "Santé et sécurité à Madagascar",
      subtitle: "Précautions essentielles pour un voyage serein",
      category: "pratique",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDBRsdBi8Ga0LiXpYugdYXcP6H2BUPC-P9ZQ&s",
      content: {
        introduction: "Madagascar est une destination sûre, mais quelques précautions s'imposent, surtout pour les voyageurs en solo.",
        sections: [
          {
            title: "Santé",
            paragraphs: [
              "Vaccins recommandés : fièvre typhoïde, hépatite A, diphtérie, tétanos.",
              "Paludisme présent dans les zones côtières et rurales. Protection anti-moustique indispensable (répulsif, moustiquaire). Consultez votre médecin pour un traitement préventif.",
              "Eau : ne buvez que de l'eau en bouteille capsulée."
            ]
          },
          {
            title: "Sécurité",
            paragraphs: [
              "Dans les villes, soyez vigilant dans les marchés et gares (pickpockets). Évitez d'exhiber objets de valeur.",
              "La nuit, ne vous déplacez pas seul dans les quartiers isolés. Utilisez des taxis officiels.",
              "Sur les routes, privilégiez les déplacements de jour et un véhicule avec chauffeur connaissant les conditions locales."
            ]
          },
          {
            title: "Voyager seul",
            paragraphs: [
              "Le voyage en solo est tout à fait possible. Louer un véhicule avec chauffeur-guide est l'option la plus sûre. Informez toujours votre hébergement de vos déplacements."
            ]
          }
        ]
      }
    },
  
    // GUIDE 6 - Guide culturel : Que manger ?
    {
      id: "6",
      slug: "gastronomie-malgache",
      title: "Gastronomie malgache",
      subtitle: "Les plats et saveurs à ne pas manquer",
      category: "culture",
      image: "/images/guides/food.jpg",
      content: {
        introduction: "La cuisine malgache tourne autour du riz (vary), accompagné de divers accompagnements (laoka). Voici les incontournables.",
        sections: [
          {
            title: "Plats traditionnels",
            paragraphs: [
              "Romazava : ragoût de viande (zébu, porc) avec brèdes (herbes locales). C'est le plat national.",
              "Ravitoto : feuilles de manioc pilées, cuites avec viande de porc ou poisson.",
              "Akoho sy voanio : poulet au lait de coco, spécialité de la côte.",
              "Vary amin'anana : riz cuit avec des herbes et de la viande."
            ]
          },
          {
            title: "Rue et snacks",
            paragraphs: [
              "Mofo gasy : petites crêpes sucrées vendues dans la rue (parfait pour le petit-déjeuner).",
              "Samoussas : beignets triangulaires farcis à la viande ou aux légumes.",
              "Brochettes de zébu : incontournables le soir."
            ]
          },
          {
            title: "Desserts et boissons",
            paragraphs: [
              "Koba : gâteau de cacahuètes et riz enveloppé dans une feuille de bananier.",
              "Rhum arrangé : rhum macéré avec fruits, épices ou miel. À déguster avec modération.",
              "Jus de fruits frais : ananas, mangue, letchi, corossol..."
            ]
          }
        ]
      }
    },
  
    // GUIDE 7 - Randonnée dans l'Isalo (guide spécifique)
    {
      id: "7",
      slug: "randonnee-isalo-conseils",
      title: "Randonner dans l'Isalo",
      subtitle: "Conseils, itinéraires et infos pratiques",
      category: "itineraire",
      image: "/images/guides/isalo-trek.jpg",
      duration: "1-3 jours",
      difficulty: "Modéré",
      content: {
        introduction: "Le parc national de l'Isalo est un paradis pour les randonneurs. Ses canyons de grès, ses oasis et ses piscines naturelles en font un incontournable.",
        sections: [
          {
            title: "Les meilleurs itinéraires",
            paragraphs: [
              "Circuit d'une journée : Canyon des Makis et Piscine Naturelle. 4-5h de marche, accessible à tous. Vous traverserez des canyons spectaculaires pour arriver à une piscine d'eau claire entourée de falaises.",
              "Circuit de 2 jours : boucle avec bivouac au cœur du parc. Permet d'explorer des zones plus reculées et d'observer la faune au coucher du soleil.",
              "Via les fenêtres de l'Isalo : point de vue spectaculaire sur le coucher de soleil."
            ]
          },
          {
            title: "Conseils pratiques",
            paragraphs: [
              "Guide obligatoire pour pénétrer dans le parc.",
              "Prévoyez de l'eau en abondance (2-3L par personne).",
              "Chaussures de randonnée impératives.",
              "Meilleure période : mai à octobre (évitez la saison chaude de novembre à mars)."
            ]
          }
        ],
        practicalInfo: {
          items: [
            { label: "Tarif parc", value: "25 000 Ar par jour (environ 5€)" },
            { label: "Guide", value: "40 000 Ar par jour (obligatoire)" },
            { label: "Hébergement", value: "Lodges à Ranohira ou bivouac organisé" }
          ]
        }
      }
    },
  
    // GUIDE 8 - Que ramener ? (souvenirs)
    {
      id: "8",
      slug: "souvenirs-artisanat",
      title: "Artisanat et souvenirs",
      subtitle: "Que rapporter de Madagascar ?",
      category: "culture",
      image: "/images/guides/souvenirs.jpg",
      content: {
        introduction: "Madagascar regorge d'artisanat traditionnel. Voici les meilleurs souvenirs à rapporter.",
        sections: [
          {
            title: "Les incontournables",
            paragraphs: [
              "Vanille : l'une des meilleures du monde. Achetez-la sous vide dans les épiceries sérieuses.",
              "Huiles essentielles : ylang-ylang, girofle, palmarosa.",
              "Raphia : paniers, chapeaux, textiles tressés.",
              "Sculptures Zafimaniry : art classé à l'UNESCO, motifs géométriques en bois de rose."
            ]
          },
          {
            title: "Où acheter ?",
            paragraphs: [
              "À Antananarivo : marché artisanal de la Digue, quartier d'Isotry.",
              "En région : privilégiez les ateliers locaux (Ambositra pour le bois, Ambalavao pour le papier Antemoro).",
              "Vérifiez la légalité des bois précieux (palissandre, ébène)."
            ]
          }
        ]
      }
    }
  ]