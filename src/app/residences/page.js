'use client';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import SubpageHero from '../../components/SubpageHero';
import ResidencesSection from '../../components/ResidencesSection';
import ThreeWaysSection from '../../components/ThreeWaysSection';
import HolisticLivingSection from '../../components/HolisticLivingSection';
import InteriorsSection from '../../components/InteriorsSection';
import FloorPlansSection from '../../components/FloorPlansSection';
import FooterSection from '../../components/FooterSection';
import { useLanguage } from '../../context/LanguageContext';
import { client } from '../../sanity/client';

export default function ResidencesPage() {
  const { lang } = useLanguage();
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    let active = true;
    client
      .fetch(`*[_type == "residencesPage" && _id == "residencesPage"][0] {
        ...,
        "heroCoverUrl": heroImage.asset->url
      }`)
      .then((data) => {
        if (active && data) {
          setPageData(data);
        }
      })
      .catch((err) => console.warn('Error fetching residences page settings:', err));
    return () => {
      active = false;
    };
  }, []);

  return (
    <main dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ overflowX: 'hidden' }}>
      <Header />
      
      {/* Dynamic Subpage Cover Hero from Sanity */}
      <SubpageHero 
        bgImage={pageData?.heroCoverUrl || "/images/luxury-entry.jpg"}
        titleEn={pageData?.heroTitle?.en || "More Space for Life to Bloom"}
        titleAr={pageData?.heroTitle?.ar || "مساحات أوسع لتزدهر الحياة العائلية"}
        subtitleEn={pageData?.heroSubtitle?.en || "The Residences"}
        subtitleAr={pageData?.heroSubtitle?.ar || "المساكن والوحدات"}
      />
      
      <ResidencesSection />
      <ThreeWaysSection />
      <HolisticLivingSection />
      <InteriorsSection />
      <FloorPlansSection />
      
      <FooterSection showForm={false} />
    </main>
  );
}
