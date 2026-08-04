'use client';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import SubpageHero from '../../components/SubpageHero';
import SectionRenderer from '../../components/SectionRenderer';
import FaqsSection from '../../components/FaqsSection';
import AmenitiesSection from '../../components/AmenitiesSection';
import FooterSection from '../../components/FooterSection';
import ContactFormSection from '../../components/ContactFormSection';
import { useLanguage } from '../../context/LanguageContext';
import { client } from '../../sanity/client';

export default function ContactPage() {
  const { lang } = useLanguage();
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    let active = true;
    client
      .fetch(`*[_type == "contactPage" && _id == "contactPage"][0] {
        ...,
        "heroCoverUrl": heroImage.asset->url
      }`)
      .then((data) => {
        if (active && data) {
          setPageData(data);
        }
      })
      .catch((err) => console.warn('Error fetching contact page settings:', err));
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
        titleEn={pageData?.heroTitle?.en || "Your Sanctuary Awaits Your Inquiry"}
        titleAr={pageData?.heroTitle?.ar || "ملاذك الآمن بانتظار استفسارك"}
        subtitleEn={pageData?.heroSubtitle?.en || "Contact Us"}
        subtitleAr={pageData?.heroSubtitle?.ar || "اتصل بنا"}
      />
      
      {pageData?.sections && pageData.sections.length > 0 ? (
        <SectionRenderer sections={pageData.sections} />
      ) : (
        <>
          <FaqsSection />
          <AmenitiesSection />
          <ContactFormSection />
        </>
      )}
      
      <FooterSection />
    </main>
  );
}
