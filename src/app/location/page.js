'use client';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import SubpageHero from '../../components/SubpageHero';
import ConnectivitySection from '../../components/ConnectivitySection';
import LocationSecuritySection from '../../components/LocationSecuritySection';
import LuxuryLivingSection from '../../components/LuxuryLivingSection';
import FooterSection from '../../components/FooterSection';
import { useLanguage } from '../../context/LanguageContext';
import { client } from '../../sanity/client';

export default function LocationPage() {
  const { lang } = useLanguage();
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    let active = true;
    client
      .fetch(`*[_type == "locationPage" && _id == "locationPage"][0] {
        ...,
        "heroCoverUrl": heroImage.asset->url
      }`)
      .then((data) => {
        if (active && data) {
          setPageData(data);
        }
      })
      .catch((err) => console.warn('Error fetching location page settings:', err));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (pageData?.seo) {
      const metaTitle = pageData.seo.metaTitle?.[lang] || pageData.seo.metaTitle?.en;
      if (metaTitle) {
        document.title = metaTitle;
      }
      const metaDesc = pageData.seo.metaDescription?.[lang] || pageData.seo.metaDescription?.en;
      if (metaDesc) {
        const metaTag = document.querySelector('meta[name="description"]');
        if (metaTag) {
          metaTag.setAttribute('content', metaDesc);
        }
      }
    }
  }, [pageData, lang]);

  return (
    <main dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ overflowX: 'hidden' }}>
      <Header />
      
      {/* Dynamic Subpage Cover Hero from Sanity */}
      <SubpageHero 
        bgImage={pageData?.heroCoverUrl || "/images/location-strategic.jpg"}
        titleEn={pageData?.heroTitle?.en || "A Strategic Gateway, A Peaceful Valley"}
        titleAr={pageData?.heroTitle?.ar || "بوابة استراتيجية وسط وادٍ هادئ"}
        subtitleEn={pageData?.heroSubtitle?.en || "The Location"}
        subtitleAr={pageData?.heroSubtitle?.ar || "الموقع الجغرافي"}
      />
      
      <ConnectivitySection />
      <LocationSecuritySection />
      <LuxuryLivingSection />
      
      <FooterSection showForm={false} />
    </main>
  );
}
