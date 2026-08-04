/**
 * Seeding Script: Missing Subpage Sections
 * Seeds all the missing section objects inside the sections array of:
 * - locationPage (adds connectivitySection alongside existing loc_security, loc_luxury)
 * - residencesPage (adds residencesSection, interiorsSection, floorPlansSection alongside existing threeWays, holistic)
 * - galleryPage (adds gallerySection)
 * - contactPage (adds amenitiesSection, contactFormSection alongside existing faqSection)
 *
 * This keeps the frontend layouts completely untouched (as they are hardcoded),
 * but ensures the sections show up perfectly structured when opening the CMS!
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

async function seedMissingSections() {
  try {
    console.log('Seeding images for missing subpage sections...');
    
    // Upload Images
    const imgClusterMap = await uploadImage('images/cluster.jpg');
    const imgMapPlaceholder = await uploadImage('images/prestige-tranquility.jpg'); // Connectivity map fallback
    const imgDining = await uploadImage('images/interior-dining.jpg');
    const imgBedroom = await uploadImage('images/interior-bedroom.jpg');
    const imgBathroom = await uploadImage('images/prestige-tranquility.jpg'); // Bathroom fallback
    
    // Carousel Images
    const imgGallery1 = await uploadImage('images/luxury-entry.jpg');
    const imgGallery2 = await uploadImage('images/harmony-pool.jpg');
    const imgGallery3 = await uploadImage('images/interior-dining.jpg');
    const imgGallery4 = await uploadImage('images/interior-bedroom.jpg');
    const imgGallery5 = await uploadImage('images/curated-garden.jpg');
    const imgGallery6 = await uploadImage('images/prestige-tranquility.jpg');

    // ─── 1. SEED LOCATION PAGE SECTIONS ───
    console.log('Fetching existing locationPage...');
    const locationDoc = await client.fetch('*[_type == "locationPage" && _id == "locationPage"][0]');
    if (locationDoc) {
      const existingSections = locationDoc.sections || [];
      // Remove any existing connectivitySection to avoid duplicates
      const filtered = existingSections.filter(s => s._type !== 'connectivitySection');
      
      const newConnectivitySection = {
        _key: 'loc_connectivity',
        _type: 'connectivitySection',
        enabled: true,
        anchor: 'connectivity',
        eyebrow: { en: 'YAAFOUR VALLEY CONNECTIVITY', ar: 'موقع استراتيجي متصل' },
        title: { en: 'At the Crossroads of Damascus & Yaafour', ar: 'في قلب وادي يعفور الحيوي' },
        description: {
          en: 'Park View sits at a coveted geographical gateway, offering direct high-speed links to the main Damascus-Beirut Road and Dimas Highway. Residents enjoy unmatched travel times to business, medical, and shopping centers in Damascus.',
          ar: 'يتميز مجمع بارك فيو السكني بموقع استراتيجي فريد على مدخل وادي يعفور، مما يوفر وصولاً سريعاً ومباشراً إلى طريق دمشق-بيروت الرئيسي وأوتوستراد الديماس الجديد. يتيح هذا الموقع المتميز لساكنيه سرعة وسهولة الانتقال إلى مراكز الأعمال والمستشفيات والأسواق الكبرى في وسط دمشق.'
        },
        ...(imgMapPlaceholder ? { mapImage: imgMapPlaceholder } : {}),
        destinations: [
          { _key: 'dest_1', label: { en: 'Damascus City Center', ar: 'وسط مدينة دمشق' }, time: '20 mins', icon: 'monument' },
          { _key: 'dest_2', label: { en: 'Damascus Intl Airport', ar: 'مطار دمشق الدولي' }, time: '35 mins', icon: 'airport' },
          { _key: 'dest_3', label: { en: 'Yaafour Gated Enclave', ar: 'منتجع يعفور السكني' }, time: '0 mins', icon: 'uptown' },
          { _key: 'dest_4', label: { en: 'Major Hospital Facilities', ar: 'أقرب المستشفيات الكبرى' }, time: '5 mins', icon: 'hospital' },
          { _key: 'dest_5', label: { en: 'Damascus-Beirut Highway', ar: 'أوتوستراد دمشق - بيروت' }, time: '2 mins', icon: 'airport' },
          { _key: 'dest_6', label: { en: 'Fashion Gate Mall Syria', ar: 'مول فاشن جيت سوريا' }, time: '3 mins', icon: 'mall' }
        ]
      };
      
      await client
        .patch('locationPage')
        .set({ sections: [newConnectivitySection, ...filtered] })
        .commit();
      console.log('✓ Successfully seeded connectivitySection in locationPage.');
    }

    // ─── 2. SEED RESIDENCES PAGE SECTIONS ───
    console.log('Fetching existing residencesPage...');
    const residencesDoc = await client.fetch('*[_type == "residencesPage" && _id == "residencesPage"][0]');
    if (residencesDoc) {
      const existingSections = residencesDoc.sections || [];
      // Filter out residencesSection, interiorsSection, floorPlansSection
      const filtered = existingSections.filter(s => !['residencesSection', 'interiorsSection', 'floorPlansSection'].includes(s._type));
      
      const newResidencesSection = {
        _key: 'res_masterplan',
        _type: 'residencesSection',
        enabled: true,
        anchor: 'residences',
        eyebrow: { en: 'EXPLORE THE MASTERPLAN', ar: 'استكشف المخطط العام للمشروع' },
        title: { en: 'The Masterplan', ar: 'المخطط العام' },
        description: {
          en: 'Park View spans 50,000 sqm of master-planned layout, where buildings encircle beautiful central water pools, pedestrian-only promenades, and lush gardens.',
          ar: 'يمتد مشروع بارك فيو السكني على مساحة 50,000 متر مربع من التخطيط العمراني الراقي، حيث تصطف المباني بشكل هندسي حول النوافير والمسابح المركزية والممشى الخاص بالمشاة والحدائق المنسقة.'
        },
        ...(imgClusterMap ? { mainImage: imgClusterMap } : {})
      };

      const newInteriorsSection = {
        _key: 'res_interiors',
        _type: 'interiorsSection',
        enabled: true,
        anchor: 'interiors',
        eyebrow: { en: 'ELEGANT SPACES FOR EVERYDAY COMFORT', ar: 'مساحات داخلية راقية لراحة عائلية متكاملة' },
        title: { en: 'The Residences Interiors', ar: 'التصاميم الداخلية للمساكن' },
        description: {
          en: 'Bespoke layouts utilizing local materials, stone detailing, and soft light. Every room is designed to optimize natural breezes and daylight.',
          ar: 'تصاميم داخلية مخصصة ومصاغة بعناية فائقة، تستخدم المواد المحلية والتفاصيل الحجرية والضوء الناعم الطبيعي. تم توزيع المساحات وتوجيهها لالتقاط نسيم الهواء العليل وضمان الضوء الطبيعي الوفير في جميع الغرف.'
        },
        tabs: [
          {
            _key: 'tab_dining',
            tabId: 'dining',
            tabName: { en: 'Dining Area', ar: 'منطقة تناول الطعام' },
            tabDescription: {
              en: 'Spacious dining salons crafted with local stone and wide windows offering panoramas of the central gardens.',
              ar: 'صالات طعام فسيحة تم تشطيبها بالأحجار المحلية الفاخرة والنوافذ الواسعة الممتدة التي تطل على الممشى والحدائق المنسقة المركزية.'
            },
            images: imgDining ? [{ _key: 'img_dining_1', image: imgDining, alt: { en: 'Dining room render', ar: 'لقطة صالون الطعام' } }] : []
          },
          {
            _key: 'tab_bedroom',
            tabId: 'bedroom',
            tabName: { en: 'Master Suite', ar: 'غرفة النوم الرئيسية' },
            tabDescription: {
              en: 'Quiet bedrooms designed for relaxation, with custom timber panelling and private outdoor balconies.',
              ar: 'غرف نوم هادئة ومريحة مصممة بعناية لتوفير الاسترخاء التام، تتميز بتكسيات خشبية فاخرة وشرفات خارجية خاصة.'
            },
            images: imgBedroom ? [{ _key: 'img_bedroom_1', image: imgBedroom, alt: { en: 'Bedroom suite render', ar: 'لقطة غرفة النوم' } }] : []
          },
          {
            _key: 'tab_bathroom',
            tabId: 'bathroom',
            tabName: { en: 'Bathrooms', ar: 'دورات المياه الفاخرة' },
            tabDescription: {
              en: 'Modern bathrooms using premium ceramic, natural marble surfaces, and integrated lighting accents.',
              ar: 'دورات مياه عصرية مصممة بذكاء تستخدم السيراميك والرخام الطبيعي الفاخر مع إضاءة خفية راقية.'
            },
            images: imgBathroom ? [{ _key: 'img_bathroom_1', image: imgBathroom, alt: { en: 'Bathroom layout render', ar: 'لقطة دورة المياه' } }] : []
          }
        ]
      };

      const newFloorPlansSection = {
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
      };

      await client
        .patch('residencesPage')
        .set({ sections: [newResidencesSection, newFloorPlansSection, newInteriorsSection, ...filtered] })
        .commit();
      console.log('✓ Successfully seeded residencesSection, interiorsSection, floorPlansSection in residencesPage.');
    }

    // ─── 3. SEED GALLERY PAGE SECTIONS ───
    console.log('Fetching existing galleryPage...');
    const galleryDoc = await client.fetch('*[_type == "galleryPage" && _id == "galleryPage"][0]');
    if (galleryDoc) {
      const existingSections = galleryDoc.sections || [];
      const filtered = existingSections.filter(s => s._type !== 'gallerySection');

      const carouselImages = [];
      if (imgGallery1) carouselImages.push({ _key: 'img_g1', image: imgGallery1, title: { en: 'Grand Gateway', ar: 'البوابة الكبرى' }, subtitle: { en: 'Main entrance security gatehouse', ar: 'بوابة الحراسة والأمان للمدخل الرئيسي' } });
      if (imgGallery2) carouselImages.push({ _key: 'img_g2', image: imgGallery2, title: { en: 'Oasis Pool', ar: 'مسبح الواحة' }, subtitle: { en: 'Mediterranean landscape swimming pool', ar: 'مسبح منسق على الطراز المتوسطي' } });
      if (imgGallery3) carouselImages.push({ _key: 'img_g3', image: imgGallery3, title: { en: 'Dining Salon', ar: 'صالون الطعام' }, subtitle: { en: 'Luxury finished dining room design', ar: 'تصميم داخلي فاخر لغرفة الطعام' } });
      if (imgGallery4) carouselImages.push({ _key: 'img_g4', image: imgGallery4, title: { en: 'Master Suite', ar: 'الجناح الرئيسي' }, subtitle: { en: 'Expansive master bedroom design', ar: 'تصميم جناح غرفة النوم الرئيسية الفسيحة' } });
      if (imgGallery5) carouselImages.push({ _key: 'img_g5', image: imgGallery5, title: { en: 'Green Promenade', ar: 'الممر الأخضر' }, subtitle: { en: 'Manicured gardens & walking paths', ar: 'الحدائق المنسقة ومسارات المشي الهادئة' } });
      if (imgGallery6) carouselImages.push({ _key: 'img_g6', image: imgGallery6, title: { en: 'Courtyard Facade', ar: 'واجهة الفناء' }, subtitle: { en: 'Mediterranean building facades overview', ar: 'واجهات معمارية على الطراز المتوسطي' } });

      const newGallerySection = {
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
        images: carouselImages
      };

      await client
        .patch('galleryPage')
        .set({ sections: [newGallerySection, ...filtered] })
        .commit();
      console.log('✓ Successfully seeded gallerySection in galleryPage.');
    }

    // ─── 4. SEED CONTACT PAGE SECTIONS ───
    console.log('Fetching existing contactPage...');
    const contactDoc = await client.fetch('*[_type == "contactPage" && _id == "contactPage"][0]');
    if (contactDoc) {
      const existingSections = contactDoc.sections || [];
      const filtered = existingSections.filter(s => !['amenitiesSection', 'contactFormSection'].includes(s._type));

      const newAmenitiesSection = {
        _key: 'cnt_amenities',
        _type: 'amenitiesSection',
        enabled: true,
        anchor: 'amenities',
        eyebrow: { en: 'EXCLUSIVE RESIDENT PRIVILEGES', ar: 'مزايا حصرية لراحة الساكنين' },
        title: { en: 'A World of Amenities at Your Doorstep', ar: 'عالم متكامل من المرافق الترفيهية والخدمية' },
        description: {
          en: 'Wellness facilities, swimming pools, fitness zones, and children playparks integrate directly with lush outdoor gardens.',
          ar: 'مرافق صحية ورياضية متكاملة، مسابح، مسارات لياقة، وحدائق ألعاب للأطفال مدمجة بشكل متوازن داخل الحدائق الخارجية الفسيحة.'
        }
      };

      const newContactFormSection = {
        _key: 'cnt_form',
        _type: 'contactFormSection',
        enabled: true,
        anchor: 'register-interest',
        eyebrow: { en: 'REGISTER YOUR INTEREST', ar: 'سجل اهتمامك الآن' },
        title: { en: 'Begin Your Journey to Gated Yaafour Luxury', ar: 'ابدأ رحلتك الخاصة نحو فخامة وادي يعفور السكنية' },
        description: {
          en: 'Submit your contact details. Our property advisors will reach out shortly to guide you through floorplans, availability, and scheduling private viewings.',
          ar: 'يرجى ملء النموذج ببيانات الاتصال الخاصة بك. وسيقوم مستشارو العقارات لدينا بالتواصل معك قريباً لتزويدك بالمخططات والمساحات الشاغرة وجدولة زيارات خاصة.'
        }
      };

      await client
        .patch('contactPage')
        .set({ sections: [...existingSections.filter(s => s._type === 'faqSection'), newAmenitiesSection, newContactFormSection, ...filtered] })
        .commit();
      console.log('✓ Successfully seeded amenitiesSection and contactFormSection in contactPage.');
    }

    console.log('\n🎉 Successfully seeded all missing subpage sections!');
  } catch (err) {
    console.error('Seeding missing subpage sections failed:', err);
  }
}

seedMissingSections();
