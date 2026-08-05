'use client';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import SubpageHero from '../../components/SubpageHero';
import FaqsSection from '../../components/FaqsSection';
import AmenitiesSection from '../../components/AmenitiesSection';
import FooterSection from '../../components/FooterSection';
import ContactFormSection from '../../components/ContactFormSection';
import { useLanguage } from '../../context/LanguageContext';
import { client } from '../../sanity/client';
import { mergeSharedSections, pageSectionsProjection } from '../../sanity/queries';

export default function ContactPage() {
  const { lang } = useLanguage();
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    let active = true;
    client
      .fetch(`*[_type == "contactPage" && _id == "contactPage"][0] {
        ...,
        "heroCoverUrl": heroImage.asset->url,
        ${pageSectionsProjection}
      }`)
      .then((data) => {
        if (active && data) {
          setPageData(mergeSharedSections(data));
        }
      })
      .catch((err) => {
        console.warn('Error fetching contact page settings:', err);
        if (active) setPageData({});
      });
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
  const faqSection = getSection('faqSection');
  const amenitiesSection = getSection('amenitiesSection');
  const contactFormSection = getSection('contactFormSection');

  return (
    <main dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ overflowX: 'hidden' }}>
      <Header />
      
      {/* Dynamic Subpage Cover Hero from Sanity */}
      <SubpageHero 
        bgImage={pageData ? (pageData.heroCoverUrl || "/images/prestige-tranquility.jpg") : null}
        titleEn={pageData?.heroTitle?.en || "Your Sanctuary Awaits Your Inquiry"}
        titleAr={pageData?.heroTitle?.ar || "ملاذك الآمن بانتظار استفسارك"}
        subtitleEn={pageData?.heroSubtitle?.en || "Contact Us"}
        subtitleAr={pageData?.heroSubtitle?.ar || "اتصل بنا"}
      />
      
      {(!pageData || faqSection) && <FaqsSection sectionData={faqSection} />}
      {(!pageData || amenitiesSection) && <AmenitiesSection sectionData={amenitiesSection} />}
      
      {(!pageData || contactFormSection) && <ContactFormSection sectionData={contactFormSection} />}
      
      <FooterSection />
    </main>
  );
}
