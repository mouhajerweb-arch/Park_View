/**
 * Seeding Script: All Remaining Subpage Sections
 * Seeds/updates sections array for `locationPage`, `residencesPage`, and `contactPage`.
 * Does NOT push code to GitHub.
 */
const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: '0ikudzlw',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: 'skAYXm2Q6HMAeeGrCf5O8mouxyTZzTCYmwffk17B6PpEw9ECv7UIG77gR0VjfYPmMm192Sy6nNjxJDORH',
  useCdn: false,
});

async function uploadImage(filePath) {
  const fullPath = path.resolve(__dirname, '..', 'public', filePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠ Image not found: ${fullPath}, skipping upload.`);
    return null;
  }
  const imageBuffer = fs.readFileSync(fullPath);
  const ext = path.extname(fullPath).replace('.', '');
  const asset = await client.assets.upload('image', imageBuffer, {
    filename: path.basename(fullPath),
    contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
  });
  console.log(`  ✓ Uploaded: ${path.basename(fullPath)} → ${asset._id}`);
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

async function seedAll() {
  try {
    console.log('Seeding images for all subpage sections...');
    
    // Upload images
    const imgLocationStrategic = await uploadImage('images/location-strategic.jpg');
    const imgLocationSecurity = await uploadImage('images/location-security.jpg');
    const imgCuratedGarden = await uploadImage('images/curated-garden.jpg');
    const imgHarmonyPool = await uploadImage('images/harmony-pool.jpg');
    const imgHolisticOrchidInterior = await uploadImage('images/holistic-orchid-interior.jpg');
    const imgHolisticOrchidFlower = await uploadImage('images/holistic-orchid-flower.jpg');
    const imgHolisticMagnoliaInterior = await uploadImage('images/holistic-magnolia-interior.jpg');
    const imgHolisticMagnoliaWoman = await uploadImage('images/holistic-magnolia-woman.jpg');

    // ─── 1. LOCATION PAGE SECTIONS ───
    console.log('Seeding locationPage sections...');
    const locationSections = [
      {
        _key: 'loc_security',
        _type: 'locationSecuritySection',
        enabled: true,
        anchor: 'location-features',
        title: {
          en: 'Strategic Location, Uncompromising Security',
          ar: 'موقع استراتيجي.. أمن وحماية بلا مساومة'
        },
        row1Title: {
          en: 'Yaafour Valley: Reserved for the Few',
          ar: 'وادي يعفور.. ملاذ النخبة الهادئ'
        },
        row1Desc: {
          en: 'Prime gated residential enclave in the Yaafour Valley\nGuarded entrance with 24/7 security monitoring\nFully integrated perimeter fencing and private access control\nDirect connection to Damascus-Beirut Road & Dimas Highway',
          ar: 'مجمع سكني مغلق متميز في وادي يعفور\nبوابة دخول محروسة مع مراقبة أمنية على مدار الساعة\nسياج محيطي متكامل وتحكم خاص بالدخول\nاتصال مباشر بطريق دمشق-بيروت السريع وأوتوستراد الديماس'
        },
        ...(imgLocationStrategic ? { row1Image: imgLocationStrategic } : {}),
        row2Title: {
          en: 'Seamless Integration of Safety & Comfort',
          ar: 'تكامل تام بين الأمان وراحة البال'
        },
        row2Desc: {
          en: 'Smart surveillance systems mapping streets and common gardens\nUnderground cabling preserving panoramic views of Yaafour Valley\nDedicated estate management and maintenance facilities\nEmergency backup power and secure lighting networks',
          ar: 'أنظمة مراقبة ذكية تغطي الشوارع والحدائق العامة\nشبكات كابلات أرضية تحافظ على المناظر البانورامية لوادي يعفور\nمرافق مخصصة لإدارة وصيانة المجمع السكني\nطاقة احتياطية للطوارئ وشبكات إضاءة آمنة'
        },
        ...(imgLocationSecurity ? { row2Image: imgLocationSecurity } : {})
      },
      {
        _key: 'loc_luxury',
        _type: 'luxuryLivingSection',
        enabled: true,
        anchor: 'luxury-narrative',
        title: {
          en: "Architectural Luxury in Damascus' Most Desired Valley",
          ar: 'فخامة معمارية في أرقى وديان دمشق'
        },
        paragraph: {
          en: 'Park View brings together location, green space, and modern community living in a way that is hard to find elsewhere. Across 50,000 sqm, with 30,000 sqm of gardens and open space, it has been designed for people who want privacy, comfort, and a well connected address close to Damascus.',
          ar: 'يجمع مجمع بارك فيو بين الموقع المتميز، المساحات الخضراء الممتدة، وأسلوب المعيشة المجتمعي العصري بطريقة يصعب العثور عليها في أي مكان آخر. يمتد المشروع على مساحة 50,000 متر مربع، مع تخصيص 30,000 متر مربع للحدائق المنسقة والمساحات المفتوحة، وقد صُمم خصيصاً لمن يبحث عن الخصوصية والراحة المطلقة مع سهولة الوصول إلى دمشق.'
        },
        ...(imgCuratedGarden ? { largeImage: imgCuratedGarden } : {}),
        stats: [
          { _key: 'stat_1', value: '50K', label: { en: 'Total sqm', ar: 'المساحة الإجمالية' } },
          { _key: 'stat_2', value: '30K', label: { en: 'Green gardens', ar: 'حدائق خضراء' } },
          { _key: 'stat_3', value: '3', label: { en: 'Residential phases', ar: 'مراحل سكنية' } }
        ]
      }
    ];
    await client.patch('locationPage').set({ sections: locationSections }).commit();
    console.log('✓ Seeded locationPage sections.');

    // ─── 2. RESIDENCES PAGE SECTIONS ───
    console.log('Seeding residencesPage sections...');
    const residencesSections = [
      {
        _key: 'res_three_ways',
        _type: 'threeWaysSection',
        enabled: true,
        anchor: 'three-ways-to-live',
        title: {
          en: 'Three Phases, One Shared Vision',
          ar: 'ثلاث مراحل.. رؤية معمارية واحدة'
        },
        description: {
          en: 'Park View unfolds across three residential releases, each designed with its own architectural character and relationship to the central green promenade.',
          ar: 'يتوزع مجمع بارك فيو السكني على ثلاث مراحل إنشائية رئيسية، تم تصميم كل منها بشخصية معمارية فريدة وعلاقة خاصة مع الممشى الأخضر المركزي.'
        },
        ...(imgHarmonyPool ? { largeImage: imgHarmonyPool } : {}),
        phases: {
          orchidTitle: { en: 'Orchid: Light & Water', ar: 'أوركيد: الضوء والماء' },
          orchidDesc: {
            en: 'Refined family apartments designed around light-filled central spaces and signature water features.',
            ar: 'شقق عائلية راقية مصممة حول ساحات فناء مركزية غنية بالإضاءة ومسطحات مائية مميزة.'
          },
          lavenderTitle: { en: 'Lavender: Quiet Retreats', ar: 'لافندر: ملاذات هادئة' },
          lavenderDesc: {
            en: 'Elegant residential blocks positioned along quiet pedestrian pathways and landscaped pocket parks.',
            ar: 'أبنية سكنية أنيقة تقع على طول ممرات المشاة الهادئة والحدائق الصغيرة المنسقة.'
          },
          magnoliaTitle: { en: 'Magnolia: Panoramic Views', ar: 'ماغنوليا: إطلالات بانورامية' },
          magnoliaDesc: {
            en: 'Premium residences situated on the western slope, offering unobstructed views of Yaafour Valley.',
            ar: 'مساكن فاخرة تقع على المنحدر الغربي، وتوفر إطلالات خلابة وممتدة لوادي يعفور.'
          }
        }
      },
      {
        _key: 'res_holistic',
        _type: 'holisticLivingSection',
        enabled: true,
        anchor: 'holistic-living',
        orchid: {
          subtitle: { en: 'THE AMENITIES OF INDOOR LUXURY', ar: 'مرافق الفخامة الداخلية' },
          title: { en: 'Orchid Cluster Layout', ar: 'مخطط مجمع أوركيد' },
          description: {
            en: 'The Orchid cluster represents the perfect union of convenience and privacy. Positioned around central courtyard fountains, these residences feature wide balconies, floor-to-ceiling windows, and light-filled layouts that maximize comfort.',
            ar: 'يمثل مجمع أوركيد السكني التوازن المثالي بين الراحة والخصوصية المطلقة. تقع هذه المساكن حول ساحة النافورة المركزية، وتتميز بشرفات واسعة ونوافذ ممتدة من الأرض إلى السقف، وتصاميم داخلية غنية بالضوء الطبيعي تزيد من رفاهية السكن.'
          },
          ...(imgHolisticOrchidInterior ? { image1: imgHolisticOrchidInterior } : {}),
          ...(imgHolisticOrchidFlower ? { image2: imgHolisticOrchidFlower } : {})
        },
        magnolia: {
          subtitle: { en: 'THE RECREATION OF OUTDOOR GREEN', ar: 'مساحات الترفيه الطبيعية' },
          title: { en: 'Magnolia Cluster Layout', ar: 'مخطط مجمع ماغنوليا' },
          description: {
            en: 'Sitting at the highest vantage point of Park View, the Magnolia cluster offers unobstructed views of the surrounding Yaafour mountains. Ground-floor residences enjoy private landscaped lawns, while upper floors open up to large outdoor terraces.',
            ar: 'يقع مجمع ماغنوليا السكني في أعلى نقطة مطلة بمشروع بارك فيو، ويوفر إطلالات ممتدة بلا عوائق لجبال يعفور المحيطة. تتمتع مساكن الطابق الأرضي بحدائق خاصة منسقة، بينما تفتح الطوابق العلوية على شرفات خارجية واسعة ومفتوحة.'
          },
          ...(imgHolisticMagnoliaInterior ? { image1: imgHolisticMagnoliaInterior } : {}),
          ...(imgHolisticMagnoliaWoman ? { image2: imgHolisticMagnoliaWoman } : {})
        }
      }
    ];
    await client.patch('residencesPage').set({ sections: residencesSections }).commit();
    console.log('✓ Seeded residencesPage sections.');

    // ─── 3. CONTACT PAGE SECTIONS ───
    console.log('Seeding contactPage sections...');
    const contactSections = [
      {
        _key: 'cnt_faq_header',
        _type: 'faqSection',
        enabled: true,
        anchor: 'faqs',
        title: { en: 'Frequently Asked Questions', ar: 'الأسئلة الشائعة' },
        subtitle: { en: 'FAQS', ar: 'الأسئلة الشائعة' }
      }
    ];
    await client.patch('contactPage').set({ sections: contactSections }).commit();
    console.log('✓ Seeded contactPage sections.');

    console.log('\n🎉 Successfully seeded all remaining subpage sections!');
  } catch (err) {
    console.error('Seeding all sections failed:', err);
  }
}

seedAll();
