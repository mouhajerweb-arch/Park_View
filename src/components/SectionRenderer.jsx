'use client';
import React from 'react';
import HeroSection from './HeroSection';
import PrestigeSection from './PrestigeSection';
import DeveloperProfileSection from './DeveloperProfileSection';
import ConnectivitySection from './ConnectivitySection';
import ResidencesSection from './ResidencesSection';
import FloorPlansSection from './FloorPlansSection';
import InteriorsSection from './InteriorsSection';
import GallerySection from './GallerySection';
import AmenitiesSection from './AmenitiesSection';
import ContactFormSection from './ContactFormSection';
import NatureSerenitySection from './NatureSerenitySection';
import NaturalHarmonySection from './NaturalHarmonySection';
import CuratedLivingSection from './CuratedLivingSection';
import LocationSecuritySection from './LocationSecuritySection';
import LuxuryLivingSection from './LuxuryLivingSection';
import ThreeWaysSection from './ThreeWaysSection';
import HolisticLivingSection from './HolisticLivingSection';
import FaqsSection from './FaqsSection';

export default function SectionRenderer({ sections }) {
  if (!sections || !Array.isArray(sections)) return null;

  return (
    <>
      {sections.map((section, idx) => {
        if (section.enabled === false) return null;

        // Make unique key using type and index
        const key = `${section._type || 'section'}-${idx}`;

        switch (section._type) {
          case 'heroSection':
            return <HeroSection key={key} />;
          case 'prestigeSection':
            return <PrestigeSection key={key} />;
          case 'developerProfileSection':
            return <DeveloperProfileSection key={key} />;
          case 'connectivitySection':
            return <ConnectivitySection key={key} />;
          case 'residencesSection':
            return <ResidencesSection key={key} />;
          case 'floorPlansSection':
            return <FloorPlansSection key={key} />;
          case 'interiorsSection':
            return <InteriorsSection key={key} />;
          case 'gallerySection':
            return <GallerySection key={key} />;
          case 'amenitiesSection':
            return <AmenitiesSection key={key} />;
          case 'contactFormSection':
            return <ContactFormSection key={key} />;
          case 'natureSerenitySection':
            return <NatureSerenitySection key={key} />;
          case 'naturalHarmonySection':
            return <NaturalHarmonySection key={key} />;
          case 'curatedLivingSection':
            return <CuratedLivingSection key={key} />;
          case 'locationSecuritySection':
            return <LocationSecuritySection key={key} />;
          case 'luxuryLivingSection':
            return <LuxuryLivingSection key={key} />;
          case 'threeWaysSection':
            return <ThreeWaysSection key={key} />;
          case 'holisticLivingSection':
            return <HolisticLivingSection key={key} />;
          case 'faqSection':
            return <FaqsSection key={key} />;
          default:
            return null;
        }
      })}
    </>
  );
}
