'use client';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import SubpageHero from '../../components/SubpageHero';
import GallerySection from '../../components/GallerySection';
import FooterSection from '../../components/FooterSection';
import { useLanguage } from '../../context/LanguageContext';
import { client } from '../../sanity/client';

export default function GalleryPage() {
  const { lang } = useLanguage();
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    let active = true;
    client
      .fetch(`*[_type == "galleryPage" && _id == "galleryPage"][0] {
        ...,
        "heroCoverUrl": heroImage.asset->url
      }`)
      .then((data) => {
        if (active && data) {
          setPageData(data);
        }
      })
      .catch((err) => console.warn('Error fetching gallery page settings:', err));
    return () => {
      active = false;
    };
  }, []);

  return (
    <main dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ overflowX: 'hidden' }}>
      <Header />
      
      {/* Dynamic Subpage Cover Hero from Sanity */}
      <SubpageHero 
        bgImage={pageData?.heroCoverUrl || "/images/harmony-pool.jpg"}
        titleEn={pageData?.heroTitle?.en || "The Art of Refined Living in Frames"}
        titleAr={pageData?.heroTitle?.ar || "فن العيش الراقي مصوراً بالتفصيل"}
        subtitleEn={pageData?.heroSubtitle?.en || "Visual Gallery"}
        subtitleAr={pageData?.heroSubtitle?.ar || "معرض الصور"}
      />
      
      <GallerySection />
      
      <FooterSection showForm={false} />
    </main>
  );
}
