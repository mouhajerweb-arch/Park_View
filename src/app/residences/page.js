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
        "heroCoverUrl": heroImage.asset->url,
        sections[] {
          ...,
          "mainImageUrl": mainImage.asset->url,
          "largeImageUrl": largeImage.asset->url,
          tabs[] {
            ...,
            images[] {
              ...,
              "imageUrl": image.asset->url
            }
          },
          phases[] {...},
          clusters[] {
            ...,
            "interiorImageUrl": interiorImage.asset->url,
            "flowerImageUrl": flowerImage.asset->url
          }
        }
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

  const getSection = (type) => pageData?.sections?.find((section) => section._type === type && section.enabled !== false);
  const residencesSection = getSection('residencesSection');
  const threeWaysSection = getSection('threeWaysSection');
  const holisticLivingSection = getSection('holisticLivingSection');
  const interiorsSection = getSection('interiorsSection');
  const floorPlansSection = getSection('floorPlansSection');

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
      
      {(!pageData || residencesSection) && <ResidencesSection sectionData={residencesSection} />}
      {(!pageData || threeWaysSection) && <ThreeWaysSection sectionData={threeWaysSection} />}
      {(!pageData || holisticLivingSection) && <HolisticLivingSection sectionData={holisticLivingSection} />}
      {(!pageData || interiorsSection) && <InteriorsSection sectionData={interiorsSection} />}
      {(!pageData || floorPlansSection) && <FloorPlansSection sectionData={floorPlansSection} />}
      
      <FooterSection showForm={false} />
    </main>
  );
}
