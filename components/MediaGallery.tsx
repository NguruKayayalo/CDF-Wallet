import React, { useState } from 'react';
import { 
  Play, 
  Image as ImageIcon, 
  Share2, 
  ExternalLink, 
  Download, 
  ArrowUpRight, 
  Search, 
  Filter, 
  X, 
  Check, 
  Copy, 
  Sparkles, 
  Video, 
  Eye, 
  Tag, 
  FileText, 
  Send, 
  Smartphone, 
  ShieldCheck, 
  Layers, 
  Award, 
  Megaphone, 
  Flame,
  Clock,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoGuide {
  id: number;
  title: string;
  category: 'Débutant' | 'DeFi & Achat' | 'Mobile Money' | 'Marketing' | 'Sécurité';
  thumbnail: string;
  duration: string;
  level: string;
  description: string;
  keySteps: string[];
  ctaLink?: string;
  ctaText?: string;
}

interface GalleryPhoto {
  id: number;
  url: string;
  category: 'Marketing' | 'Technologie' | 'Adoption' | 'Concept 3D' | 'Institution';
  title: string;
  subtitle: string;
  description: string;
  resolution: string;
}

interface MarketingAsset {
  id: string;
  title: string;
  type: string;
  format: string;
  description: string;
  previewUrl: string;
  fileName: string;
  downloadData: string;
}

const MediaGallery: React.FC = () => {
  // Navigation tabs within Media Center
  const [mediaTab, setMediaTab] = useState<'videos' | 'photos' | 'marketing' | 'updates'>('videos');

  // Video state
  const [videoCategory, setVideoCategory] = useState<string>('Tous');
  const [selectedVideo, setSelectedVideo] = useState<VideoGuide | null>(null);
  const [isPlayingSimulated, setIsPlayingSimulated] = useState<boolean>(false);

  // Photo state
  const [activePhotoCategory, setActivePhotoCategory] = useState<string>('Tous');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  // Marketing Copy state
  const [copiedTextId, setCopiedTextId] = useState<string | null>(null);
  const [copiedContract, setCopiedContract] = useState<boolean>(false);

  const contractAddress = "0x18e173fdeb700568a08d1d7049309ae322d27777";

  const videoCategories = ['Tous', 'Débutant', 'DeFi & Achat', 'Mobile Money', 'Marketing', 'Sécurité'];

  const videoGuides: VideoGuide[] = [
    {
      id: 1,
      title: "Acheter CDF via Binance Web3 Wallet",
      category: "DeFi & Achat",
      thumbnail: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1920&auto=format&fit=crop",
      duration: "4:12",
      level: "Débutant",
      description: "Tutoriel pas-à-pas pour configurer votre Binance Web3 Wallet, approvisionner en BNB ou USDT, et acquérir vos premiers jetons CDF en toute autonomie.",
      keySteps: [
        "Ouvrez l'application Binance et passez sur l'onglet Web3",
        "Effectuez un dépôt de BNB pour payer les frais de gaz BSC",
        "Recherchez le contrat officiel CDF : 0x18e1...7777",
        "Confirmez la transaction de swap et visualisez votre solde"
      ],
      ctaLink: "https://four.meme/token/0x18e173fdeb700568a08d1d7049309ae322d27777",
      ctaText: "Acheter sur Four.meme"
    },
    {
      id: 2,
      title: "Échanger BNB/USDT sur PancakeSwap avec Slippage",
      category: "DeFi & Achat",
      thumbnail: "https://images.unsplash.com/photo-1516245834210-c4c14278733f?q=80&w=1920&auto=format&fit=crop",
      duration: "3:45",
      level: "Intermédiaire",
      description: "Guide complet pour connecter MetaMask ou Trust Wallet à PancakeSwap et régler la tolérance de glissement (slippage) entre 3% et 5% pour la taxe dynamique.",
      keySteps: [
        "Connectez votre portefeuille BSC sur PancakeSwap v3",
        "Collez l'adresse du contrat CDF 0x18e173fdeb700568a08d1d7049309ae322d27777",
        "Ajustez le slippage à 4% dans les paramètres d'échange",
        "Validez l'approbation et signez le swap instantané"
      ],
      ctaLink: "https://pancakeswap.finance/swap?outputCurrency=0x18e173fdeb700568a08d1d7049309ae322d27777",
      ctaText: "Ouvrir PancakeSwap"
    },
    {
      id: 3,
      title: "Passerelles Mobile Money : M-Pesa, Orange & Airtel vers CDF",
      category: "Mobile Money",
      thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1920&auto=format&fit=crop",
      duration: "5:10",
      level: "Débutant",
      description: "Découvrez comment transformer vos francs congolais en cash mobile vers de la crypto via des points P2P certifiés à Kinshasa, Lubumbashi et Goma.",
      keySteps: [
        "Utilisez le P2P Binance ou des comptoirs partenaires locaux",
        "Transférez via M-Pesa, Orange Money ou Airtel Money",
        "Recevez des USDT en séquestre escrow garanti",
        "Convertissez vos USDT en jetons CDF souverains"
      ],
      ctaLink: "#technical",
      ctaText: "Consulter les Partenaires"
    },
    {
      id: 4,
      title: "Importer le Contrat Officiel dans Trust Wallet & MetaMask",
      category: "Débutant",
      thumbnail: "https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=1920&auto=format&fit=crop",
      duration: "2:30",
      level: "Tous niveaux",
      description: "Vos jetons n'apparaissent pas encore ? Voici la méthode exacte pour ajouter le nouveau contrat personnalisé (décimales 18, symbole CDF).",
      keySteps: [
        "Allez dans 'Gérer les jetons' ou 'Importer un jeton personnalisé'",
        "Sélectionnez le réseau 'BNB Smart Chain'",
        "Collez l'adresse officielle : 0x18e173fdeb700568a08d1d7049309ae322d27777",
        "Le symbole CDF et 18 décimales se remplissent automatiquement"
      ]
    },
    {
      id: 5,
      title: "Kit Ambassadeur : Comment Promouvoir CDF sur WhatsApp & TikTok",
      category: "Marketing",
      thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1920&auto=format&fit=crop",
      duration: "4:40",
      level: "Marketing",
      description: "Stratégies virales et scripts clés en main pour sensibiliser votre communauté, vos commerces de proximité et votre réseau familial au projet CDF.",
      keySteps: [
        "Téléchargez les bannières et vidéos promotionnelles officielles",
        "Partagez les messages explicatifs courts dans vos groupes WhatsApp",
        "Expliquez le mécanisme anti-inflation et la réserve nationale",
        "Invitez vos contacts à rejoindre la communauté Telegram officielle"
      ],
      ctaLink: "https://t.me/+UZUNcqtBESgxM2Zk",
      ctaText: "Rejoindre le Groupe Ambassadeurs"
    },
    {
      id: 6,
      title: "Sécurité Avancée : Clés Privées, Phishing & Hardware Wallets",
      category: "Sécurité",
      thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1920&auto=format&fit=crop",
      duration: "5:00",
      level: "Sécurité",
      description: "Les règles d'or pour ne jamais perdre vos CDF : protection contre les faux tokens, vérification de contrat et isolation sur Ledger ou SafePal.",
      keySteps: [
        "Ne donnez JAMAIS votre phrase de récupération de 12 ou 24 mots",
        "Vérifiez toujours l'URL et l'adresse de contrat 0x18e1...7777",
        "Méfiez-vous des faux airdrops et messages privés non sollicités",
        "Activez l'authentification 2FA sur tous vos comptes d'échange"
      ]
    },
    {
      id: 7,
      title: "Simulateur de Croissance & Objectif 0.1 USDT",
      category: "DeFi & Achat",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1920&auto=format&fit=crop",
      duration: "3:15",
      level: "Intermédiaire",
      description: "Comment calculer vos projections financières avec l'outil de simulation intégré et comprendre la corrélation avec la réserve de liquidité.",
      keySteps: [
        "Indiquez votre capital d'investissement en USDT ou BNB",
        "Visualisez le volume de tokens CDF alloués",
        "Analysez les paliers cibles (0.01 USDT, 0.05 USDT, 0.1 USDT)",
        "Comprenez l'impact du brûlage déflationniste sur la valeur unitaire"
      ],
      ctaLink: "#simulation",
      ctaText: "Essayer le Simulateur"
    },
    {
      id: 8,
      title: "Participer aux Décisions : Le Vote Citoyen CDF DAO",
      category: "Débutant",
      thumbnail: "https://images.unsplash.com/photo-1540910419892-f0c9757f596c?q=80&w=1920&auto=format&fit=crop",
      duration: "4:50",
      level: "Gouvernance",
      description: "Chaque détenteur possède une voix. Apprenez comment soumettre des propositions budgétaires et voter pour les projets nationaux financés par la réserve.",
      keySteps: [
        "Consultez les propositions actives dans l'onglet DAO",
        "Connectez votre portefeuille pour vérifier votre solde CDF",
        "Exprimez votre vote pour soutenir l'agro-tech ou l'éducation",
        "Suivez l'exécution transparente des résolutions sur la BSC"
      ],
      ctaLink: "#governance",
      ctaText: "Accéder au DAO"
    },
    {
      id: 9,
      title: "Créer des Vidéos Marketing TikTok avec l'IA",
      category: "Marketing",
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop",
      duration: "3:30",
      level: "Créateur",
      description: "Utilisez le studio de prompts IA du Franc Congolais pour générer des clips vidéos cinématographiques mettant en valeur la souveraineté économique.",
      keySteps: [
        "Sélectionnez un concept visuel dans le Studio Marketing",
        "Générez le script vidéo patriotic-cyberpunk en 1 clic",
        "Montez la vidéo avec la musique officielle et les stickers",
        "Publiez avec les hashtags #FrancCongolais #CDF #RDC2026"
      ],
      ctaLink: "#marketing-video",
      ctaText: "Générer avec l'IA"
    }
  ];

  const galleryPhotos: GalleryPhoto[] = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=1200&auto=format&fit=crop",
      category: "Marketing",
      title: "Souveraineté Monétaire 2.0",
      subtitle: "Campagne Digitale Kinshasa 2026",
      description: "Visuel officiel illustrant la transition historique entre les devises traditionnelles et le Franc Congolais numérique décentralisé.",
      resolution: "3840 x 2160 (4K UHD)"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1519074002996-a69e7ac6e0ed?q=80&w=1200&auto=format&fit=crop",
      category: "Institution",
      title: "Kinshasa : Métropole Tech",
      subtitle: "Boulevard du 30 Juin Connecté",
      description: "Kinshasa s'affirme comme le pôle d'attraction fintech d'Afrique Centrale grâce au déploiement des infrastructures blockchain.",
      resolution: "2560 x 1440 (2K QHD)"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1200&auto=format&fit=crop",
      category: "Adoption",
      title: "Commerces Locaux & Paiements CDF",
      subtitle: "Marché Central & Boutiques Mobiles",
      description: "Les commerçants de Kinshasa et Goma adoptent le paiement direct par QR Code sans frais bancaires excessifs.",
      resolution: "3000 x 2000"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1622630998477-20aa696fa4f5?q=80&w=1200&auto=format&fit=crop",
      category: "Technologie",
      title: "Nœud Validateur BEP-20",
      subtitle: "Sécurité Décentralisée BSC",
      description: "Architecture haute performance assurant des transactions validées en moins de 3 secondes avec des frais quasi-nuls.",
      resolution: "3840 x 2160 (4K)"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
      category: "Adoption",
      title: "Autonomisation des Femmes Entrepreneures",
      subtitle: "Micro-crédits CDF sans intermédiaire",
      description: "Programme d'émancipation financière grâce aux micro-prêts distribués et remboursables en jetons CDF souverains.",
      resolution: "3000 x 2000"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop",
      category: "Concept 3D",
      title: "L'Étoile Dorée du Fleuve Congo",
      subtitle: "Symbole National du Jeton CDF",
      description: "Rendu 3D haute fidélité fusionnant l'emblème national et les lignes d'énergie blockchain de la Binance Smart Chain.",
      resolution: "4096 x 2304 (Cinéma 4K)"
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1200&auto=format&fit=crop",
      category: "Technologie",
      title: "Serveur Dédié & Cloud Souverain",
      subtitle: "Hébergement Transparent & Audit Continu",
      description: "Infrastructure de surveillance en temps réel garantissant la sécurité des smart contracts et la résilience du réseau.",
      resolution: "3840 x 2160"
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1573164067507-638ed0851e44?q=80&w=1200&auto=format&fit=crop",
      category: "Concept 3D",
      title: "Horizon 2026 : Indépendance Monétaire",
      subtitle: "Vision Stratégique Panafricaine",
      description: "Un regard prospectif vers l'interconnexion monétaire régionale portée par la transparence du grand livre distribué.",
      resolution: "3840 x 2160"
    },
    {
      id: 9,
      url: "https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=1200&auto=format&fit=crop",
      category: "Marketing",
      title: "Hackathon & Conférence Web3 Kinshasa",
      subtitle: "Jeunesse Congolaise & Développement",
      description: "Atelier de formation réunissant plus de 200 développeurs et passionnés de tech pour bâtir des solutions sur CDF.",
      resolution: "3200 x 2000"
    },
    {
      id: 10,
      url: "https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=1200&auto=format&fit=crop",
      category: "Institution",
      title: "La Balance de Justice & Stabilité",
      subtitle: "Devise Nationale : Justice - Paix - Travail",
      description: "Allégorie de l'équilibre financier retrouvée grâce à une politique monétaire transparente à approvisionnement plafonné.",
      resolution: "2800 x 1800"
    },
    {
      id: 11,
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
      category: "Marketing",
      title: "Ambassadeurs Diaspora & Territoires",
      subtitle: "Communauté Mondiale CDF",
      description: "Les délégations de la diaspora à Paris, Bruxelles, Johannesburg et Montréal unies pour soutenir l'économie nationale.",
      resolution: "3000 x 2000"
    },
    {
      id: 12,
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
      category: "Concept 3D",
      title: "Flux Quantique de Valeur",
      subtitle: "Transactions Sans Frontières",
      description: "Visualisation artistique des micro-paiements circulant instantanément entre les 26 provinces de la République.",
      resolution: "3840 x 2160"
    }
  ];

  const photoCategories = ['Tous', 'Marketing', 'Technologie', 'Adoption', 'Concept 3D', 'Institution'];

  const filteredVideos = videoCategory === 'Tous'
    ? videoGuides
    : videoGuides.filter(v => v.category === videoCategory);

  const filteredPhotos = activePhotoCategory === 'Tous'
    ? galleryPhotos
    : galleryPhotos.filter(p => p.category === activePhotoCategory);

  const marketingAssets: MarketingAsset[] = [
    {
      id: "logo-pack",
      title: "Pack Logos Vectoriels CDF (SVG & PNG)",
      type: "Identité Visuelle",
      format: "SVG + PNG HD",
      description: "Logo officiel avec étoiles de la RDC, déclinaisons sur fond sombre, fond clair et icône carrée pour applications.",
      previewUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
      fileName: "CDF-Logo-Official-Pack.svg",
      downloadData: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500"><rect width="500" height="500" rx="100" fill="#020617"/><circle cx="250" cy="250" r="180" stroke="#3b82f6" stroke-width="8" fill="none"/><polygon points="250,110 275,185 355,185 290,230 315,305 250,260 185,305 210,230 145,185 225,185" fill="#eab308"/><text x="250" y="380" font-family="Arial, sans-serif" font-size="44" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="6">FRANC CONGOLAIS</text><text x="250" y="425" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#3b82f6" text-anchor="middle" letter-spacing="4">CDF • BEP-20</text></svg>`
    },
    {
      id: "banner-x",
      title: "Bannière Officielle X / Twitter & LinkedIn",
      type: "Social Media",
      format: "1500 x 500 px",
      description: "Bannière patriotique haute définition avec slogan Justice - Paix - Travail et adresse de contrat vérifiée.",
      previewUrl: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=600&auto=format&fit=crop",
      fileName: "CDF-Banniere-Twitter-Officielle.svg",
      downloadData: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 500" width="1500" height="500"><rect width="1500" height="500" fill="#030712"/><circle cx="1300" cy="250" r="300" fill="#1d4ed8" opacity="0.15"/><circle cx="200" cy="400" r="250" fill="#eab308" opacity="0.1"/><text x="120" y="200" font-family="Georgia, serif" font-size="64" font-weight="900" fill="#ffffff">FRANC CONGOLAIS (CDF)</text><text x="120" y="270" font-family="Georgia, serif" font-size="32" font-style="italic" fill="#eab308">Souveraineté Monétaire • Justice - Paix - Travail</text><text x="120" y="350" font-family="Courier New, monospace" font-size="22" fill="#94a3b8">Contrat BSC : 0x18e173fdeb700568a08d1d7049309ae322d27777</text><text x="120" y="420" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#3b82f6" letter-spacing="4">OFFICIAL COMMUNITY • BEP-20</text></svg>`
    },
    {
      id: "flyer-a4",
      title: "Affiche Marchands A4 'Paiement CDF Accepté'",
      type: "Support Print",
      format: "A4 Prêt à Imprimer",
      description: "Affiche prête à plastifier pour comptoirs de vente, restaurants et kiosques mobiles de Kinshasa et provinces.",
      previewUrl: "https://images.unsplash.com/photo-1620712943543-bcc4628c9757?q=80&w=600&auto=format&fit=crop",
      fileName: "Affiche-Paiement-CDF-Accepte-A4.svg",
      downloadData: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1130" width="800" height="1130"><rect width="800" height="1130" fill="#0f172a"/><rect x="40" y="40" width="720" height="1050" rx="30" fill="none" stroke="#eab308" stroke-width="6"/><circle cx="400" cy="200" r="80" fill="#1e3a8a"/><polygon points="400,140 415,180 460,180 425,205 440,245 400,220 360,245 375,205 340,180 385,180" fill="#eab308"/><text x="400" y="350" font-family="Georgia, serif" font-size="44" font-weight="900" fill="#ffffff" text-anchor="middle">ICI NOUS ACCEPTONS LE</text><text x="400" y="420" font-family="Georgia, serif" font-size="52" font-weight="900" fill="#eab308" text-anchor="middle">FRANC CONGOLAIS</text><text x="400" y="480" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#3b82f6" text-anchor="middle" letter-spacing="6">TOKEN CDF (BEP-20)</text><rect x="250" y="550" width="300" height="300" rx="20" fill="#ffffff"/><text x="400" y="715" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#0f172a" text-anchor="middle">[ QR CODE SMART CONTRACT ]</text><text x="400" y="920" font-family="Courier New, monospace" font-size="16" fill="#94a3b8" text-anchor="middle">0x18e173fdeb700568a08d1d7049309ae322d27777</text><text x="400" y="990" font-family="Georgia, serif" font-size="22" font-style="italic" fill="#ffffff" text-anchor="middle">Paiement instantané • Sans commission bancaire</text></svg>`
    },
    {
      id: "wallpaper-mobile",
      title: "Fonds d'écran HD Mobile & Desktop",
      type: "Wallpaper",
      format: "1080 x 2400 (Mobile 9:16)",
      description: "Visuel élégant fond sombre et or pour iPhone & Android avec devise patriotique Justice - Paix - Travail.",
      previewUrl: "https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?q=80&w=600&auto=format&fit=crop",
      fileName: "CDF-Wallpaper-Mobile-HD.svg",
      downloadData: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 2400" width="1080" height="2400"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#020617"/><stop offset="50%" stop-color="#0f172a"/><stop offset="100%" stop-color="#020617"/></linearGradient></defs><rect width="1080" height="2400" fill="url(#bg)"/><circle cx="540" cy="1100" r="350" fill="#1e3a8a" opacity="0.25"/><polygon points="540,850 580,970 710,970 605,1045 645,1165 540,1090 435,1165 475,1045 370,970 500,970" fill="#eab308"/><text x="540" y="1400" font-family="Georgia, serif" font-size="72" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="4">CDF</text><text x="540" y="1480" font-family="Arial, sans-serif" font-size="34" font-weight="bold" fill="#3b82f6" text-anchor="middle" letter-spacing="8">FRANC CONGOLAIS</text><text x="540" y="1560" font-family="Georgia, serif" font-size="32" font-style="italic" fill="#94a3b8" text-anchor="middle">Justice • Paix • Travail</text><text x="540" y="2100" font-family="Courier New, monospace" font-size="20" fill="#64748b" text-anchor="middle">Binance Smart Chain (BEP-20)</text></svg>`
    }
  ];

  const marketingCopies = [
    {
      id: "copy-short",
      label: "Message Court (WhatsApp & Statuts)",
      text: `🇨🇩 Le Franc Congolais (CDF) entre dans l'ère de la souveraineté numérique !
💎 1,000,000,000 tokens fixes sur Binance Smart Chain (BEP-20).
🛡️ Sécurisé, audité et transparent pour l'économie nationale.
📍 Contrat Officiel : 0x18e173fdeb700568a08d1d7049309ae322d27777
Rejoignez le mouvement : https://franccongolais.github.io/fc.github.io`
    },
    {
      id: "copy-social",
      label: "Post X / Twitter & Facebook Officiel",
      text: `🚀 La RDC franchit une étape historique avec le Franc Congolais numérique $CDF !
✨ Objectif stratégique : inclusion financière, protection contre l'inflation et micro-crédits pour nos entrepreneurs.
🔗 Achetez vos tokens sur PancakeSwap ou Binance Web3 :
Contrat : 0x18e173fdeb700568a08d1d7049309ae322d27777
#CDF #FrancCongolais #RDC #Congo #Binance #CryptoRDC #BEP20`
    },
    {
      id: "copy-merchant",
      label: "Pitch Commerçants & Entreprises Locales",
      text: `Bonjour ! Pourquoi accepter le Franc Congolais (CDF) dans votre commerce ?
1️⃣ 0% de frais intermédiaires exorbitants par rapport aux cartes bancaires
2️⃣ Encaissement instantané en 3 secondes sur votre téléphone
3️⃣ Valeur sécurisée sur la blockchain Binance Smart Chain
4️⃣ Modernisez votre clientèle et fidélisez la jeunesse connectée
Contactez notre équipe ambassadeur pour obtenir votre kit affiche QR Code gratuit !`
    }
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTextId(id);
    setTimeout(() => setCopiedTextId(null), 2500);
  };

  const copyContractAddress = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2500);
  };

  const downloadAssetFile = (asset: MarketingAsset) => {
    const blob = new Blob([asset.downloadData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = asset.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sharePhotoToSocial = (photo: GalleryPhoto, platform: 'twitter' | 'whatsapp' | 'telegram') => {
    const message = encodeURIComponent(`Découvrez la vision du Franc Congolais (CDF) : ${photo.title} - ${photo.subtitle}. Contrat officiel : ${contractAddress} https://franccongolais.github.io/fc.github.io`);
    let shareUrl = '';
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${message}&hashtags=CDF,FrancCongolais,RDC`;
    } else if (platform === 'whatsapp') {
      shareUrl = `https://api.whatsapp.com/send?text=${message}`;
    } else if (platform === 'telegram') {
      shareUrl = `https://t.me/share/url?url=https://franccongolais.github.io/fc.github.io&text=${message}`;
    }
    window.open(shareUrl, '_blank');
  };

  return (
    <section id="media" className="py-32 bg-slate-950 relative overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-1/4 -right-64 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-64 w-[600px] h-[600px] bg-yellow-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-serif uppercase tracking-[0.2em] font-bold text-blue-400">
              Centre Médias & Marketing Officiel
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-black text-white mb-6 tracking-tight"
          >
            Guides Vidéos, Galerie & <span className="text-gradient-gold">Marketing</span>
          </motion.h2>

          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 via-yellow-500 to-blue-600 mx-auto rounded-full mb-8"></div>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-3xl mx-auto text-lg md:text-xl font-serif italic leading-relaxed"
          >
            Maîtrisez l'écosystème Franc Congolais (CDF) grâce à nos tutoriels guidés pas-à-pas, téléchargez les supports de communication officiels et explorez la galerie cinématique de la nation.
          </motion.p>

          {/* Sub-Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {[
              { id: 'videos', label: 'Guides Vidéos & Formations', icon: Video, count: videoGuides.length },
              { id: 'photos', label: 'Galerie Photo & Visuels', icon: ImageIcon, count: galleryPhotos.length },
              { id: 'marketing', label: 'Centre Marketing & Kit Presse', icon: Megaphone, count: marketingAssets.length },
              { id: 'updates', label: 'Dernières Nouveautés & Contrat', icon: Flame, badge: 'Nouveau Contrat' }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = mediaTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setMediaTab(tab.id as any)}
                  className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl text-xs md:text-sm font-serif font-bold tracking-wider transition-all duration-300 border ${
                    isActive 
                      ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-600/30 scale-105' 
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-500'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                  {tab.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-yellow-500 text-slate-950 animate-pulse">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* TAB 1: GUIDES VIDÉOS                                         */}
        {/* ============================================================ */}
        {mediaTab === 'videos' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Category Filter for Videos */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 border-b border-white/5 pb-8">
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-serif font-bold text-white flex items-center gap-3 justify-center sm:justify-start">
                  <div className="p-2 bg-red-600/20 rounded-xl border border-red-600/30">
                    <Play className="w-5 h-5 text-red-500 fill-current" />
                  </div>
                  Formations Numériques Disponibles
                </h3>
                <p className="text-slate-500 text-sm font-serif italic mt-1">
                  Cliquez sur un tutoriel pour ouvrir le lecteur interactif et le guide détaillé.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {videoCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setVideoCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all border ${
                      videoCategory === cat
                        ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/20'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video, idx) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="group glass-card rounded-3xl overflow-hidden border border-white/5 hover:border-blue-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-600/10 flex flex-col justify-between"
                >
                  {/* Video Thumbnail */}
                  <div 
                    onClick={() => {
                      setSelectedVideo(video);
                      setIsPlayingSimulated(false);
                    }}
                    className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer group"
                  >
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-70"></div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-blue-600/90 group-hover:bg-red-600 rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-110 transition-all duration-300">
                        <Play className="w-7 h-7 text-white fill-current ml-1" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-full font-mono border border-white/10 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {video.duration}
                    </div>

                    {/* Category & Level Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-blue-600/30 backdrop-blur-md rounded-full border border-blue-500/40 text-[9px] font-black uppercase tracking-wider text-blue-300">
                        {video.category}
                      </span>
                      <span className="px-2 py-0.5 bg-white/10 backdrop-blur-md rounded-full text-[9px] font-bold text-slate-300">
                        {video.level}
                      </span>
                    </div>
                  </div>

                  {/* Video Description */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 
                        onClick={() => {
                          setSelectedVideo(video);
                          setIsPlayingSimulated(false);
                        }}
                        className="text-lg font-serif font-bold text-white mb-2 group-hover:text-blue-400 transition-colors leading-snug cursor-pointer line-clamp-2"
                      >
                        {video.title}
                      </h4>
                      <p className="text-slate-400 text-xs leading-relaxed font-serif italic mb-6 line-clamp-2">
                        {video.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setSelectedVideo(video);
                          setIsPlayingSimulated(false);
                        }}
                        className="flex items-center gap-2 text-xs font-serif font-bold text-blue-400 group-hover:text-white transition-colors"
                      >
                        Ouvrir le guide <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <span className="text-[10px] text-slate-500 font-mono">
                        {video.keySteps.length} étapes
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: GALERIE PHOTO CINÉMATIQUE                             */}
        {/* ============================================================ */}
        {mediaTab === 'photos' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Category Filter for Photos */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 border-b border-white/5 pb-8">
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-serif font-bold text-white flex items-center gap-3 justify-center sm:justify-start">
                  <div className="p-2 bg-yellow-600/20 rounded-xl border border-yellow-600/30">
                    <ImageIcon className="w-5 h-5 text-yellow-500" />
                  </div>
                  Photothèque & Conceptions 3D
                </h3>
                <p className="text-slate-500 text-sm font-serif italic mt-1">
                  Visuels officiels libres de droits pour la presse, les commerçants et la communauté.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {photoCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActivePhotoCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-serif font-bold transition-all border ${
                      activePhotoCategory === cat
                        ? 'bg-yellow-500 border-yellow-400 text-slate-950 font-black shadow-lg shadow-yellow-500/20'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Photo Cards Grid */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredPhotos.map((photo) => (
                  <motion.div
                    key={photo.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => setSelectedPhoto(photo)}
                    className="group relative aspect-[4/5] overflow-hidden rounded-3xl glass-card cursor-pointer border border-white/5 hover:border-yellow-500/40 transition-all duration-500 shadow-xl"
                  >
                    <img 
                      src={photo.url} 
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-75 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent mix-blend-multiply opacity-80 group-hover:opacity-60 transition-opacity"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Hover Inspect Icon */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900/70 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-5 h-5" />
                    </div>

                    {/* Card Content Overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-6 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="mb-2">
                        <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-yellow-400">
                          {photo.category}
                        </span>
                      </div>
                      <h4 className="text-xl font-serif font-black text-white group-hover:text-yellow-400 transition-colors leading-tight mb-1">
                        {photo.title}
                      </h4>
                      <p className="text-slate-300 text-xs font-serif italic mb-3">
                        {photo.subtitle}
                      </p>
                      <div className="pt-3 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>{photo.resolution}</span>
                        <span className="text-blue-400 flex items-center gap-1 font-sans font-bold">
                          Agrandir & Partager <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: CENTRE MARKETING & KIT AMBASSADEUR                   */}
        {/* ============================================================ */}
        {mediaTab === 'marketing' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-20"
          >
            {/* Intro Banner */}
            <div className="p-8 md:p-12 glass-card rounded-3xl border border-white/10 bg-gradient-to-r from-blue-900/20 via-slate-900 to-yellow-900/20 relative overflow-hidden">
              <div className="relative z-10 max-w-2xl">
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold inline-block mb-4">
                  Ressources Marque & Ambassadeurs
                </span>
                <h3 className="text-3xl md:text-4xl font-serif font-black text-white mb-4">
                  Téléchargez le Kit de Campagne CDF Officiel
                </h3>
                <p className="text-slate-300 text-sm md:text-base font-serif italic leading-relaxed mb-6">
                  Tous les supports graphiques, affiches de point de vente et chartes graphiques pour promouvoir le Franc Congolais auprès de vos proches, marchands et abonnés réseaux sociaux.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => downloadAssetFile(marketingAssets[0])}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-serif font-bold uppercase tracking-wider rounded-xl shadow-xl shadow-blue-600/20 flex items-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" /> Télécharger Logo SVG
                  </button>
                  <button 
                    onClick={() => downloadAssetFile(marketingAssets[2])}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-serif font-bold uppercase tracking-wider rounded-xl border border-white/10 flex items-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" /> Affiche A4 Marchands
                  </button>
                </div>
              </div>
            </div>

            {/* Brand Assets Cards */}
            <div>
              <div className="mb-8">
                <h4 className="text-2xl font-serif font-bold text-white flex items-center gap-3">
                  <Layers className="w-6 h-6 text-blue-400" />
                  Supports Graphiques Téléchargeables
                </h4>
                <p className="text-slate-500 text-sm font-serif italic">
                  Fichiers vectoriels et visuels créés sur mesure avec la nouvelle identité et le contrat officiel.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {marketingAssets.map((asset) => (
                  <div 
                    key={asset.id}
                    className="glass-card rounded-2xl p-6 border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="aspect-video w-full rounded-xl overflow-hidden mb-4 bg-slate-900 relative">
                        <img 
                          src={asset.previewUrl} 
                          alt={asset.title} 
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" 
                        />
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-900/90 text-white text-[9px] font-mono border border-white/10">
                          {asset.format}
                        </span>
                      </div>
                      <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                        {asset.type}
                      </span>
                      <h5 className="text-base font-serif font-bold text-white mt-1 mb-2 leading-tight">
                        {asset.title}
                      </h5>
                      <p className="text-slate-400 text-xs font-serif italic leading-relaxed mb-4">
                        {asset.description}
                      </p>
                    </div>

                    <button
                      onClick={() => downloadAssetFile(asset)}
                      className="w-full py-2.5 px-4 bg-white/5 hover:bg-blue-600 text-white rounded-xl text-xs font-serif font-bold tracking-wider transition-colors flex items-center justify-center gap-2 border border-white/10 hover:border-blue-500"
                    >
                      <Download className="w-3.5 h-3.5" /> Télécharger ({asset.format})
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Ready-to-use Marketing Copywriting */}
            <div>
              <div className="mb-8">
                <h4 className="text-2xl font-serif font-bold text-white flex items-center gap-3">
                  <FileText className="w-6 h-6 text-yellow-400" />
                  Messages Clés Prêts à Copier-Coller
                </h4>
                <p className="text-slate-500 text-sm font-serif italic">
                  Gagnez du temps dans vos publications grâce à nos textes approuvés par l'équipe officielle.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {marketingCopies.map((copy) => (
                  <div 
                    key={copy.id}
                    className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-serif font-bold text-yellow-400 uppercase tracking-wider block mb-3">
                        {copy.label}
                      </span>
                      <div className="p-4 bg-slate-900/80 rounded-xl border border-white/5 font-mono text-xs text-slate-300 whitespace-pre-line leading-relaxed mb-4 select-all">
                        {copy.text}
                      </div>
                    </div>

                    <button
                      onClick={() => copyToClipboard(copy.text, copy.id)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-serif font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border ${
                        copiedTextId === copy.id
                          ? 'bg-green-600 border-green-500 text-white'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                      }`}
                    >
                      {copiedTextId === copy.id ? (
                        <>
                          <Check className="w-4 h-4 text-white" /> Texte Copié !
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-slate-400" /> Copier le Texte
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: DERNIÈRES NOUVEAUTÉS & CONTRAT                       */}
        {/* ============================================================ */}
        {mediaTab === 'updates' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            {/* Contract Migration Notice Banner */}
            <div className="p-8 md:p-12 glass-card rounded-3xl border border-yellow-500/30 bg-gradient-to-b from-yellow-500/10 via-slate-900 to-slate-950 relative overflow-hidden shadow-2xl">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="space-y-4 max-w-2xl text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-bold font-mono">
                    <ShieldCheck className="w-4 h-4" /> CONTRAT OFFICIEL VÉRIFIÉ (BSC BEP-20)
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif font-black text-white">
                    Mise à Jour Majeure : Ticker <span className="text-yellow-400">CDF</span> & Nouveau Contrat
                  </h3>
                  <p className="text-slate-300 font-serif italic text-base leading-relaxed">
                    Conformément aux directives de souveraineté nationale, le symbole a été officiellement harmonisé en <strong className="text-white">CDF</strong> avec le déploiement du nouveau contrat BEP-20 sécurisé. Assurez-vous d'utiliser uniquement l'adresse officielle ci-dessous.
                  </p>
                </div>

                <div className="w-full lg:w-auto p-6 bg-slate-950 rounded-2xl border border-white/10 flex flex-col items-center gap-4 shrink-0">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Adresse Officielle BEP-20</span>
                  <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 font-mono text-sm text-yellow-400 text-center select-all break-all">
                    {contractAddress}
                  </div>
                  <button
                    onClick={copyContractAddress}
                    className={`w-full py-3 px-6 rounded-xl font-serif font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      copiedContract 
                        ? 'bg-green-600 text-white' 
                        : 'bg-yellow-500 hover:bg-yellow-400 text-slate-950'
                    }`}
                  >
                    {copiedContract ? (
                      <>
                        <Check className="w-4 h-4" /> Adresse Copiée !
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copier l'Adresse
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Changelog & Milestones */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card rounded-2xl p-8 border border-white/5 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-serif font-black text-lg">
                  01
                </div>
                <h4 className="text-xl font-serif font-bold text-white">Nouveau Contrat BSC BEP-20</h4>
                <p className="text-slate-400 text-sm font-serif italic leading-relaxed">
                  Déploiement du modèle proxy OpenZeppelin avec protection renforcée contre le réentrance et compatibilité multi-signature native.
                </p>
                <div className="text-xs text-blue-400 font-mono">Status : Déployé & Actif</div>
              </div>

              <div className="glass-card rounded-2xl p-8 border border-white/5 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-600/20 text-yellow-400 flex items-center justify-center font-serif font-black text-lg">
                  02
                </div>
                <h4 className="text-xl font-serif font-bold text-white">Harmonisation Ticker CDF</h4>
                <p className="text-slate-400 text-sm font-serif italic leading-relaxed">
                  Remplacement du sigle FC par le standard officiel CDF (Franc Congolais) sur tous les outils, explorateurs, paires d'échange et documents légaux.
                </p>
                <div className="text-xs text-yellow-400 font-mono">Status : Effectif Globalement</div>
              </div>

              <div className="glass-card rounded-2xl p-8 border border-white/5 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-green-600/20 text-green-400 flex items-center justify-center font-serif font-black text-lg">
                  03
                </div>
                <h4 className="text-xl font-serif font-bold text-white">Centre Marketing & Médias</h4>
                <p className="text-slate-400 text-sm font-serif italic leading-relaxed">
                  Ajout d'une médiathèque enrichie avec tutoriels vidéo interactifs, kits ambassadeurs et supports print pour commerçants congolais.
                </p>
                <div className="text-xs text-green-400 font-mono">Status : Disponible Maintenant</div>
              </div>
            </div>
          </motion.div>
        )}

      </div>

      {/* ============================================================ */}
      {/* MODAL 1: INTERACTIVE VIDEO GUIDE VIEWER                      */}
      {/* ============================================================ */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-red-600/20 text-red-400 rounded-xl border border-red-600/30">
                    <Play className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">
                      {selectedVideo.category} • {selectedVideo.level} • {selectedVideo.duration}
                    </span>
                    <h3 className="text-white font-serif font-bold text-lg md:text-xl">
                      {selectedVideo.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedVideo(null)}
                  className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto p-6 md:p-8 space-y-8">
                {/* Simulated Interactive Video Screen */}
                <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                  <img 
                    src={selectedVideo.thumbnail} 
                    alt={selectedVideo.title} 
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      isPlayingSimulated ? 'opacity-30' : 'opacity-70'
                    }`}
                  />
                  
                  {isPlayingSimulated ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-950/80">
                      <div className="w-16 h-16 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center mb-4 animate-pulse">
                        <Play className="w-8 h-8 fill-current ml-1" />
                      </div>
                      <h4 className="text-white font-serif font-bold text-lg mb-2">
                        Lecture du Guide Vidéo en Streaming
                      </h4>
                      <p className="text-slate-400 text-xs font-serif italic max-w-md mb-4">
                        Suivez les étapes détaillées ci-dessous en temps réel pour configurer votre portefeuille en toute sécurité.
                      </p>
                      <button
                        onClick={() => setIsPlayingSimulated(false)}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-mono"
                      >
                        Mettre en pause
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => setIsPlayingSimulated(true)}
                      className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-slate-950/40 hover:bg-slate-950/20 transition-colors"
                    >
                      <div className="w-20 h-20 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                        <Play className="w-9 h-9 fill-current ml-1" />
                      </div>
                      <span className="text-white font-serif text-sm font-bold mt-4 tracking-wider uppercase">
                        Cliquer pour lancer la vidéo
                      </span>
                    </div>
                  )}

                  {/* Progress Bar Simulation */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-slate-950/80 backdrop-blur-md flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-white/10">
                    <span>0:00 / {selectedVideo.duration}</span>
                    <div className="flex-1 mx-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full bg-red-600 rounded-full transition-all duration-1000 ${
                        isPlayingSimulated ? 'w-1/3' : 'w-0'
                      }`}></div>
                    </div>
                    <span>1080p HD</span>
                  </div>
                </div>

                {/* Step-by-Step Breakdown */}
                <div>
                  <h4 className="text-lg font-serif font-bold text-white mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    Étapes Pratiques du Guide
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedVideo.keySteps.map((step, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-slate-300 text-xs font-serif leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contract Reminder in Modal */}
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-yellow-500 font-bold uppercase tracking-wider block">
                      Contrat Vérifié pour cette opération
                    </span>
                    <span className="text-xs text-white font-mono">{contractAddress}</span>
                  </div>
                  <button
                    onClick={copyContractAddress}
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-950 text-xs font-serif font-bold uppercase tracking-wider rounded-xl transition-colors shrink-0 flex items-center gap-2"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copier
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-800 bg-slate-950/70 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-400 font-serif italic">
                  Besoin d'assistance personnalisée ? Notre bot IA et la communauté Telegram sont disponibles 24/7.
                </p>
                {selectedVideo.ctaLink && (
                  <a
                    href={selectedVideo.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-serif font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-2"
                  >
                    {selectedVideo.ctaText || "Accéder"} <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* MODAL 2: HIGH-RES PHOTO LIGHTBOX & SHARE                     */}
      {/* ============================================================ */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Lightbox Header */}
              <div className="p-4 md:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
                <div>
                  <span className="text-[10px] font-mono text-yellow-400 uppercase tracking-widest">
                    {selectedPhoto.category} • {selectedPhoto.resolution}
                  </span>
                  <h3 className="text-white font-serif font-bold text-lg md:text-xl">
                    {selectedPhoto.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Image Container */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6">
                <div className="flex-1 bg-black rounded-2xl overflow-hidden flex items-center justify-center min-h-[320px] max-h-[500px]">
                  <img 
                    src={selectedPhoto.url} 
                    alt={selectedPhoto.title} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Details & Actions Sidebar */}
                <div className="w-full lg:w-80 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-serif uppercase tracking-widest text-slate-400 mb-1">
                        Légende Officielle
                      </h4>
                      <p className="text-base font-serif font-bold text-white">
                        {selectedPhoto.subtitle}
                      </p>
                    </div>

                    <p className="text-slate-300 text-xs font-serif italic leading-relaxed">
                      {selectedPhoto.description}
                    </p>

                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1 text-[11px] font-mono text-slate-400">
                      <div>Résolution : {selectedPhoto.resolution}</div>
                      <div>Licence : Creative Commons CC-BY (Usage Libre)</div>
                    </div>
                  </div>

                  {/* Share & Download Buttons */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <span className="text-[10px] uppercase tracking-widest font-mono text-slate-400 block">
                      Partager sur vos Réseaux :
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => sharePhotoToSocial(selectedPhoto, 'whatsapp')}
                        className="py-2.5 px-3 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-xl text-xs font-serif font-bold transition-all flex items-center justify-center gap-1 border border-emerald-500/30"
                      >
                        <Send className="w-3.5 h-3.5" /> WhatsApp
                      </button>
                      <button
                        onClick={() => sharePhotoToSocial(selectedPhoto, 'telegram')}
                        className="py-2.5 px-3 bg-sky-600/20 hover:bg-sky-600 text-sky-300 hover:text-white rounded-xl text-xs font-serif font-bold transition-all flex items-center justify-center gap-1 border border-sky-500/30"
                      >
                        <Send className="w-3.5 h-3.5" /> Telegram
                      </button>
                      <button
                        onClick={() => sharePhotoToSocial(selectedPhoto, 'twitter')}
                        className="py-2.5 px-3 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white rounded-xl text-xs font-serif font-bold transition-all flex items-center justify-center gap-1 border border-blue-500/30"
                      >
                        <Share2 className="w-3.5 h-3.5" /> X / Twitter
                      </button>
                    </div>

                    <a
                      href={selectedPhoto.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-serif font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" /> Ouvrir l'Image Haute Définition
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default MediaGallery;
