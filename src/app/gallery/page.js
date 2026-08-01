'use client';
import React from 'react';
import Header from '../../components/Header';
import SubpageHero from '../../components/SubpageHero';
import GallerySection from '../../components/GallerySection';
import FooterSection from '../../components/FooterSection';
import { useLanguage } from '../../context/LanguageContext';

export default function GalleryPage() {
  const { lang } = useLanguage();

  return (
    <main dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ overflowX: 'hidden' }}>
      <Header />
      
      {/* Subpage Cover Hero */}
      <SubpageHero 
        bgImage="/images/harmony-pool.jpg"
        titleEn="The Art of Refined Living in Frames"
        titleAr="فن العيش الراقي مصوراً بالتفصيل"
        subtitleEn="Visual Gallery"
        subtitleAr="معرض الصور"
      />
      
      <GallerySection />
      
      <FooterSection showForm={false} />
    </main>
  );
}
