import { Category, Idea } from '@/types';

export const sampleCategories: Omit<Category, '_id'>[] = [
  {
    name: 'Social Impact',
    description: 'Solutions for community welfare, education, and healthcare challenges',
    icon: 'heart',
    color: '#DC2626',
    isActive: true,
    ideaCount: 0,
    language: 'en'
  },
  {
    name: 'Community Issues',
    description: 'Local problems requiring grassroots business solutions',
    icon: 'users',
    color: '#10B981',
    isActive: true,
    ideaCount: 0,
    language: 'en'
  },
  {
    name: 'Urban Solutions',
    description: 'Smart city challenges and sustainable urban development',
    icon: 'building',
    color: '#8B5CF6',
    isActive: true,
    ideaCount: 0,
    language: 'en'
  },
  {
    name: 'Global Challenges',
    description: 'Climate change, poverty, and inequality through business innovation',
    icon: 'globe2',
    color: '#0D9488',
    isActive: true,
    ideaCount: 0,
    language: 'en'
  },
  {
    name: 'Business Growth',
    description: 'Operational efficiency, market expansion, and innovation gaps',
    icon: 'briefcase',
    color: '#3B82F6',
    isActive: true,
    ideaCount: 0,
    language: 'en'
  },
  {
    name: 'Innovation Gaps',
    description: 'Technology and process improvements for existing problems',
    icon: 'zap',
    color: '#F59E0B',
    isActive: true,
    ideaCount: 0,
    language: 'en'
  },
  {
    name: 'Environmental',
    description: 'Waste management, sustainability, and green initiatives',
    icon: 'treePine',
    color: '#059669',
    isActive: true,
    ideaCount: 0,
    language: 'en'
  },
  {
    name: 'Education',
    description: 'Learning gaps, skill development, and educational access',
    icon: 'graduationCap',
    color: '#6366F1',
    isActive: true,
    ideaCount: 0,
    language: 'en'
  },
  {
    name: 'Healthcare',
    description: 'Medical access, health services, and wellness solutions',
    icon: 'shield',
    color: '#EC4899',
    isActive: true,
    ideaCount: 0,
    language: 'en'
  },
  {
    name: 'General Problem',
    description: 'Miscellaneous problems requiring innovative business solutions',
    icon: 'target',
    color: '#6B7280',
    isActive: true,
    ideaCount: 0,
    language: 'en'
  }
];

export const sampleIdeas: Omit<Idea, '_id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: 'Community Food Waste Recovery Network',
    description: 'A business solution that connects restaurants, grocery stores, and food producers with local food banks and community kitchens. Uses AI-powered logistics to optimize food rescue operations and reduce waste while addressing hunger in underserved communities.',
    shortDescription: 'AI-powered food rescue network reducing waste by 60% while feeding 10,000+ people monthly.',
    category: 'Social Impact',
    tags: ['Food Security', 'Waste Reduction', 'Community', 'AI Logistics', 'Social Enterprise'],
    features: [
      { icon: 'heart', label: 'Social Impact', description: 'Feeds 10,000+ people monthly' },
      { icon: 'target', label: 'Waste Reduction', description: '60% reduction in food waste' },
      { icon: 'trending-up', label: 'Scalable Model', description: 'Replicable in any city' }
    ],
    likes: 324,
    views: 2150,
    difficulty: 'Medium',
    investmentRange: '$50K - $200K',
    marketPotential: 'High',
    sustainability: 'High',
    isActive: true,
    language: 'en'
  },
  {
    title: 'Digital Skills Training for Seniors',
    description: 'A comprehensive business model providing digital literacy training for seniors through community centers and libraries. Includes tablet lending programs, one-on-one mentoring, and specialized curriculum for banking, healthcare, and social connection apps.',
    shortDescription: 'Bridge the digital divide for seniors with personalized training and device lending programs.',
    category: 'Social Impact',
    tags: ['Digital Literacy', 'Senior Care', 'Education', 'Community Centers', 'Technology Access'],
    features: [
      { icon: 'users', label: 'Community-Based', description: 'Training in familiar local venues' },
      { icon: 'heart', label: 'Personalized Care', description: 'One-on-one mentoring approach' },
      { icon: 'trending-up', label: 'Proven Results', description: '85% completion rate' }
    ],
    likes: 189,
    views: 1890,
    difficulty: 'Easy',
    investmentRange: '$25K - $100K',
    marketPotential: 'High',
    sustainability: 'Medium',
    isActive: true,
    language: 'en'
  },
  {
    title: 'Neighborhood Safety Patrol Network',
    description: 'A community-driven business model that organizes local residents into safety patrol groups using mobile apps for coordination. Includes training programs, emergency response protocols, and partnerships with local law enforcement to reduce crime and improve community safety.',
    shortDescription: 'Community-organized safety patrols reducing local crime by 40% through coordinated neighborhood watch.',
    category: 'Community Issues',
    tags: ['Community Safety', 'Crime Prevention', 'Mobile Apps', 'Neighborhood Watch', 'Local Partnership'],
    features: [
      { icon: 'users', label: 'Community-Driven', description: 'Organized by local residents' },
      { icon: 'target', label: 'Crime Reduction', description: '40% reduction in local crime' },
      { icon: 'trending-up', label: 'Scalable', description: 'Replicable in any neighborhood' }
    ],
    likes: 256,
    views: 1680,
    difficulty: 'Medium',
    investmentRange: '$15K - $75K',
    marketPotential: 'High',
    sustainability: 'Medium',
    isActive: true,
    language: 'en'
  },
  {
    title: 'Micro Wind Turbine Manufacturing',
    description: 'Small-scale wind turbine production for residential and commercial use. Features innovative blade design and smart grid integration capabilities.',
    shortDescription: 'Compact wind turbines for urban environments with smart grid connectivity and low noise operation.',
    category: 'Energy Solutions',
    tags: ['Wind Energy', 'Renewable', 'Urban', 'Smart Grid', 'Residential'],
    features: [
      { icon: 'zap', label: 'Clean Energy', description: 'Zero-emission power generation' },
      { icon: 'home', label: 'Urban Friendly', description: 'Low noise, compact design' },
      { icon: 'trending-up', label: 'Grid Ready', description: 'Smart grid integration' }
    ],
    likes: 67,
    views: 720,
    difficulty: 'Medium',
    investmentRange: '$200K - $800K',
    marketPotential: 'Medium',
    sustainability: 'High',
    isActive: true,
    language: 'en'
  },
  {
    title: 'Automated 3D Printing Farm',
    description: 'Large-scale 3D printing facility with automated material handling, quality control, and post-processing. Capable of producing custom parts on demand.',
    shortDescription: 'Scalable 3D printing operation with automated workflows and on-demand manufacturing capabilities.',
    category: 'Automation Systems',
    tags: ['3D Printing', 'Automation', 'Custom Manufacturing', 'On-Demand', 'Digital Factory'],
    features: [
      { icon: 'factory', label: 'Automated', description: 'Fully automated production workflow' },
      { icon: 'zap', label: 'On-Demand', description: 'Custom parts manufactured as needed' },
      { icon: 'trending-up', label: 'Scalable', description: 'Easy to expand production capacity' }
    ],
    likes: 98,
    views: 1120,
    difficulty: 'Medium',
    investmentRange: '$300K - $1.5M',
    marketPotential: 'High',
    sustainability: 'Medium',
    isActive: true,
    language: 'en'
  },
  {
    title: 'Plastic Waste to Fuel Conversion',
    description: 'Advanced pyrolysis system that converts plastic waste into usable fuel. Features automated sorting, processing, and quality control systems.',
    shortDescription: 'Transform plastic waste into clean fuel using advanced pyrolysis technology with automated processing.',
    category: 'Circular Economy',
    tags: ['Waste Management', 'Fuel Production', 'Pyrolysis', 'Recycling', 'Clean Energy'],
    features: [
      { icon: 'recycle', label: 'Waste Reduction', description: 'Processes 10 tons of plastic waste daily' },
      { icon: 'zap', label: 'Clean Fuel', description: 'Produces high-quality synthetic fuel' },
      { icon: 'leaf', label: 'Environmental', description: 'Reduces landfill waste significantly' }
    ],
    likes: 143,
    views: 1890,
    difficulty: 'Hard',
    investmentRange: '$800K - $3M',
    marketPotential: 'High',
    sustainability: 'High',
    isActive: true,
    language: 'en'
  },
  {
    title: 'Smart Textile Manufacturing with IoT',
    description: 'Advanced textile production facility with IoT sensors for quality control, automated pattern cutting, and real-time inventory management. Features sustainable dyeing processes and waste reduction systems.',
    shortDescription: 'IoT-enabled textile manufacturing with automated cutting, sustainable dyeing, and quality control.',
    category: 'Textiles & Clothing',
    tags: ['Textiles', 'IoT', 'Automation', 'Sustainable', 'Quality Control'],
    features: [
      { icon: 'shirt', label: 'Smart Cutting', description: 'AI-powered pattern optimization' },
      { icon: 'leaf', label: 'Eco-Dyeing', description: 'Water-efficient dyeing process' },
      { icon: 'trending-up', label: 'Quality Control', description: 'Real-time defect detection' }
    ],
    likes: 78,
    shares: 12,
    views: 890,
    difficulty: 'Medium',
    investmentRange: '$200K - $800K',
    marketPotential: 'High',
    sustainability: 'High',
    manufacturingCategory: {
      id: 'textiles-clothing',
      name: 'Textiles & Clothing',
      icon: 'Shirt',
      color: 'bg-purple-100 text-purple-700',
      subcategories: ['Apparel', 'Fabrics', 'Accessories']
    },
    socialShares: [
      { platform: 'facebook', count: 5 },
      { platform: 'twitter', count: 3 },
      { platform: 'linkedin', count: 4 }
    ],
    isPremium: false,
    isActive: true,
    language: 'en'
  },
  {
    title: 'Biodegradable Plastic Injection Molding',
    description: 'Manufacturing facility for biodegradable plastic products using plant-based materials. Features precision injection molding, automated quality testing, and sustainable packaging solutions.',
    shortDescription: 'Eco-friendly plastic manufacturing using biodegradable materials and precision molding technology.',
    category: 'Plastic Products',
    tags: ['Biodegradable', 'Injection Molding', 'Sustainable', 'Plant-based', 'Packaging'],
    features: [
      { icon: 'package', label: 'Precision Molding', description: 'High-accuracy injection molding' },
      { icon: 'leaf', label: 'Biodegradable', description: 'Plant-based raw materials' },
      { icon: 'recycle', label: 'Sustainable', description: 'Zero-waste production process' }
    ],
    likes: 92,
    shares: 18,
    views: 1120,
    difficulty: 'Medium',
    investmentRange: '$300K - $1.2M',
    marketPotential: 'High',
    sustainability: 'High',
    manufacturingCategory: {
      id: 'plastic-products',
      name: 'Plastic Products',
      icon: 'Package',
      color: 'bg-blue-100 text-blue-700',
      subcategories: ['Packaging', 'Containers', 'Household Items']
    },
    socialShares: [
      { platform: 'facebook', count: 8 },
      { platform: 'twitter', count: 5 },
      { platform: 'linkedin', count: 5 }
    ],
    isPremium: false,
    isActive: true,
    language: 'en'
  },
  {
    title: 'Artisanal Food Processing Hub',
    description: 'Small-scale food manufacturing facility for organic and artisanal products. Features automated packaging, cold storage, and compliance with food safety regulations.',
    shortDescription: 'Organic food processing with automated packaging and cold chain management for artisanal products.',
    category: 'Food & Beverages',
    tags: ['Food Processing', 'Organic', 'Artisanal', 'Cold Storage', 'Food Safety'],
    features: [
      { icon: 'utensils', label: 'Food Safe', description: 'HACCP compliant facility' },
      { icon: 'snowflake', label: 'Cold Chain', description: 'Temperature-controlled storage' },
      { icon: 'award', label: 'Artisanal', description: 'Small-batch premium products' }
    ],
    likes: 65,
    shares: 8,
    views: 750,
    difficulty: 'Easy',
    investmentRange: '$50K - $300K',
    marketPotential: 'Medium',
    sustainability: 'Medium',
    manufacturingCategory: {
      id: 'food-beverages',
      name: 'Food & Beverages',
      icon: 'Utensils',
      color: 'bg-orange-100 text-orange-700',
      subcategories: ['Processed Foods', 'Beverages', 'Organic Products']
    },
    socialShares: [
      { platform: 'facebook', count: 3 },
      { platform: 'twitter', count: 2 },
      { platform: 'linkedin', count: 3 }
    ],
    isPremium: false,
    isActive: true,
    language: 'en'
  },
  {
    title: 'Electric Vehicle Battery Pack Assembly',
    description: 'Specialized manufacturing line for EV battery packs with automated cell testing, thermal management systems, and safety compliance protocols.',
    shortDescription: 'EV battery manufacturing with automated testing and thermal management for electric vehicles.',
    category: 'Automotive Parts',
    tags: ['Electric Vehicle', 'Battery', 'Automotive', 'Thermal Management', 'Safety'],
    features: [
      { icon: 'car', label: 'EV Ready', description: 'Compatible with major EV platforms' },
      { icon: 'zap', label: 'High Capacity', description: 'Long-range battery solutions' },
      { icon: 'shield', label: 'Safety First', description: 'Advanced safety protocols' }
    ],
    likes: 134,
    shares: 25,
    views: 1560,
    difficulty: 'Hard',
    investmentRange: '$1M - $5M',
    marketPotential: 'High',
    sustainability: 'High',
    manufacturingCategory: {
      id: 'automotive-parts',
      name: 'Automotive Parts',
      icon: 'Car',
      color: 'bg-red-100 text-red-700',
      subcategories: ['Engine Parts', 'Electronics', 'EV Components']
    },
    socialShares: [
      { platform: 'facebook', count: 12 },
      { platform: 'twitter', count: 8 },
      { platform: 'linkedin', count: 5 }
    ],
    isPremium: true,
    isActive: true,
    language: 'en'
  },
  {
    title: 'Modular Smart Furniture Manufacturing',
    description: 'Production of modular furniture with integrated IoT sensors, wireless charging, and sustainable materials. Features customizable designs and flat-pack assembly.',
    shortDescription: 'Smart furniture with IoT integration, wireless charging, and modular design for modern homes.',
    category: 'Home & Furniture',
    tags: ['Smart Furniture', 'IoT', 'Modular', 'Wireless Charging', 'Sustainable'],
    features: [
      { icon: 'home', label: 'Smart Home', description: 'IoT-enabled furniture pieces' },
      { icon: 'zap', label: 'Wireless Charging', description: 'Built-in charging capabilities' },
      { icon: 'puzzle', label: 'Modular', description: 'Customizable configurations' }
    ],
    likes: 87,
    shares: 15,
    views: 980,
    difficulty: 'Medium',
    investmentRange: '$150K - $600K',
    marketPotential: 'High',
    sustainability: 'Medium',
    manufacturingCategory: {
      id: 'home-furniture',
      name: 'Home & Furniture',
      icon: 'Home',
      color: 'bg-green-100 text-green-700',
      subcategories: ['Furniture', 'Smart Home', 'Storage Solutions']
    },
    socialShares: [
      { platform: 'facebook', count: 7 },
      { platform: 'twitter', count: 4 },
      { platform: 'linkedin', count: 4 }
    ],
    isPremium: false,
    isActive: true,
    language: 'en'
  },
  {
    title: 'Wearable Health Device Assembly',
    description: 'Manufacturing line for wearable health monitoring devices with biosensors, wireless connectivity, and medical-grade components.',
    shortDescription: 'Wearable health devices with biosensors and medical-grade manufacturing for health monitoring.',
    category: 'Electronics',
    tags: ['Wearable', 'Health Tech', 'Biosensors', 'Medical Grade', 'Wireless'],
    features: [
      { icon: 'smartphone', label: 'Smart Wearable', description: 'Advanced health monitoring' },
      { icon: 'heart', label: 'Medical Grade', description: 'FDA-compliant components' },
      { icon: 'wifi', label: 'Connected', description: 'Real-time data transmission' }
    ],
    likes: 156,
    shares: 32,
    views: 1890,
    difficulty: 'Hard',
    investmentRange: '$500K - $2.5M',
    marketPotential: 'High',
    sustainability: 'Medium',
    manufacturingCategory: {
      id: 'electronics',
      name: 'Electronics',
      icon: 'Smartphone',
      color: 'bg-indigo-100 text-indigo-700',
      subcategories: ['Wearables', 'Health Tech', 'Smart Devices']
    },
    socialShares: [
      { platform: 'facebook', count: 15 },
      { platform: 'twitter', count: 10 },
      { platform: 'linkedin', count: 7 }
    ],
    isPremium: true,
    isActive: true,
    language: 'en'
  },
  {
    title: 'Natural Cosmetics Manufacturing Lab',
    description: 'Small-batch cosmetics production using organic ingredients with automated mixing, filling, and packaging systems. Features clean room environment and quality testing.',
    shortDescription: 'Organic cosmetics manufacturing with automated production and clean room quality standards.',
    category: 'Cosmetics & Beauty',
    tags: ['Natural Cosmetics', 'Organic', 'Clean Room', 'Small Batch', 'Quality Testing'],
    features: [
      { icon: 'palette', label: 'Natural Ingredients', description: 'Organic and sustainable sourcing' },
      { icon: 'shield', label: 'Clean Room', description: 'Sterile manufacturing environment' },
      { icon: 'award', label: 'Premium Quality', description: 'Rigorous quality testing' }
    ],
    likes: 73,
    shares: 11,
    views: 820,
    difficulty: 'Medium',
    investmentRange: '$100K - $500K',
    marketPotential: 'High',
    sustainability: 'High',
    manufacturingCategory: {
      id: 'cosmetics-beauty',
      name: 'Cosmetics & Beauty',
      icon: 'Palette',
      color: 'bg-pink-100 text-pink-700',
      subcategories: ['Skincare', 'Makeup', 'Natural Products']
    },
    socialShares: [
      { platform: 'facebook', count: 5 },
      { platform: 'twitter', count: 3 },
      { platform: 'linkedin', count: 3 }
    ],
    isPremium: false,
    isActive: true,
    language: 'en'
  }
];