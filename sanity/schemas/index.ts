// Schemas Object Types
import localizedString from './objects/localizedString';
import localizedText from './objects/localizedText';
import seo from './objects/seo';

// Schemas Section Types
import heroSection from './objects/sections/heroSection';
import prestigeSection from './objects/sections/prestigeSection';
import developerProfileSection from './objects/sections/developerProfileSection';
import connectivitySection from './objects/sections/connectivitySection';
import residencesSection from './objects/sections/residencesSection';
import floorPlansSection from './objects/sections/floorPlansSection';
import interiorsSection from './objects/sections/interiorsSection';
import gallerySection from './objects/sections/gallerySection';
import amenitiesSection from './objects/sections/amenitiesSection';
import contactFormSection from './objects/sections/contactFormSection';

// Schemas Document Types
import page from './page';
import aboutPage from './aboutPage';
import contactPage from './contactPage';
import residencesPage from './residencesPage';
import locationPage from './locationPage';
import galleryPage from './galleryPage';
import faq from './faq';
import galleryItem from './galleryItem';
import siteSettings from './siteSettings';
import footerSettings from './footerSettings';
import headerSettings from './headerSettings';

export const schemaTypes = [
  // Objects
  localizedString,
  localizedText,
  seo,
  
  // Sections
  heroSection,
  prestigeSection,
  developerProfileSection,
  connectivitySection,
  residencesSection,
  floorPlansSection,
  interiorsSection,
  gallerySection,
  amenitiesSection,
  contactFormSection,

  // Documents
  page,
  aboutPage,
  contactPage,
  residencesPage,
  locationPage,
  galleryPage,
  faq,
  galleryItem,
  siteSettings,
  footerSettings,
  headerSettings,
];
