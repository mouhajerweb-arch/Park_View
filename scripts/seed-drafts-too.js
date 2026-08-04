/**
 * Master Seeding Script: Seed Drafts & Published Documents
 * Updates BOTH the published and drafts version of each page document (aboutPage, locationPage, residencesPage, contactPage, galleryPage)
 * with the correct array of section objects.
 * This guarantees they show up perfectly inside Sanity Studio, even if a draft version exists!
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

async function runSeeding() {
  try {
    console.log('--- MASTER SUBPAGE SECTIONS SEEDING (PUBLISHED & DRAFTS) ---');

    // 1. Upload Images
    const imgPrestige = await uploadImage('images/prestige-tranquility.jpg');
    const imgNatureTable = await uploadImage('images/nature-table-placeholder.jpg');
    const imgNatureInterior = await uploadImage('images/nature-interior-placeholder.jpg');
    const imgHarmonyPool = await uploadImage('images/harmony-pool.jpg');
    const imgCuratedGarden = await uploadImage('images/curated-garden.jpg');
    
    const imgLocationStrategic = await uploadImage('images/location-strategic.jpg');
    const imgLocationSecurity = await uploadImage('images/location-security.jpg');
    
    const imgClusterMap = await uploadImage('images/cluster.jpg');
    const imgDining = await uploadImage('images/interior-dining.jpg');
    const imgBedroom = await uploadImage('images/interior-bedroom.jpg');
    
    // Gallery Carousel
    const imgGallery1 = await uploadImage('images/luxury-entry.jpg');
    const imgGallery2 = await uploadImage('images/harmony-pool.jpg');
    const imgGallery3 = await uploadImage('images/interior-dining.jpg');
    const imgGallery4 = await uploadImage('images/interior-bedroom.jpg');
    const imgGallery5 = await uploadImage('images/curated-garden.jpg');
    const imgGallery6 = await uploadImage('images/prestige-tranquility.jpg');

    // Helper to patch both published and draft versions of a document ID
    const patchBoth = async (docId, patches) => {
      const idsToPatch = [docId, `drafts.${docId}`];
      for (const id of idsToPatch) {
        const docExists = await client.fetch('*[_id == $id][0]', { id });
        if (docExists) {
          console.log(`  Patching document: ${id}...`);
          await client.patch(id).set(patches).commit();
          console.log(`  ✓ Patched: ${id}`);
        } else {
          console.log(`  Document ${id} does not exist in database, skipping.`);
        }
      }
    };

    // ─── A. ABOUT PAGE SECTIONS ───
    console.log('\nBuilding About Page sections...');
    const aboutSections = [
      {
        _key: 'about_prestige',
        _type: 'prestigeSection',
        enabled: true,
        anchor: 'prestige',
        title: {
          en: 'A Destination Defined by Prestige and Tranquility',
          ar: 'وجهة محددة بالرقي والهدوء'
        },
        body: {
          en: 'Mediterranean styling meets clean modern lines in a community that feels both timeless and current. Located in the coveted Yaafour Valley, Park View offers a secure, gated environment where families can thrive surrounded by beautifully landscaped gardens and world-class amenities.',
          ar: 'تلتقي اللمسات المتوسطية مع الخطوط الحديثة الواضحة في مجمع يشع بالخلود والمعاصرة. يقع بارك فيو في وادي يعفور المرغوب، ويوفر بيئة آمنة ومغلقة حيث يمكن للعائلات أن تزدهر محاطة بالحدائق المنسقة الجميلة والمرافق العالمية.'
        },
        ...(imgPrestige ? { mainImage: imgPrestige } : {})
      },
      {
        _key: 'about_developer_profile',
        _type: 'developerProfileSection',
        enabled: true,
        anchor: 'developer',
        title: {
          en: 'Unlimited Real Estate & Investment',
          ar: 'أنليميتد للاستثمار والتطوير العقاري'
        },
        subtitle: {
          en: 'The Visionary Developer',
          ar: 'المطور ذو الرؤية'
        },
        quote: {
          en: 'To build spaces that endure, inspiring connection and elevating everyday life.',
          ar: 'لبناء مساحات تدوم، تلهم التواصل وترتقي بالمعيشة اليومية.'
        },
        bio: {
          en: 'With a legacy of delivery and a focus on premium quality, Unlimited Real Estate & Investment is committed to creating landmark communities.',
          ar: 'مع إرث من الإنجاز والتركيز على الجودة المتميزة، تلتزم شركة انليميتد العقارية للاستثمار بإنشاء مجتمعات سكنية معلمية تضع معايير جديدة.'
        },
        ...(imgPrestige ? { profileImage: imgPrestige } : {})
      },
      {
        _key: 'about_nature_serenity',
        _type: 'natureSerenitySection',
        enabled: true,
        anchor: 'nature-serenity',
        title: {
          en: 'Shaped by Nature. Crafted for Life.',
          ar: 'صاغتها الطبيعة.. صُممت للحياة'
        },
        paragraph1: {
          en: 'Mediterranean architectures rise naturally from their surroundings, utilizing organic materials, sun-bleached facades, and local stone accents.',
          ar: 'تنبثق العمارة المتوسطية بشكل طبيعي من محيطها، مستخدمةً الواجهات المبيضة بالشمس، والتطعيمات الحجرية المحلية.'
        },
        paragraph2: {
          en: 'Vibrant flower beds and drystone walls frame quiet courtyards, creating a landscape that is both rich and sustainable.',
          ar: 'أحواض زهور نابضة بالحياة وجدران حجرية جافة تؤطر ساحات الفناء الهادئة، مما يخلق مشهداً طبيعياً غنياً ومستداماً.'
        },
        ...(imgNatureTable ? { smallImage: imgNatureTable } : {}),
        ...(imgNatureInterior ? { largeImage: imgNatureInterior } : {})
      },
      {
        _key: 'about_natural_harmony',
        _type: 'naturalHarmonySection',
        enabled: true,
        anchor: 'natural-harmony',
        title: {
          en: 'A Life in Perfect Balance',
          ar: 'حياة في توازن مثالي'
        },
        paragraph: {
          en: 'We believe spaces should nurture wellness. Park View integrates recreational facilities directly with lush, peaceful landscapes.',
          ar: 'نؤمن بأن المساحات يجب أن ترعى العافية. يدمج بارك فيو المرافق الترفيهية مباشرة مع المناظر الطبيعية المورقة والهادئة.'
        },
        bullets: [
          { _key: 'b1', icon: 'garden', label: { en: 'Landscaped Gardens', ar: 'حدائق منسقة' } },
          { _key: 'b2', icon: 'lake', label: { en: 'Water Features', ar: 'مسطحات مائية' } },
          { _key: 'b3', icon: 'fitness', label: { en: 'Wellness Paths', ar: 'مسارات عافية' } },
          { _key: 'b4', icon: 'meditation', label: { en: 'Yoga & Meditation Gardens', ar: 'حدائق اليوغا والتأمل' } },
          { _key: 'b5', icon: 'terrace', label: { en: 'Social Pavilions', ar: 'أجنحة اجتماعية' } },
          { _key: 'b6', icon: 'walking', label: { en: 'Green Walkways', ar: 'ممرات مشي خضراء' } }
        ],
        ...(imgHarmonyPool ? { largeImage: imgHarmonyPool } : {})
      },
      {
        _key: 'about_curated_living',
        _type: 'curatedLivingSection',
        enabled: true,
        anchor: 'curated-living',
        title: {
          en: 'Curated Comforts, Everyday Pleasures',
          ar: 'راحتك منسقة، متعة يومية'
        },
        paragraph1: {
          en: 'Enjoy amenities designed to elevate your leisure hours. From quiet garden seating to social clubhouses.',
          ar: 'استمتع بمرافق مصممة للارتقاء بأوقات فراغك. من الجلسات الهادئة في الحديقة إلى النوادي الاجتماعية.'
        },
        paragraph2: {
          en: 'Secure, fully serviced surroundings let you focus on what matters most.',
          ar: 'محيط آمن ومخدوم بالكامل يتيح لك التركيز على ما يهم أكثر.'
        },
        ...(imgCuratedGarden ? { largeImage: imgCuratedGarden } : {})
      }
    ];
    await patchBoth('aboutPage', { sections: aboutSections });

    // ─── B. LOCATION PAGE SECTIONS ───
    console.log('\nBuilding Location Page sections...');
    const locationSections = [
      {
        _key: 'loc_connectivity',
        _type: 'connectivitySection',
        enabled: true,
        anchor: 'connectivity',
        eyebrow: { en: 'YAAFOUR VALLEY CONNECTIVITY', ar: 'موقع استراتيجي متصل' },
        title: { en: 'At the Crossroads of Damascus & Yaafour', ar: 'في قلب وادي يعفور الحيوي' },
        description: {
          en: 'Park View sits at a coveted geographical gateway, offering direct high-speed links to the main Damascus-Beirut Road.',
          ar: 'يتميز مجمع بارك فيو السكني بموقع استراتيجي فريد على مدخل وادي يعفور، مما يوفر وصولاً سريعاً ومباشراً إلى طريق دمشق-بيروت الرئيسي.'
        },
        ...(imgPrestige ? { mapImage: imgPrestige } : {}),
        destinations: [
          { _key: 'dest_1', label: { en: 'Damascus City Center', ar: 'وسط مدينة دمشق' }, time: '20 mins', icon: 'monument' },
          { _key: 'dest_2', label: { en: 'Damascus Intl Airport', ar: 'مطار دمشق الدولي' }, time: '35 mins', icon: 'airport' },
          { _key: 'dest_3', label: { en: 'Yaafour Gated Enclave', ar: 'منتجع يعفور السكني' }, time: '0 mins', icon: 'uptown' },
          { _key: 'dest_4', label: { en: 'Major Hospital Facilities', ar: 'أقرب المستشفيات الكبرى' }, time: '5 mins', icon: 'hospital' },
          { _key: 'dest_5', label: { en: 'Damascus-Beirut Highway', ar: 'أوتوستراد دمشق - بيروت' }, time: '2 mins', icon: 'airport' },
          { _key: 'dest_6', label: { en: 'Fashion Gate Mall Syria', ar: 'مول فاشن جيت سوريا' }, time: '3 mins', icon: 'mall' }
        ]
      },
      {
        _key: 'loc_security',
        _type: 'locationSecuritySection',
        enabled: true,
        anchor: 'location-features',
        title: {
          en: 'Strategic Location, Uncompromising Security',
          ar: 'موقع استراتيجي.. أمن وحماية بلا مساومة'
        },
        row1Title: { en: 'Yaafour Valley: Reserved for the Few', ar: 'وادي يعفور.. ملاذ النخبة الهادئ' },
        row1Desc: {
          en: 'Prime gated residential enclave in the Yaafour Valley\nGuarded entrance with 24/7 security monitoring',
          ar: 'مجمع سكني مغلق متميز في وادي يعفور\nبوابة دخول محروسة مع مراقبة أمنية على مدار الساعة'
        },
        ...(imgLocationStrategic ? { row1Image: imgLocationStrategic } : {}),
        row2Title: { en: 'Seamless Integration of Safety & Comfort', ar: 'تكامل تام بين الأمان وراحة البال' },
        row2Desc: {
          en: 'Smart surveillance systems mapping streets and common gardens\nUnderground cabling preserving panoramic views',
          ar: 'أنظمة مراقبة ذكية تغطي الشوارع والحدائق العامة\nشبكات كابلات أرضية تحافظ على المناظر البانورامية'
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
          en: 'Park View brings together location, green space, and modern community living.',
          ar: 'يجمع مجمع بارك فيو بين الموقع المتميز، المساحات الخضراء الممتدة، وأسلوب المعيشة المجتمعي العصري.'
        },
        ...(imgCuratedGarden ? { largeImage: imgCuratedGarden } : {}),
        stats: [
          { _key: 's1', value: '50K', label: { en: 'Total sqm', ar: 'المساحة الإجمالية' } },
          { _key: 's2', value: '30K', label: { en: 'Green gardens', ar: 'حدائق خضراء' } },
          { _key: 's3', value: '60%', label: { en: 'Open spaces', ar: 'مساحات مفتوحة' } }
        ]
      }
    ];
    await patchBoth('locationPage', { sections: locationSections });

    // ─── C. RESIDENCES PAGE SECTIONS ───
    console.log('\nBuilding Residences Page sections...');
    const residencesSections = [
      {
        _key: 'res_masterplan',
        _type: 'residencesSection',
        enabled: true,
        anchor: 'residences',
        eyebrow: { en: 'EXPLORE THE MASTERPLAN', ar: 'استكشف المخطط العام للمشروع' },
        title: { en: 'The Masterplan', ar: 'المخطط العام' },
        description: {
          en: 'Park View spans 50,000 sqm of master-planned layout.',
          ar: 'يمتد مشروع بارك فيو السكني على مساحة 50,000 متر مربع من التخطيط العمراني الراقي.'
        },
        ...(imgClusterMap ? { mainImage: imgClusterMap } : {})
      },
      {
        _key: 'res_three_ways',
        _type: 'threeWaysSection',
        enabled: true,
        anchor: 'three-ways',
        eyebrow: { en: 'THREE UNIQUE PHASES', ar: 'ثلاث مراحل إنشائية مستقلة' },
        title: { en: 'A Phase for Every Family Lifestyle', ar: 'مرحلة تناسب تطلعات وأسلوب حياة كل عائلة' },
        description: {
          en: 'We structure Park View Yaafour in three phases designed to scale, offering distinct choices.',
          ar: 'تم تخطيط وتطوير مشروع بارك فيو يعفور عبر ثلاث مراحل إنشائية متكاملة لتوفير خيارات متنوعة.'
        },
        phases: [
          {
            _key: 'ph1',
            phaseId: 'magnolia',
            phaseName: { en: 'Magnolia (Phase 1)', ar: 'ماغنوليا (المرحلة الأولى)' },
            title: { en: 'Complete Structural Frame Reached', ar: 'اكتمال الهيكل الإنشائي والخرساني بالكامل' },
            progressLabel: { en: 'Structure Frame Reached', ar: 'اكتمال الهيكل الخرساني والأسود' },
            desc: {
              en: 'All 7 residential blocks in Magnolia have reached full height completion. Facade stone cladding and internal plastering are underway.',
              ar: 'وصلت جميع الكتل السكنية السبعة في مرحلة ماغنوليا إلى الارتفاع الكامل واكتمل الهيكل الخرساني. تجري حالياً أعمال الكسوة الحجرية للواجهات والقصارة الداخلية.'
            },
            bullets: [
              { _key: 'b1', label: { en: '100% concrete structures completed', ar: '١٠٠٪ من الهياكل الخرسانية مكتملة' } },
              { _key: 'b2', label: { en: 'Facade stone installation in progress', ar: 'أعمال تكسية الحجر الطبيعي للواجهات جارية' } }
            ]
          },
          {
            _key: 'ph2',
            phaseId: 'jasmine',
            phaseName: { en: 'Jasmine (Phase 2)', ar: 'ياسمين (المرحلة الثانية)' },
            title: { en: 'Structure and Foundation Works', ar: 'أعمال الأساسات والهياكل الأساسية' },
            progressLabel: { en: 'Foundations & Columns In Progress', ar: 'أعمال الأساسات والأعمدة جارية' },
            desc: {
              en: 'Excavation and foundation slabs are complete. Reinforced concrete columns for the ground floor levels are actively being cast.',
              ar: 'تم الانتهاء من أعمال الحفر وصب بلاطات التأسيس. يجري حالياً صب الأعمدة الخرسانية المسلحة لمستويات الطوابق الأرضية بنشاط.'
            },
            bullets: [
              { _key: 'b1', label: { en: 'Foundation slabs 100% poured', ar: 'صب بلاطات التأسيس مكتمل بنسبة ١٠٠٪' } },
              { _key: 'b2', label: { en: 'Ground floor pillars active casting', ar: 'صب أعمدة الطابق الأرضي جاري حالياً' } }
            ]
          },
          {
            _key: 'ph3',
            phaseId: 'orchid',
            phaseName: { en: 'Orchid (Phase 3)', ar: 'أوركيد (المرحلة الثالثة)' },
            title: { en: 'Excavation and Site Preparation', ar: 'أعمال الحفر وتجهيز الموقع العام' },
            progressLabel: { en: 'Site Grading & Excavation Active', ar: 'أعمال تسوية التربة والحفر جارية' },
            desc: {
              en: 'Heavy machinery has completed mass site grading. Core excavation for underground residential parking basements has commenced.',
              ar: 'أتمت الآليات الثقيلة أعمال تسوية التربة في الموقع العام. بدأت أعمال الحفر الأساسية لأقبية مواقف السيارات السكنية تحت الأرض.'
            },
            bullets: [
              { _key: 'b1', label: { en: 'Site grading and clearway 100% done', ar: 'تمهيد وتطهير الموقع مكتمل بنسبة ١٠٠٪' } },
              { _key: 'b2', label: { en: 'Excavation for parking basement active', ar: 'أعمال حفر أقبية المواقف جارية بنشاط' } }
            ]
          }
        ]
      },
      {
        _key: 'res_holistic',
        _type: 'holisticLivingSection',
        enabled: true,
        anchor: 'holistic-living',
        title: { en: 'A Sanctuary Crafted for All Dimensions of Wellness', ar: 'ملاذ متكامل صُمم لجميع أبعاد الصحة والرفاهية' },
        description: {
          en: 'Park View is planned with specific zones mapping social gardens, recreational pools, and family activity decks.',
          ar: 'تم تخطيط بارك فيو مع توزيع جغرافي مدروس يضم حدائق اجتماعية، مسابح ترفيهية، ومناطق أنشطة عائلية.'
        },
        clusters: [
          {
            _key: 'cl1',
            clusterId: 'orchid',
            clusterName: { en: 'Orchid Gardens & Social Promenades', ar: 'حدائق أوركيد والممشى الاجتماعي' },
            desc: {
              en: 'Quiet courtyards filled with social pavilions, water features, and reading spaces for peaceful outdoor relaxation.',
              ar: 'ساحات فناء هادئة مليئة بالأجنحة الاجتماعية، ومسطحات مائية، ومساحات مخصصة للقراءة والاسترخاء الخارجي.'
            },
            ...(imgGallery4 ? { interiorImage: imgGallery4 } : {}),
            ...(imgGallery5 ? { flowerImage: imgGallery5 } : {})
          },
          {
            _key: 'cl2',
            clusterId: 'magnolia',
            clusterName: { en: 'Magnolia Family Activity Zone', ar: 'منطقة أنشطة عائلية في ماغنوليا' },
            desc: {
              en: 'Lively areas with children playparks, walking paths, and beautiful central fountains for outdoor family activities.',
              ar: 'منطقة حيوية تضم ملاعب ألعاب للأطفال، مسارات للمشي، ونوافير مركزية جميلة للأنشطة العائلية الخارجية.'
            },
            ...(imgGallery3 ? { interiorImage: imgGallery3 } : {}),
            ...(imgGallery2 ? { flowerImage: imgGallery2 } : {})
          }
        ]
      },
      {
        _key: 'res_interiors',
        _type: 'interiorsSection',
        enabled: true,
        anchor: 'interiors',
        eyebrow: { en: 'ELEGANT SPACES FOR EVERYDAY COMFORT', ar: 'مساحات داخلية راقية لراحة عائلية متكاملة' },
        title: { en: 'The Residences Interiors', ar: 'التصاميم الداخلية للمساكن' },
        description: {
          en: 'Bespoke layouts utilizing local materials, stone detailing, and soft light.',
          ar: 'تصاميم داخلية مخصصة ومصاغة بعناية فائقة، تستخدم المواد المحلية والتفاصيل الحجرية والضوء الناعم الطبيعي.'
        },
        tabs: [
          {
            _key: 'tab_dining',
            tabId: 'dining',
            tabName: { en: 'Dining Area', ar: 'منطقة تناول الطعام' },
            tabDescription: {
              en: 'Spacious dining salons crafted with local stone and wide windows.',
              ar: 'صالات طعام فسيحة تم تشطيبها بالأحجار المحلية الفاخرة والنوافذ الواسعة الممتدة.'
            },
            images: imgDining ? [{ _key: 'img_d', image: imgDining, alt: { en: 'Dining render', ar: 'لقطة صالون الطعام' } }] : []
          },
          {
            _key: 'tab_bedroom',
            tabId: 'bedroom',
            tabName: { en: 'Master Suite', ar: 'غرفة النوم الرئيسية' },
            tabDescription: {
              en: 'Quiet bedrooms designed for relaxation, with custom timber panelling.',
              ar: 'غرف نوم هادئة ومريحة مصممة بعناية لتوفير الاسترخاء التام، تتميز بتكسيات خشبية فاخرة.'
            },
            images: imgBedroom ? [{ _key: 'img_b', image: imgBedroom, alt: { en: 'Bedroom render', ar: 'لقطة غرفة النوم' } }] : []
          },
          {
            _key: 'tab_bathroom',
            tabId: 'bathroom',
            tabName: { en: 'Bathrooms', ar: 'دورات المياه' },
            tabDescription: {
              en: 'Modern bathrooms using premium ceramic and natural marble.',
              ar: 'دورات مياه عصرية مصممة بذكاء تستخدم السيراميك والرخام الطبيعي الفاخر.'
            },
            images: imgPrestige ? [{ _key: 'img_ba', image: imgPrestige, alt: { en: 'Bathroom render', ar: 'لقطة دورة المياه' } }] : []
          }
        ]
      },
      {
        _key: 'res_floorplans',
        _type: 'floorPlansSection',
        enabled: true,
        anchor: 'floor-plans',
        eyebrow: { en: 'DETAILED ARCHITECTURAL BLUEPRINTS', ar: 'مخططات هندسية وتفاصيل معمارية' },
        title: { en: 'Floor Plans & Layouts', ar: 'مخططات الطوابق والوحدات السكنية' },
        description: {
          en: 'Review scale drawings detailing dimensions and configurations for Magnolia, Jasmine, and Orchid residences.',
          ar: 'تصفح المخططات الهندسية التفصيلية التي توضح مساحات وتوزيع الوحدات السكنية في مجمعات ماغنوليا، ياسمين، وأوركيد.'
        }
      }
    ];
    await patchBoth('residencesPage', { sections: residencesSections });

    // ─── D. GALLERY PAGE SECTIONS ───
    console.log('\nBuilding Gallery Page sections...');
    const gallerySections = [
      {
        _key: 'gal_section',
        _type: 'gallerySection',
        enabled: true,
        anchor: 'gallery',
        eyebrow: { en: 'PARK VIEW IN IMAGES', ar: 'بارك فيو في صور' },
        title: { en: 'Visual Gallery', ar: 'المعرض المرئي' },
        description: {
          en: 'Browse perspective renders detailing the architectural beauty and visual details of Park View Yaafour.',
          ar: 'تصفح لقطات حقيقية ولقطات منظورية لجمال الفيلات الفاخرة والمساحات الخضراء المنسقة والمرافق السكنية في بارك فيو.'
        },
        images: [
          { _key: 'ig1', image: imgGallery1, title: { en: 'Grand Gateway', ar: 'البوابة الكبرى' }, subtitle: { en: 'Main entrance security gatehouse', ar: 'بوابة الحراسة والأمان للمدخل الرئيسي' } },
          { _key: 'ig2', image: imgGallery2, title: { en: 'Oasis Pool', ar: 'مسبح الواحة' }, subtitle: { en: 'Mediterranean landscape swimming pool', ar: 'مسبح منسق على الطراز المتوسطي' } },
          { _key: 'ig3', image: imgGallery3, title: { en: 'Dining Salon', ar: 'صالون الطعام' }, subtitle: { en: 'Luxury finished dining room design', ar: 'تصميم داخلي فاخر لغرفة الطعام' } },
          { _key: 'ig4', image: imgGallery4, title: { en: 'Master Suite', ar: 'الجناح الرئيسي' }, subtitle: { en: 'Expansive master bedroom design', ar: 'تصميم جناح غرفة النوم الرئيسية الفسيحة' } },
          { _key: 'ig5', image: imgGallery5, title: { en: 'Green Promenade', ar: 'الممر الأخضر' }, subtitle: { en: 'Manicured gardens & walking paths', ar: 'الحدائق المنسقة ومسارات المشي الهادئة' } },
          { _key: 'ig6', image: imgGallery6, title: { en: 'Courtyard Facade', ar: 'واجهة الفناء' }, subtitle: { en: 'Mediterranean building facades overview', ar: 'واجهات معمارية على الطراز المتوسطي' } }
        ]
      }
    ];
    await patchBoth('galleryPage', { sections: gallerySections });

    // ─── E. CONTACT PAGE SECTIONS ───
    console.log('\nBuilding Contact Page sections...');
    const contactSections = [
      {
        _key: 'cnt_faq_header',
        _type: 'faqSection',
        enabled: true,
        anchor: 'faqs',
        title: { en: 'Frequently Asked Questions', ar: 'الأسئلة الشائعة' },
        subtitle: { en: 'FAQS', ar: 'الأسئلة الشائعة' }
      },
      {
        _key: 'cnt_amenities',
        _type: 'amenitiesSection',
        enabled: true,
        anchor: 'amenities',
        eyebrow: { en: 'EXCLUSIVE RESIDENT PRIVILEGES', ar: 'مزايا حصرية لراحة الساكنين' },
        title: { en: 'A World of Amenities at Your Doorstep', ar: 'عالم متكامل من المرافق الترفيهية والخدمية' },
        description: {
          en: 'Wellness facilities, swimming pools, fitness zones, and children playparks.',
          ar: 'مرافق صحية ورياضية متكاملة، مسابح، مسارات لياقة، وحدائق ألعاب للأطفال مدمجة بشكل متوازن داخل الحدائق الخارجية الفسيحة.'
        }
      },
      {
        _key: 'cnt_form',
        _type: 'contactFormSection',
        enabled: true,
        anchor: 'register-interest',
        eyebrow: { en: 'REGISTER YOUR INTEREST', ar: 'سجل اهتمامك الآن' },
        title: { en: 'Begin Your Journey to Gated Yaafour Luxury', ar: 'ابدأ رحلتك الخاصة نحو فخامة وادي يعفور السكنية' },
        description: {
          en: 'Submit your contact details. Our property advisors will reach out shortly.',
          ar: 'يرجى ملء النموذج ببيانات الاتصال الخاصة بك. وسيقوم مستشارو العقارات لدينا بالتواصل معك قريباً لتزويدك بالمخططات والمساحات الشاغرة وجدولة زيارات خاصة.'
        }
      }
    ];
    await patchBoth('contactPage', { sections: contactSections });

    console.log('\n🎉 MASTER SEEDING COMPLETE FOR DRAFTS & PUBLISHED DOCUMENTS!');
  } catch (err) {
    console.error('Master seeding failed:', err);
  }
}

runSeeding();
