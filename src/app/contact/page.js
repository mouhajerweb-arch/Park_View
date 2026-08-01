'use client';
import React from 'react';
import Header from '../../components/Header';
import SubpageHero from '../../components/SubpageHero';
import FaqsSection from '../../components/FaqsSection';
import AmenitiesSection from '../../components/AmenitiesSection';
import FooterSection from '../../components/FooterSection';
import ContactFormSection from '../../components/ContactFormSection';
import { useLanguage } from '../../context/LanguageContext';

export default function ContactPage() {
  const { lang } = useLanguage();

  return (
    <main dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ overflowX: 'hidden' }}>
      <Header />
      
      {/* Subpage Cover Hero */}
      <SubpageHero 
        bgImage="/images/prestige-tranquility.jpg"
        titleEn="Your Sanctuary Awaits Your Inquiry"
        titleAr="ملاذك الآمن بانتظار استفسارك"
        subtitleEn="Contact Us"
        subtitleAr="اتصل بنا"
      />
      
      <FaqsSection />
      <AmenitiesSection />
      
      <ContactFormSection />
      
      <FooterSection />
    </main>
  );
}
