export type Category = 'all' | 'critters' | 'botanical' | 'sweets' | 'bundles' | 'patterns';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'critters' | 'botanical' | 'sweets' | 'bundles' | 'patterns';
  price: number; // in INR (₹)
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  fiber: string;
  hookSize: string;
  yarnWeight: string;
  hardware: string; // e.g. "Antique Brass Swivel Clasp + Tiny Chime Bell"
  dimensions: string; // e.g. "2.6\" tall charm with 1.8\" key ring drop"
  batchNumber: string;
  stockLeft: number;
  isNewDrop?: boolean;
  isBestSeller?: boolean;
  isPreOrder?: boolean;
  description: string;
  artisanNote: string;
  careInstructions: string[];
  includesCertificate: boolean;
}

export interface CustomKeychainConfig {
  charmType: 'moss-frog' | 'mushroom-toad' | 'forest-snail' | 'strawberry' | 'acorn-bear' | 'daisy-sprout';
  topper: 'mushroom-cap' | 'fern-leaf' | 'flower-crown' | 'acorn-beret' | 'none';
  yarnColor: string;
  yarnColorName: string;
  hardware: 'brass-swivel' | 'gold-lobster' | 'silver-ring' | 'beaded-wristlet';
  charmAccent: 'mini-bell' | 'leaf-charm' | 'ribbon-bow' | 'none';
  initialChar: string; // e.g. 'I' or 'None'
  nameOnCertificate: string;
  specialNotes?: string;
  basePrice: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  subtitle: string;
  price: number; // in INR (₹)
  image: string;
  quantity: number;
  fiber?: string;
  hardware?: string;
  isCustomKeychain?: boolean;
  customDetails?: {
    charmType: string;
    topper: string;
    yarnColorName: string;
    hardware: string;
    charmAccent: string;
    initialChar?: string;
    adoptedName: string;
  };
}

export interface Story {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  coverImage: string;
  author: string;
  snippet: string;
  tags: string[];
  content: string[];
}

export interface CrochetPattern {
  id: string;
  title: string;
  subtitle: string;
  difficulty: 'Beginner' | 'Easy' | 'Intermediate';
  estimatedTime: string;
  hookRecommended: string;
  yarnRecommended: string;
  hardwareNeeded: string;
  image: string;
  description: string;
  glossary: { term: string; explanation: string }[];
  steps: {
    round: number;
    instruction: string;
    stitchCount: number;
    tip?: string;
  }[];
}
