'use client';
import React from 'react';
import Header from '../../components/Header';
import SubpageHero from '../../components/SubpageHero';
import ConnectivitySection from '../../components/ConnectivitySection';
import LocationSecuritySection from '../../components/LocationSecuritySection';
import LuxuryLivingSection from '../../components/LuxuryLivingSection';
import FooterSection from '../../components/FooterSection';
import { useLanguage } from '../../context/LanguageContext';

export default function LocationPage() {
  const { lang } = useLanguage();

  return (
    <main dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ overflowX: 'hidden' }}>
      <Header />
      
      {/* Subpage Cover Hero */}
      <SubpageHero 
        bgImage="/images/location-strategic.jpg"
        titleEn="A Strategic Gateway, A Peaceful Valley"
        titleAr="بوابة استراتيجية وسط وادٍ هادئ"
        subtitleEn="The Location"
        subtitleAr="الموقع الجغرافي"
      />
      
      <ConnectivitySection />
      <LocationSecuritySection />
      <LuxuryLivingSection />
      
      <FooterSection showForm={false} />
    </main>
  );
}
