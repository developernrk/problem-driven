export interface Idea {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  detailedDescription?: string;
  category: string;
  tags: string[];
  features: IdeaFeature[];
  likes: number;
  shares: number;
  views: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  investmentRange: string;
  marketPotential: 'Low' | 'Medium' | 'High';
  sustainability: 'Low' | 'Medium' | 'High';
  manufacturingCategory: ManufacturingCategory;
  socialShares: SocialShare[];
  targetAudience?: string;
  timeline?: string;
  problemStatement?: string;
  solutionApproach?: string;
  implementationSteps?: ImplementationStep[];
  requiredSkills?: string[];
  requiredResources?: string[];
  marketSize?: string;
  competitiveAnalysis?: string;
  revenuePotential?: string;
  risks?: Risk[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  language: string;
  isPremium: boolean;
}

export interface IdeaFeature {
  icon: string; // Lucide icon name
  label: string;
  description?: string;
}

export interface ImplementationStep {
  title: string;
  description: string;
  duration?: string;
}

export interface Risk {
  type: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  color: string;
  isActive: boolean;
  ideaCount: number;
  language: string;
}

export interface User {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  browniePoints: number;
  viewsRemaining: number;
  isPremium: boolean;
  savedIdeas: string[];
  viewHistory: string[];
  likedIdeas: string[];
  sharedIdeas: string[];
  rewards: Reward[];
  subscriptionTier: 'free' | 'basic' | 'premium';
  subscriptionExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchFilters {
  category?: string;
  difficulty?: string;
  investmentRange?: string;
  marketPotential?: string;
  sustainability?: string;
  tags?: string[];
  language?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// New interfaces for enhanced features
export interface ManufacturingCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  subcategories: string[];
}

export interface SocialShare {
  platform: 'facebook' | 'twitter' | 'linkedin' | 'whatsapp' | 'email';
  count: number;
}

export interface Reward {
  id: string;
  type: 'points' | 'badge' | 'discount' | 'feature';
  title: string;
  description: string;
  icon: string;
  value: number;
  earnedAt: Date;
  isRedeemed: boolean;
}

export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
  suggestions?: string[];
}

export interface AISearchResult {
  ideas: Idea[];
  suggestions: string[];
  totalResults: number;
  searchTime: number;
}