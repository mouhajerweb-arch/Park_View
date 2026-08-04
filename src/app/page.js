'use client';
import React, { useState, useEffect } from 'react';
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
import { client } from '../sanity/client';

export default function Home() {
  const { lang } = useLanguage();
  const { openRegister } = useRegister();
  const [seoData, setSeoData] = useState(null);
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    let active = true;
    client
      .fetch(`*[_type == "page" && _id == "home"][0] { seo }`)
      .then((data) => {
        if (active && data?.seo) {
          setSeoData(data.seo);
        }
        if (active && data) {
          setPageData(data);
        }
      })
      .catch((err) => console.warn('Error fetching homepage SEO:', err));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (seoData) {
      const metaTitle = seoData.metaTitle?.[lang] || seoData.metaTitle?.en;
      if (metaTitle) {
        document.title = metaTitle;
      }
      const metaDesc = seoData.metaDescription?.[lang] || seoData.metaDescription?.en;
      if (metaDesc) {
        const metaTag = document.querySelector('meta[name="description"]');
        if (metaTag) {
          metaTag.setAttribute('content', metaDesc);
        }
      }
    }
  }, [seoData, lang]);

  useEffect(() => {
    let active = true;
    client
      .fetch(`*[_type == "page" && _id == "home"][0] {
        sections[] {
          ...,
          "mainImageUrl": mainImage.asset->url,
          "profileImageUrl": profileImage.asset->url,
          "smallImageUrl": smallImage.asset->url,
          "largeImageUrl": largeImage.asset->url,
          "mapImageUrl": mapImage.asset->url,
          "mapImageEnUrl": mapImageEn.asset->url,
          "mapImageArUrl": mapImageAr.asset->url,
          tabs[] {
            ...,
            images[] {
              ...,
              "imageUrl": image.asset->url
            }
          },
          "resolvedAmenities": amenities[] {
            ...,
            "iconUrl": icon.asset->url
          },
          "inlineImages": images[] {
            ...,
            "imageUrl": image.asset->url
          }
        }
      }`)
      .then((data) => {
        if (active && data) {
          setPageData(data);
        }
      })
      .catch((err) => console.warn('Error fetching homepage sections:', err));
    return () => {
      active = false;
    };
  }, []);

  const getSection = (type) => pageData?.sections?.find((section) => section._type === type && section.enabled !== false);

  return (
    <main dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ overflowX: 'hidden' }}>
      <Header />
      
      {/* 1. Hero Cover Section (Home Cover) */}
      <HeroSection />
      
      {/* 2. About Group: Prestige Intro & Founder Biography */}
      <PrestigeSection sectionData={getSection('prestigeSection')} />
      <DeveloperProfileSection sectionData={getSection('developerProfileSection')} />
      {/* <LearnMoreLink path="/about" bg="#FFFFFF" /> */}
      
      {/* 3. Location Group: Connectivity Travel Times map */}
      <ConnectivitySection sectionData={getSection('connectivitySection')} />
      {/* <LearnMoreLink path="/location" bg="#F6F2EC" /> */}
      
      {/* 4. Residences Group: Masterplan, Blueprints & Room Interiors */}
      <ResidencesSection sectionData={getSection('residencesSection')} />
      {/* <FloorPlansSection /> */}
      <InteriorsSection sectionData={getSection('interiorsSection')} />
      {/* <LearnMoreLink path="/residences" bg="#FFFFFF" /> */}

      {/* 5. Gallery Group: Highlights grid with Lightbox */}
      <GallerySection sectionData={getSection('gallerySection')} />

      {/* 6. Contact Group: Amenities list Convenience & Security details */}
      <AmenitiesSection sectionData={getSection('amenitiesSection')} />
      
      {/* 7. Registration Contact Map & Form (Directly shown, no top popup needed) */}
      <ContactFormSection sectionData={getSection('contactFormSection')} />
      
      <FooterSection />
      
      {/* 8. Auto scroll-triggered modal dialog asking for registration */}
      <AutoScrollPopup />
    </main>
  );
}
