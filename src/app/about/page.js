'use client';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import SubpageHero from '../../components/SubpageHero';
import PrestigeSection from '../../components/PrestigeSection';
import DeveloperProfileSection from '../../components/DeveloperProfileSection';
import NatureSerenitySection from '../../components/NatureSerenitySection';
import NaturalHarmonySection from '../../components/NaturalHarmonySection';
import CuratedLivingSection from '../../components/CuratedLivingSection';
import FooterSection from '../../components/FooterSection';
import { useLanguage } from '../../context/LanguageContext';
import { client } from '../../sanity/client';

export default function AboutPage() {
  const { lang } = useLanguage();
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    let active = true;
    client
      .fetch(`*[_type == "aboutPage" && _id == "aboutPage"][0] {
        ...,
        "heroCoverUrl": heroImage.asset->url
      }`)
      .then((data) => {
        if (active && data) {
          setPageData(data);
        }
      })
      .catch((err) => console.warn('Error fetching about page settings:', err));
    return () => {
      active = false;
    };
  }, []);

  return (
    <main dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ overflowX: 'hidden' }}>
      <Header />
      
      {/* Dynamic Subpage Cover Hero from Sanity */}
      <SubpageHero 
        bgImage={pageData?.heroCoverUrl || "/images/prestige-tranquility.jpg"}
        titleEn={pageData?.heroTitle?.en || "A Vision Written in Nature's Language"}
        titleAr={pageData?.heroTitle?.ar || "رؤية صاغتها الطبيعة والتميز المعماري"}
        subtitleEn={pageData?.heroSubtitle?.en || "About Park View"}
        subtitleAr={pageData?.heroSubtitle?.ar || "عن بارك فيو"}
      />
      
      <PrestigeSection />
      <DeveloperProfileSection />
      <NatureSerenitySection />
      <NaturalHarmonySection />
      <CuratedLivingSection />
      
      {/* Hide bulky form inside footer */}
      <FooterSection showForm={false} />
    </main>
  );
}
