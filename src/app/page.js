'use client';
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import { useRegister } from '../context/RegisterContext';
import Header from '../components/Header';
import SectionRenderer from '../components/SectionRenderer';
import HeroSection from '../components/HeroSection';
import PrestigeSection from '../components/PrestigeSection';
import DeveloperProfileSection from '../components/DeveloperProfileSection';
import ConnectivitySection from '../components/ConnectivitySection';
import ResidencesSection from '../components/ResidencesSection';
import InteriorsSection from '../components/InteriorsSection';
import GallerySection from '../components/GallerySection';
import AmenitiesSection from '../components/AmenitiesSection';
import FooterSection from '../components/FooterSection';
import ContactFormSection from '../components/ContactFormSection';
import AutoScrollPopup from '../components/AutoScrollPopup';
import { client } from '../sanity/client';

export default function Home() {
  const { lang } = useLanguage();
  const { openRegister } = useRegister();
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    let active = true;
    client
      .fetch(`*[_type == "page" && _id == "home"][0]`)
      .then((data) => {
        if (active && data) {
          setPageData(data);
        }
      })
      .catch((err) => console.warn('Error fetching home page settings:', err));
    return () => {
      active = false;
    };
  }, []);

  return (
    <main dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ overflowX: 'hidden' }}>
      <Header />
      
      {pageData?.sections && pageData.sections.length > 0 ? (
        <SectionRenderer sections={pageData.sections} />
      ) : (
        <>
          {/* 1. Hero Cover Section (Home Cover) */}
          <HeroSection />
          
          {/* 2. About Group: Prestige Intro & Founder Biography */}
          <PrestigeSection />
          <DeveloperProfileSection />
          
          {/* 3. Location Group: Connectivity Travel Times map */}
          <ConnectivitySection />
          
          {/* 4. Residences Group: Masterplan, Blueprints & Room Interiors */}
          <ResidencesSection />
          <InteriorsSection />

          {/* 5. Gallery Group: Highlights grid with Lightbox */}
          <GallerySection />

          {/* 6. Contact Group: Amenities list Convenience & Security details */}
          <AmenitiesSection />
          
          {/* 7. Registration Contact Map & Form */}
          <ContactFormSection />
        </>
      )}
      
      <FooterSection />
      
      {/* 8. Auto scroll-triggered modal dialog asking for registration */}
      <AutoScrollPopup />
    </main>
  );
}
