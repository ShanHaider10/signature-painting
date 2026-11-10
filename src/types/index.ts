export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: string;
  features: string[];
  preparation: string[];
  recommendedPaints: string[];
  typicalDuration: string;
  startingPrice: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'interior' | 'exterior' | 'plastering' | 'timber';
  location: string;
  description: string;
  image: string;
  beforeImage?: string;
  completionTime: string;
  colorsUsed: string[];
  scope: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
  serviceType: string;
}

export interface ColorSwatch {
  id: string;
  name: string;
  code: string;
  hex: string;
  brand: 'Dulux NZ' | 'Resene';
  description: string;
  sheen: 'Matt' | 'Low Sheen' | 'Semi-Gloss' | 'Gloss';
  category: 'whites' | 'neutrals' | 'dramatic' | 'coastal';
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface QuoteFormData {
  serviceType: string;
  propertyType: string;
  propertySize: string;
  condition: string;
  ceilingsIncluded: boolean;
  trimsIncluded: boolean;
  colourConsultation: boolean;
  urgentBooking: boolean;
  suburb: string;
  address: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}
