import { ServiceItem, ProjectItem, ReviewItem, ColorSwatch, FaqItem } from '../types';

export const COMPANY_INFO = {
  name: 'Signature Premium Paint Services',
  shortName: 'Signature Paint',
  tagline: 'Quality Paint. Lasting Impression.',
  phone: '021 082 57495',
  phoneTel: 'tel:02108257495',
  email: 'signaturepaint27@gmail.com',
  location: 'Papakura, Auckland',
  serviceArea: 'All Greater Auckland (Papakura, Manukau, Auckland Central, North Shore, West Auckland, Franklin & East Auckland)',
  experience: '5+ Years of Experience',
  badges: ['Quality Work', 'On Time', 'Affordable Price'],
  guarantee: '5-Year Workmanship Warranty & Satisfaction Guarantee'
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'interior-painting',
    title: 'Interior Painting',
    subtitle: 'Refresh inside your home.',
    description: 'Transform your indoor spaces with meticulous wall preparation, razor-sharp cut-ins, and smooth, flawless roller finishes. We handle ceilings, feature walls, doors, skirtings, and window architraves with minimal disruption to your daily routine.',
    image: '/assets/crops/service_interior.png',
    icon: 'home',
    features: [
      'Comprehensive floor & furniture masking with dust-free containment',
      'Gap filling, micro-sanding, and spot priming before first coat',
      'Premium washable low-VOC paints (Dulux Wash&Wear or Resene SpaceCote)',
      'Sharp two-tone cutting-in on ceilings and skirting boards',
      'Full daily cleanup leaving your home spotless'
    ],
    preparation: [
      'Removal of picture hooks, light switch plates, and fixture protection',
      'Sugar soap washdown for grease removal in kitchens and dining areas',
      'High-grade acrylic gap filling along skirting and door jambs',
      'Machine sand with HEPA vacuum extraction for flat surfaces'
    ],
    recommendedPaints: ['Dulux Wash&Wear Low Sheen', 'Resene SpaceCote Low Sheen', 'Dulux Ceiling Flat White'],
    typicalDuration: '2 - 4 days for standard 3-bedroom house',
    startingPrice: 'From $450 per room'
  },
  {
    id: 'exterior-painting',
    title: 'Exterior Painting',
    subtitle: 'Protect and beautify your property.',
    description: 'Auckland’s coastal weather, harsh UV, and high humidity demand durable exterior protection. We apply multi-coat weatherproof systems designed to shield weatherboards, brick, render, fascia, and soffits for a decade or more.',
    image: '/assets/crops/service_exterior.png',
    icon: 'house',
    features: [
      'Eco-friendly soft wash & anti-fungal moss/mould treatment',
      'Scraping of all loose, bubbled, or peeling paint to bare substrate',
      'Timber primer sealer followed by 2 thick coats of exterior acrylic',
      'Complete scaffold and ladder safety compliance',
      'Weather-tolerant flexible sealants for weatherboard expansion joints'
    ],
    preparation: [
      'Targeted water blasting to eliminate grime and salt buildup',
      'Filling timber knots, screw holes, and checking with exterior filler',
      'Oil-based or waterborne pigmented wood sealer on bare timber',
      'Full window masking and drop-cloth landscape shielding'
    ],
    recommendedPaints: ['Dulux Weathershield MaxFlex', 'Resene Sonyx 101', 'Dulux Roof & Trim'],
    typicalDuration: '5 - 10 working days (weather permitting)',
    startingPrice: 'From $3,500 for single-storey home'
  },
  {
    id: 'plastering',
    title: 'Plastering',
    subtitle: 'Smooth perfect surfaces.',
    description: 'Achieve mirror-smooth Level 4 and Level 5 finishes with our master gib stopping and skim coating services. Whether you have newly installed plasterboard or old uneven walls, we produce silky uniform surfaces ready for paint.',
    image: '/assets/crops/service_plastering.png',
    icon: 'paint-roller',
    features: [
      'Gib stopping tape and 3-coat compound application',
      'Level 5 skim coating for critical light hallways and living rooms',
      'Ultra-fine orbital sanding with powerful dust extraction',
      'Cove, cornice, and square-stop modern architectural detailing',
      'Inspection with powerful raking work lights to ensure zero ripples'
    ],
    preparation: [
      'Substrate screw depth check and board stabilization',
      'Paper or fibreglass joint reinforcement taping',
      'Basecoat application with drying compound',
      'Finishing coat and feathering edges beyond 300mm'
    ],
    recommendedPaints: ['Dulux 1Step Prep Primer', 'Resene Broadwall Surface Prep', 'Resene Sureseal'],
    typicalDuration: '1 - 3 days depending on room count',
    startingPrice: 'From $280 per room / joint'
  },
  {
    id: 'wall-repairs',
    title: 'Wall Repairs',
    subtitle: 'Fix & restore with expert care.',
    description: 'From door-handle punch holes, settlement cracks, and tenant damage to water staining and peeling gib paper, our repair specialists patch, blend, and restore your drywall so the repair is completely invisible.',
    image: '/assets/crops/service_wallrepairs.png',
    icon: 'wrench',
    features: [
      'California patch technique for large holes with internal backing',
      'Stress crack mesh reinforcement that prevents cracks from returning',
      'Stain-blocking primer sealers to prevent water or smoke bleed-through',
      'Exact paint matching using precision spectrophotometer analysis',
      'Same-day service available for urgent tenancy move-outs'
    ],
    preparation: [
      'Carving back damaged plasterboard to sound material',
      'Timber backing block installation for structural integrity',
      'Compound feathering and seamless gradient sanding',
      'Spot undercoat and topcoat blending'
    ],
    recommendedPaints: ['Zinsser B-I-N Primer Sealer', 'Dulux Precision Stain Blocker'],
    typicalDuration: '2 - 6 hours (often single visit)',
    startingPrice: 'From $180 per patch repair'
  },
  {
    id: 'colour-consultation',
    title: 'Colour Consultation',
    subtitle: 'Get the perfect colour for your space.',
    description: 'Choosing the right white, warm neutral, or striking feature tone can feel overwhelming. Our experienced Auckland colour specialists visit your space, assess your natural sunlight orientation, and supply sample pots and large A4 swatch tests.',
    image: '/assets/crops/service_colours.png',
    icon: 'palette',
    features: [
      'On-site consultation assessing natural daylight and lighting conditions',
      'Complimentary test pots and large colour swatch brush-outs',
      'Comprehensive interior & exterior schemes tailored to Kiwi architectural styles',
      'Coordinating roof, joinery, gutter, and weatherboard harmonies',
      'Digital colour mockups and personalized specification sheet'
    ],
    preparation: [
      'Initial discussion of your aesthetic goals and furniture tones',
      'Sample placement on north vs south facing walls',
      'Evaluation under 3000K warm and 4000K natural LED lighting'
    ],
    recommendedPaints: ['Dulux Colours of New Zealand', 'Resene The Range Fashion Colours'],
    typicalDuration: '1.5 - 2 hour on-site session',
    startingPrice: 'Free with any painting package over $2,000'
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'project-1',
    title: 'Contemporary Open-Plan Living Room',
    category: 'interior',
    location: 'Remuera, Auckland',
    description: 'Complete ceiling and wall refresh with high-traffic scuff-resistant paint. Level 5 skim coating on critical light walls to eliminate shadows from large floor-to-ceiling sliding glass doors.',
    image: '/assets/crops/project_living.png',
    completionTime: '4 Days',
    colorsUsed: ['Dulux Okarito', 'Dulux Natural White', 'Dulux Southern Alps'],
    scope: 'Living Room, Dining, Kitchen Bulkheads & Architraves'
  },
  {
    id: 'project-2',
    title: 'Two-Storey Architectural Villa Exterior',
    category: 'exterior',
    location: 'Ponsonby, Auckland',
    description: 'Heritage villa restoration including thorough paint stripping of damaged weatherboards, oil priming, and 2 coats of UV-reflective exterior acrylic in classic heritage contrast.',
    image: '/assets/crops/project_villa.png',
    completionTime: '9 Days',
    colorsUsed: ['Resene Half Tea', 'Resene Alabaster', 'Resene Foundry'],
    scope: 'Complete Weatherboards, Veranda Posts, Bargeboards & Windows'
  },
  {
    id: 'project-3',
    title: 'Modern Hampton Kitchen & Cabinetry Repaint',
    category: 'interior',
    location: 'Takapuna, Auckland',
    description: 'Refinishing of solid timber kitchen cabinetry and kitchen bulkheads using hardwearing polyurethane enamel paint, paired with moisture-resistant ceiling coatings.',
    image: '/assets/crops/project_kitchen.png',
    completionTime: '3 Days',
    colorsUsed: ['Dulux White on White', 'Resene Duck Egg Blue'],
    scope: 'Kitchen Cabinets, Trim, Splashback Walls & Ceilings'
  },
  {
    id: 'project-4',
    title: 'Executive Master Suite Deep Accent Wall',
    category: 'interior',
    location: 'Papakura, Auckland',
    description: 'Gib stopping repair after wardrobe alteration followed by a rich velvet-matte navy feature wall that elevates the bedroom atmosphere.',
    image: '/assets/crops/project_bedroom.png',
    completionTime: '2 Days',
    colorsUsed: ['Resene Karekare', 'Dulux Mt Aspiring'],
    scope: 'Master Bedroom, Walk-in Wardrobe & Ensuite Trims'
  },
  {
    id: 'project-5',
    title: 'Suburban Luxury Estate Exterior & Soffits',
    category: 'exterior',
    location: 'Karaka, Auckland',
    description: 'Extensive multi-surface painting covering modern masonry render, Linea weatherboard, soffit lining, and garage surround for maximum curb appeal and weather protection.',
    image: '/assets/crops/project_estate.png',
    completionTime: '7 Days',
    colorsUsed: ['Resene Black White', 'Resene Double Foundry', 'Dulux Monument'],
    scope: 'Exterior Cladding, Garage Portico & Boundary Pillars'
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'review-1',
    name: 'Sarah Khan',
    location: 'Auckland',
    rating: 5,
    comment: 'Excellent service! The team was professional, punctual and delivered outstanding results. Highly recommended!',
    avatar: '/assets/crops/client_sarah.png',
    date: '2 weeks ago',
    serviceType: 'Full Interior Painting'
  },
  {
    id: 'review-2',
    name: 'David Wilson',
    location: 'Papakura',
    rating: 5,
    comment: 'Amazing work! My home looks fantastic. On-time, within budget and great attention to detail.',
    avatar: '/assets/crops/client_david.png',
    date: '1 month ago',
    serviceType: 'Exterior Painting & Plastering'
  },
  {
    id: 'review-3',
    name: 'Emily Carter',
    location: 'Auckland',
    rating: 5,
    comment: 'Very reliable and easy to work with. Highly recommended! They patched our damaged rental walls so well you couldn’t tell anything had ever happened.',
    avatar: '/assets/crops/client_emily.png',
    date: '3 weeks ago',
    serviceType: 'Wall Repairs & Gib Stopping'
  },
  {
    id: 'review-4',
    name: 'Mark & Lisa Henderson',
    location: 'Manukau, Auckland',
    rating: 5,
    comment: 'Signature Paint took our 1990s weatherboard home and made it look brand new. Their prep work with sanding and gap filling was genuinely world-class.',
    avatar: '/assets/crops/client_sarah.png',
    date: 'Last month',
    serviceType: 'Exterior & Deck Staining'
  },
  {
    id: 'review-5',
    name: 'Bhavin Patel',
    location: 'Takanini, Auckland',
    rating: 5,
    comment: 'Clear communication from quotation to final walk-through. Fair and honest pricing with zero surprise charges. Will definitely hire them again.',
    avatar: '/assets/crops/client_david.png',
    date: '2 months ago',
    serviceType: 'Interior Refresh & Colour Advice'
  }
];

export const POPULAR_COLORS: ColorSwatch[] = [
  {
    id: 'okarito',
    name: 'Dulux Okarito',
    code: 'NZ SW 1A1',
    hex: '#F4F5F0',
    brand: 'Dulux NZ',
    description: 'A crisp, versatile pure white that brings fresh modern light into living spaces and hallways.',
    sheen: 'Low Sheen',
    category: 'whites'
  },
  {
    id: 'half-spanish-white',
    name: 'Resene Half Spanish White',
    code: 'Y87-024-086',
    hex: '#EDE2D0',
    brand: 'Resene',
    description: 'New Zealand’s all-time classic warm neutral. Cosy, gentle, and flattering in any room.',
    sheen: 'Matt',
    category: 'neutrals'
  },
  {
    id: 'mt-aspiring',
    name: 'Dulux Mt Aspiring',
    code: 'NZ SW 2D2',
    hex: '#DDDCD8',
    brand: 'Dulux NZ',
    description: 'Sophisticated architectural soft grey with subtle warm undertones. Pairs beautifully with timber.',
    sheen: 'Low Sheen',
    category: 'neutrals'
  },
  {
    id: 'karekare',
    name: 'Resene Karekare',
    code: 'B35-021-230',
    hex: '#1D2A3A',
    brand: 'Resene',
    description: 'Dramatic, ocean-inspired moody navy named after Auckland’s wild West Coast beach.',
    sheen: 'Matt',
    category: 'dramatic'
  },
  {
    id: 'flax-pod',
    name: 'Resene Flax Pod',
    code: 'N26-004-065',
    hex: '#2B2B2A',
    brand: 'Resene',
    description: 'Deep modern architectural charcoal-black with natural earthy depth. Popular for feature trims.',
    sheen: 'Semi-Gloss',
    category: 'dramatic'
  },
  {
    id: 'southern-alps',
    name: 'Dulux Southern Alps',
    code: 'NZ SW 1C1',
    hex: '#EBEAE5',
    brand: 'Dulux NZ',
    description: 'Soft stone white inspired by alpine light. Balances cool sunlight and artificial illumination.',
    sheen: 'Low Sheen',
    category: 'coastal'
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    question: 'Do you provide free on-site quotes across Auckland?',
    answer: 'Yes! We provide 100% free, no-obligation on-site inspections anywhere in Auckland—from Papakura, Manukau and Franklin through to Auckland Central and the North Shore. We measure up, check surface conditions, and deliver a transparent written quote within 24 hours.',
    category: 'Pricing & Quotes'
  },
  {
    question: 'What paint brands do you use?',
    answer: 'We exclusively apply premium, trade-tested New Zealand paints formulated for local UV and coastal weather: Dulux New Zealand (Wash&Wear, Weathershield, 1Step Prep) and Resene (SpaceCote, Sonyx 101, Lustacryl, Fly Deterrent). If you have a specific brand preference or architectural spec, we gladly accommodate it.',
    category: 'Materials'
  },
  {
    question: 'Are you insured and do you guarantee your workmanship?',
    answer: 'Absolutely. We carry comprehensive $5,000,000 public liability insurance for complete homeowner peace of mind. Every complete painting project includes our written 5-Year Workmanship Guarantee against blistering, peeling, or cracking due to application error.',
    category: 'Guarantee'
  },
  {
    question: 'How long does a typical painting project take?',
    answer: 'A standard 3-bedroom interior repaint typically takes 3 to 5 business days. A full single-storey exterior repaint usually takes 5 to 8 fine-weather working days. We provide a guaranteed start date and completion schedule in writing before commencing work.',
    category: 'Timeline'
  },
  {
    question: 'Do I need to move all my furniture out beforehand?',
    answer: 'No heavy lifting required on your part! We ask that you remove small fragile items, photos, and electronics. Our crew carefully moves large furniture to the centre of the room and protects everything under sealed, heavy-duty drop cloths and plastic sheeting.',
    category: 'Preparation'
  },
  {
    question: 'Can you match an existing wall colour or repair tenancy holes?',
    answer: 'Yes! We use digital colorimeters to sample your existing paint tone and achieve an exact colour and sheen match. We can also handle quick-turnaround repairs for gib cracks, tenant damage, and wall patching for rental inspections or property sales.',
    category: 'Repairs'
  }
];

export const AUCKLAND_SUBURBS = [
  'Papakura',
  'Takanini',
  'Manukau',
  'Karaka',
  'Drury',
  'Pukekohe',
  'Botany / East Tamaki',
  'Howick & Pakuranga',
  'Epsom & Remuera',
  'Auckland CBD & Central',
  'Ponsonby & Grey Lynn',
  'Takapuna & North Shore',
  'Henderson & West Auckland',
  'Albany & Silverdale'
];
