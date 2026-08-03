/**
 * Targeted Sanity Patch Script
 * ONLY patches interiors tabs and gallery images within the existing homepage.
 * Does NOT overwrite any other fields or sections.
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

async function seed() {
  try {
    // ─── 1. Fetch existing homepage to find section keys ───
    console.log('Fetching existing homepage document...');
    const home = await client.fetch(`*[_type == "page" && _id == "home"][0]`);
    if (!home) {
      console.error('Homepage document not found! Cannot patch.');
      return;
    }

    const sections = home.sections || [];
    const interiorsIndex = sections.findIndex(s => s._type === 'interiorsSection');
    const galleryIndex = sections.findIndex(s => s._type === 'gallerySection');

    console.log(`  Found interiorsSection at index: ${interiorsIndex}`);
    console.log(`  Found gallerySection at index: ${galleryIndex}`);

    // ─── 2. Upload interior tab images ───
    console.log('\nUploading interior images...');
    const diningImg = await uploadImage('images/interior-dining.jpg');
    const bedroomImg = await uploadImage('images/interior-bedroom.jpg');
    const closetImg = await uploadImage('images/interior-closet.jpg');
    const bathroomImg = await uploadImage('images/interior-bathroom.jpg');

    // ─── 3. Build interior tabs data ───
    const interiorTabs = [
      {
        _key: 'tab_dining',
        _type: 'interiorTab',
        tabId: 'dining',
        tabName: { en: 'Dining Area', ar: 'غرفة الطعام' },
        tabDescription: {
          en: 'Contemporary architecture is infused with the timeless grace of Mediterranean living—whitewashed facades, warm terracotta tones, and verdant landscaping come together in quiet harmony. Textured materials, soft curves, and sun-washed forms create serene, breathable spaces that feel both grounded in nature and warm.',
          ar: 'تمتزج العمارة المعاصرة مع الرقي الخالد للعيش المتوسطي - واجهات بيضاء ناصعة ودرجات تيراكوتا دافئة ومناظر طبيعية خضراء تتناغم بهدوء. مواد ذات ملمس مميز ومنحنيات ناعمة وأشكال مغسولة بالشمس تخلق مساحات هادئة ومريحة تجمع بين الطبيعة والدفء.'
        },
        images: diningImg ? [
          {
            _key: 'dining_img_1',
            image: diningImg,
            alt: { en: 'Luxury Dining room layout rendering', ar: 'تصميم غرفة طعام فاخرة' },
            layout: 'full',
          }
        ] : [],
      },
      {
        _key: 'tab_bedroom',
        _type: 'interiorTab',
        tabId: 'bedroom',
        tabName: { en: 'Master Bedroom', ar: 'غرفة النوم الرئيسية' },
        tabDescription: {
          en: 'Elegant private quarters where contemporary architecture meets soft warmth. Generous glazing frames skyline and landscape views, while refined materials and soft lighting establish an atmosphere of serene comfort and relaxation.',
          ar: 'أجنحة خاصة أنيقة تلتقي فيها العمارة المعاصرة مع الدفء الناعم. نوافذ واسعة تؤطر مناظر الأفق والطبيعة، بينما تخلق المواد الراقية والإضاءة الناعمة أجواء من الراحة والاسترخاء.'
        },
        images: bedroomImg ? [
          {
            _key: 'bedroom_img_1',
            image: bedroomImg,
            alt: { en: 'Luxury Master Bedroom rendering', ar: 'تصميم غرفة النوم الرئيسية الفاخرة' },
            layout: 'full',
          }
        ] : [],
      },
      {
        _key: 'tab_bathroom',
        _type: 'interiorTab',
        tabId: 'bathroom',
        tabName: { en: 'Soft Opulence Bath', ar: 'حمام الرفاهية الناعمة' },
        tabDescription: {
          en: 'Clean lines and open layouts are paired with premium finishes to create interiors that feel both sophisticated and welcoming. A soft, neutral palette of warm beiges and natural tones enhances light and flow.',
          ar: 'تتلاقى الخطوط الواضحة والمخططات المفتوحة مع تشطيبات فاخرة لخلق مساحات داخلية تشع بالرقي والترحاب. لوحة ألوان محايدة ودافئة من البيج والدرجات الطبيعية تعزز الضوء والانسيابية.'
        },
        images: [
          ...(closetImg ? [{
            _key: 'bath_img_closet',
            image: closetImg,
            alt: { en: 'Luxury walk-in closet detail rendering', ar: 'تصميم غرفة الملابس الفاخرة' },
            layout: 'oneThird',
          }] : []),
          ...(bathroomImg ? [{
            _key: 'bath_img_bathroom',
            image: bathroomImg,
            alt: { en: 'Luxury bathroom travertine marble rendering', ar: 'تصميم الحمام الفاخر بالرخام' },
            layout: 'twoThirds',
          }] : []),
        ],
      },
    ];

    // ─── 4. Upload gallery carousel images ───
    console.log('\nUploading gallery carousel images...');
    const galleryData = [
      { file: 'images/luxury-entry.jpg', titleEn: 'Grand Gateway', titleAr: 'البوابة الكبرى', subEn: 'Main entrance security gatehouse', subAr: 'بوابة الحراسة والأمان للمدخل الرئيسي' },
      { file: 'images/harmony-pool.jpg', titleEn: 'Oasis Pool', titleAr: 'مسبح الواحة', subEn: 'Mediterranean landscape swimming pool', subAr: 'مسبح منسق على الطراز المتوسطي' },
      { file: 'images/interior-dining.jpg', titleEn: 'Dining Salon', titleAr: 'صالون الطعام', subEn: 'Luxury finished dining room design', subAr: 'تصميم داخلي فاخر لغرفة الطعام' },
      { file: 'images/interior-bedroom.jpg', titleEn: 'Master Suite', titleAr: 'الجناح الرئيسي', subEn: 'Expansive master bedroom design', subAr: 'تصميم جناح غرفة النوم الرئيسية الفسيحة' },
      { file: 'images/curated-garden.jpg', titleEn: 'Green Promenade', titleAr: 'الممر الأخضر', subEn: 'Manicured gardens & walking paths', subAr: 'الحدائق المنسقة ومسارات المشي الهادئة' },
      { file: 'images/prestige-tranquility.jpg', titleEn: 'Courtyard Facade', titleAr: 'واجهة الفناء', subEn: 'Mediterranean building facades overview', subAr: 'واجهات معمارية على الطراز المتوسطي' },
      { file: 'images/cluster.jpg', titleEn: 'Residential Cluster', titleAr: 'المجمع السكني', subEn: 'Aerial view of residential clusters', subAr: 'منظر جوي للمجمعات السكنية' },
      { file: 'images/threeways-balcony.jpg', titleEn: 'Balcony Living', titleAr: 'حياة الشرفة', subEn: 'Private outdoor balcony terraces', subAr: 'شرفات خارجية خاصة' },
    ];

    const galleryImages = [];
    for (let i = 0; i < galleryData.length; i++) {
      const g = galleryData[i];
      const img = await uploadImage(g.file);
      if (img) {
        galleryImages.push({
          _key: `gallery_img_${i}`,
          _type: 'galleryCarouselImage',
          image: img,
          title: { en: g.titleEn, ar: g.titleAr },
          subtitle: { en: g.subEn, ar: g.subAr },
        });
      }
    }

    // ─── 5. Patch ONLY the interiors and gallery sections ───
    console.log('\nPatching homepage document (targeted — not overwriting other data)...');

    if (interiorsIndex >= 0) {
      const interiorsKey = sections[interiorsIndex]._key;
      await client
        .patch('home')
        .set({ [`sections[_key=="${interiorsKey}"].tabs`]: interiorTabs })
        .commit();
      console.log('  ✓ Interiors tabs patched successfully.');
    } else {
      console.warn('  ⚠ Interiors section not found in homepage, skipping.');
    }

    if (galleryIndex >= 0) {
      const galleryKey = sections[galleryIndex]._key;
      await client
        .patch('home')
        .set({ [`sections[_key=="${galleryKey}"].images`]: galleryImages })
        .commit();
      console.log('  ✓ Gallery carousel images patched successfully.');
    } else {
      console.warn('  ⚠ Gallery section not found in homepage, skipping.');
    }

    console.log('\n✅ Targeted seeding completed! No other data was touched.');
  } catch (error) {
    console.error('Seeding failed:', error);
  }
}

seed();
