'use client';
import React from 'react';
import Header from '../../components/Header';
import SubpageHero from '../../components/SubpageHero';
import ResidencesSection from '../../components/ResidencesSection';
import ThreeWaysSection from '../../components/ThreeWaysSection';
import HolisticLivingSection from '../../components/HolisticLivingSection';
import InteriorsSection from '../../components/InteriorsSection';
import FloorPlansSection from '../../components/FloorPlansSection';
import FooterSection from '../../components/FooterSection';
import { useLanguage } from '../../context/LanguageContext';

export default function ResidencesPage() {
  const { lang } = useLanguage();

  return (
    <main dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ overflowX: 'hidden' }}>
      <Header />
      
      {/* Subpage Cover Hero */}
      <SubpageHero 
        bgImage="/images/luxury-entry.jpg"
        titleEn="More Space for Life to Bloom"
        titleAr="مساحات أوسع لتزدهر الحياة العائلية"
        subtitleEn="The Residences"
        subtitleAr="المساكن والوحدات"
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
