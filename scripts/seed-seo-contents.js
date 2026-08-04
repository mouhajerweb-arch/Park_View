/**
 * Seeding Script: Page-Specific SEO Metadata (Published & Drafts)
 * Populates metaTitle, metaDescription for all 6 page documents in Sanity.
 * This guarantees none of the SEO fields are empty, ensuring a complete SEO optimized setup.
 */
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '0ikudzlw',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: 'skAYXm2Q6HMAeeGrCf5O8mouxyTZzTCYmwffk17B6PpEw9ECv7UIG77gR0VjfYPmMm192Sy6nNjxJDORH',
  useCdn: false,
});

const seoData = {
  home: {
    metaTitle: {
      en: 'Park View Yaafour | Luxury Gated Community in Damascus, Syria',
      ar: 'بارك فيو يعفور | مجمع سكني مغلق فاخر في دمشق، سوريا'
    },
    metaDescription: {
      en: 'Discover Park View Yaafour, a prestigious residential enclave in Damascus. Spanning 50,000 sqm with 30,000 sqm of lush landscape gardens, Mediterranean villas, and world-class amenities.',
      ar: 'اكتشف مجمع بارك فيو يعفور، الوجهة السكنية الراقية في دمشق. يمتد على مساحة 50,000 متر مربع ويضم حدائق خضراء منسقة بمساحة 30,000 متر مربع وفيلات متوسطية عصرية.'
    }
  },
  aboutPage: {
    metaTitle: {
      en: 'About Park View Yaafour | Vision, Design & Developer Profile',
      ar: 'عن بارك فيو يعفور | الرؤية والتصميم ومطور المشروع'
    },
    metaDescription: {
      en: "Learn about the vision behind Park View Yaafour, developed by Unlimited Real Estate & Investment. Architectural prestige, natural harmony, and curated luxury in Damascus' finest valley.",
      ar: 'تعرف على الرؤية وراء مشروع بارك فيو يعفور المطور من قبل شركة أنليميتد العقارية للاستثمار. الفخامة المعمارية، التناغم مع الطبيعة، ورفاهية العيش في أرقى وديان دمشق.'
    }
  },
  locationPage: {
    metaTitle: {
      en: 'Location & Connectivity | Park View Gated Community Yaafour',
      ar: 'الموقع والاتصال | مجمع بارك فيو السكني يعفور'
    },
    metaDescription: {
      en: 'Strategically located at the crossroads of Damascus and Yaafour. Enjoy direct high-speed links to Damascus-Beirut Road and Dimas Highway with 24/7 security.',
      ar: 'موقع استراتيجي متصل عند تقاطع طريق دمشق - بيروت السريع وأوتوستراد الديماس الجديد. استمتع بأمان متكامل وحماية على مدار الساعة في ملاذ النخبة الهادئ.'
    }
  },
  residencesPage: {
    metaTitle: {
      en: 'Residences, Masterplan & Floor Plans | Park View Yaafour',
      ar: 'المساكن والمخطط العام ومخططات الطوابق | بارك فيو يعفور'
    },
    metaDescription: {
      en: 'Explore the masterplan and phases of Park View residences (Magnolia, Jasmine, Orchid). View detailed architectural layouts and elegant interior design options.',
      ar: 'استكشف المخطط العام ومراحل البناء لمساكن بارك فيو (ماغنوليا، ياسمين، أوركيد). تصفح التفاصيل الهندسية والخيارات الفاخرة للتصاميم الداخلية.'
    }
  },
  galleryPage: {
    metaTitle: {
      en: 'Visual Gallery & Rendering Highlights | Park View Yaafour',
      ar: 'معرض الصور واللقطات المنظورية | بارك فيو يعفور'
    },
    metaDescription: {
      en: 'Browse a visual showcase of Park View Yaafour. High-end Mediterranean building facades, landscaped oasis pools, manicured gardens, and dining room renders.',
      ar: 'تصفح معرض الصور الخاص بمشروع بارك فيو يعفور. واجهات معمارية متوسطية فاخرة، مسبح الواحة المنسق، الحدائق الخضراء، واللقطات المنظورية للغرف والصلونات.'
    }
  },
  contactPage: {
    metaTitle: {
      en: 'Register Your Interest & Contact Us | Park View Yaafour',
      ar: 'سجل اهتمامك واتصل بنا | بارك فيو يعفور'
    },
    metaDescription: {
      en: 'Get in touch with our prestige sales team. Submit your details to request floor plans, pricing availability, and scheduled private viewings in Yaafour.',
      ar: 'تواصل مع فريق المبيعات والخدمات المتميزة لدينا. سجل بياناتك لطلب مخططات الطوابق، الوحدات المتاحة، وجدولة زيارات معاينة خاصة في وادي يعفور.'
    }
  }
};

async function patchBoth(docId, patches) {
  const idsToPatch = [docId, `drafts.${docId}`];
  for (const id of idsToPatch) {
    const docExists = await client.fetch('*[_id == $id][0]', { id });
    if (docExists) {
      console.log(`  Patching document: ${id}...`);
      await client.patch(id).set(patches).commit();
      console.log(`  ✓ Patched: ${id}`);
    } else {
      console.log(`  Document ${id} does not exist, skipping.`);
    }
  }
}

async function runSeeding() {
  try {
    console.log('--- SEEDING SEO METADATA (PUBLISHED & DRAFTS) ---');
    for (const [docId, data] of Object.entries(seoData)) {
      console.log(`\nProcessing ${docId}...`);
      const seoPatch = {
        seo: {
          _type: 'seo',
          metaTitle: {
            _type: 'localizedString',
            en: data.metaTitle.en,
            ar: data.metaTitle.ar
          },
          metaDescription: {
            _type: 'localizedText',
            en: data.metaDescription.en,
            ar: data.metaDescription.ar
          }
        }
      };
      await patchBoth(docId, seoPatch);
    }
    console.log('\n🎉 SEO METADATA SEEDING COMPLETED SUCCESSFULLY!');
  } catch (err) {
    console.error('SEO Seeding failed:', err);
  }
}

runSeeding();
