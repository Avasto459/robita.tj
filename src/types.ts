export interface Translation {
  ru: string;
  uz: string;
  en: string;
  tj: string;
}

export interface Feature {
  id: number;
  title: Translation;
  desc: Translation;
  icon?: string; // Material Icons name
}

export interface TeamMember {
  id: number;
  name: string;
  role: Translation;
  img: string;
  telegram?: string;
  whatsapp?: string;
}

export interface BlogPost {
  id: number;
  title: Translation;
  date: string;
  category: Translation;
  img: string;
}

export interface Partner {
  id: number;
  name: string;
}

export interface ProcessStep {
  id: number;
  num: string;
  title: Translation;
  desc: Translation;
}

export interface Testimonial {
  id: number;
  name: string;
  role: Translation;
  content: Translation;
  img: string;
}

export interface PricingPlan {
  id: number;
  name: Translation;
  price: string;
  period: Translation;
  features: Translation[];
  isPopular?: boolean;
}

export interface FAQItem {
  id: number;
  question: Translation;
  answer: Translation;
}

export interface StatItem {
  id: number;
  value: string;
  label: Translation;
}

export interface SiteConfig {
  tawkId?: string;
  hero: {
    title: Translation;
    subtitle: Translation;
    cta: Translation;
    cardTitle?: Translation; // New field for card title
    cardSubtitle?: Translation; // New field for card subtitle
    features?: Array<{ // New field for feature pills
      icon: 'rocket' | 'chart' | 'zap';
      label: Translation;
    }>;
  };
  layout: string[];
  partners: Partner[];
  features: Feature[];
  stats: StatItem[];
  process: ProcessStep[];
  testimonials: Testimonial[];
  pricing: PricingPlan[];
  team: TeamMember[];
  faq: FAQItem[];
  blog: BlogPost[];
  footer: {
    address: Translation;
    email: string;
    phone: string;
    helpCenter?: string;
  };
  ctaSection: {
    title: Translation;
    subtitle: Translation;
    buttonText: Translation;
  };
}

export type Language = 'ru' | 'uz' | 'en' | 'tj';
