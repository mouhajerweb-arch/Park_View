'use client';
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import { useRegister } from '../context/RegisterContext';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import PrestigeSection from '../components/PrestigeSection';
import DeveloperProfileSection from '../components/DeveloperProfileSection';
import ConnectivitySection from '../components/ConnectivitySection';
import ResidencesSection from '../components/ResidencesSection';
import FloorPlansSection from '../components/FloorPlansSection';
import InteriorsSection from '../components/InteriorsSection';
import GallerySection from '../components/GallerySection';
import AmenitiesSection from '../components/AmenitiesSection';
import FooterSection from '../components/FooterSection';
import ContactFormSection from '../components/ContactFormSection';
import AutoScrollPopup from '../components/AutoScrollPopup';
import LearnMoreLink from '../components/LearnMoreLink';

export default function Home() {
  const { lang } = useLanguage();
  const { openRegister } = useRegister();

  return (
    <main dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ overflowX: 'hidden' }}>
      <Header />
      
      {/* 1. Hero Cover Section (Home Cover) */}
      <HeroSection />
      
      {/* 2. About Group: Prestige Intro & Founder Biography */}
      <PrestigeSection />
      <DeveloperProfileSection />
      {/* <LearnMoreLink path="/about" bg="#FFFFFF" /> */}
      
      {/* 3. Location Group: Connectivity Travel Times map */}
      <ConnectivitySection />
      {/* <LearnMoreLink path="/location" bg="#F6F2EC" /> */}
      
      {/* 4. Residences Group: Masterplan, Blueprints & Room Interiors */}
      <ResidencesSection />
      {/* <FloorPlansSection /> */}
      <InteriorsSection />
      {/* <LearnMoreLink path="/residences" bg="#FFFFFF" /> */}

      {/* 5. Gallery Group: Highlights grid with Lightbox */}
      <GallerySection />

      {/* 6. Contact Group: Amenities list Convenience & Security details */}
      <AmenitiesSection />
      
      {/* 7. Registration Contact Map & Form (Directly shown, no top popup needed) */}
      <ContactFormSection />
      
      <FooterSection />
      
      {/* 8. Auto scroll-triggered modal dialog asking for registration */}
      <AutoScrollPopup />
    </main>
  );
}
