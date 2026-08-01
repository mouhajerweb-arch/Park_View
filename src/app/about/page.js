'use client';
import React from 'react';
import Header from '../../components/Header';
import SubpageHero from '../../components/SubpageHero';
import PrestigeSection from '../../components/PrestigeSection';
import DeveloperProfileSection from '../../components/DeveloperProfileSection';
import NatureSerenitySection from '../../components/NatureSerenitySection';
import NaturalHarmonySection from '../../components/NaturalHarmonySection';
import CuratedLivingSection from '../../components/CuratedLivingSection';
import FooterSection from '../../components/FooterSection';
import { useLanguage } from '../../context/LanguageContext';

export default function AboutPage() {
  const { lang } = useLanguage();

  return (
    <main dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ overflowX: 'hidden' }}>
      <Header />
      
      {/* Subpage Cover Hero */}
      <SubpageHero 
        bgImage="/images/prestige-tranquility.jpg"
        titleEn="A Vision Written in Nature's Language"
        titleAr="رؤية صاغتها الطبيعة والتميز المعماري"
        subtitleEn="About Park View"
        subtitleAr="عن بارك فيو"
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
