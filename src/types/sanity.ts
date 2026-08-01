export interface LocalizedString {
  en?: string;
  ar?: string;
}

export interface LocalizedText {
  en?: string;
  ar?: string;
}

export interface SEOData {
  metaTitle?: LocalizedString;
  metaDescription?: LocalizedText;
  shareImage?: any; // Sanity Image reference type
}

export interface FAQItem {
  _id: string;
  question: LocalizedString;
  answer: LocalizedText;
  order?: number;
}

export interface GalleryItem {
  _id: string;
  title: LocalizedString;
  subtitle?: LocalizedString;
  image: any; // Sanity Image reference type
  order?: number;
}

export interface HeroSectionProps {
  enabled?: boolean;
  anchor?: string;
  eyebrow?: LocalizedString;
  title?: LocalizedString;
  subtitle?: LocalizedString;
  backgroundImage?: any;
  cta?: {
    label?: LocalizedString;
    link?: string;
  };
}

export interface PrestigeSectionProps {
  enabled?: boolean;
  anchor?: string;
  title?: LocalizedString;
  body?: LocalizedText;
  mainImage?: any;
}

export interface DeveloperProfileSectionProps {
  enabled?: boolean;
  anchor?: string;
  title?: LocalizedString;
  subtitle?: LocalizedString;
  quote?: LocalizedText;
  bio?: LocalizedText;
  profileImage?: any;
}

export interface ConnectivitySectionProps {
  enabled?: boolean;
  anchor?: string;
  eyebrow?: LocalizedString;
  title?: LocalizedString;
  description?: LocalizedText;
  mapImage?: any;
}

export interface ResidencesSectionProps {
  enabled?: boolean;
  anchor?: string;
  eyebrow?: LocalizedString;
  title?: LocalizedString;
  description?: LocalizedText;
  mainImage?: any;
}

export interface FloorPlansSectionProps {
  enabled?: boolean;
  anchor?: string;
  eyebrow?: LocalizedString;
  title?: LocalizedString;
  description?: LocalizedText;
}

export interface InteriorsSectionProps {
  enabled?: boolean;
  anchor?: string;
  eyebrow?: LocalizedString;
  title?: LocalizedString;
  description?: LocalizedText;
  slides?: Array<{
    image?: any;
    caption?: LocalizedString;
  }>;
}

export interface GallerySectionProps {
  enabled?: boolean;
  anchor?: string;
  eyebrow?: LocalizedString;
  title?: LocalizedString;
  description?: LocalizedText;
}

export interface AmenitiesSectionProps {
  enabled?: boolean;
  anchor?: string;
  eyebrow?: LocalizedString;
  title?: LocalizedString;
  description?: LocalizedText;
  bullets?: Array<{
    label?: LocalizedString;
    icon?: string;
  }>;
}

export interface ContactFormSectionProps {
  enabled?: boolean;
  anchor?: string;
  eyebrow?: LocalizedString;
  title?: LocalizedString;
}

export interface SiteSettings {
  title: string;
  logo?: any;
  contactPhone?: string;
  whatsappNumber?: string;
  defaultSeo?: SEOData;
}

export interface FooterSettings {
  copyrightText?: LocalizedString;
  disclaimerText?: LocalizedText;
}
