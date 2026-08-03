/**
 * Targeted Sanity Seed Script: Subpages, Footer, & Site Settings
 * Seeds document configurations for About, Location, Residences, Contact, and Gallery Pages.
 * Seeds the Header/Footer configs and Site Settings cleanly.
 * Uploads cover images dynamically from the local directory.
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
    console.warn(`  ⚠ Image not found: ${fullPath}, skipping.`);
    return null;
  }
  const imageBuffer = fs.readFileSync(fullPath);
  const ext = path.extname(fullPath).replace('.', '');
  const asset = await client.assets.upload('image', imageBuffer, {
    filename: path.basename(fullPath),
    contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
  });
  console.log(`  ✓ Uploaded image: ${path.basename(fullPath)} → ${asset._id}`);
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

async function seed() {
  try {
    console.log('Seeding subpages, footer, and site settings...\n');

    // ─── 1. Upload Images ───
    const imgAbout = await uploadImage('images/prestige-tranquility.jpg');
    const imgLocation = await uploadImage('images/location-strategic.jpg');
    const imgResidences = await uploadImage('images/luxury-entry.jpg');
    const imgGallery = await uploadImage('images/harmony-pool.jpg');
    const imgLogo = await uploadImage('images/logo.png');

    // ─── 2. Seed About Page ───
    console.log('Seeding About Page...');
    await client.createOrReplace({
      _type: 'aboutPage',
      _id: 'aboutPage',
      title: 'About Page',
      heroTitle: {
        en: "A Vision Written in Nature's Language",
        ar: 'رؤية صاغتها الطبيعة والتميز المعماري'
      },
      heroSubtitle: {
        en: 'About Park View',
        ar: 'عن بارك فيو'
      },
      ...(imgAbout ? { heroImage: imgAbout } : {})
    });
    console.log('  ✓ About Page document created/updated.');

    // ─── 3. Seed Location Page ───
    console.log('Seeding Location Page...');
    await client.createOrReplace({
      _type: 'locationPage',
      _id: 'locationPage',
      title: 'Location Page',
      heroTitle: {
        en: 'A Strategic Gateway, A Peaceful Valley',
        ar: 'بوابة استراتيجية وسط وادٍ هادئ'
      },
      heroSubtitle: {
        en: 'The Location',
        ar: 'الموقع الجغرافي'
      },
      ...(imgLocation ? { heroImage: imgLocation } : {})
    });
    console.log('  ✓ Location Page document created/updated.');

    // ─── 4. Seed Residences Page ───
    console.log('Seeding Residences Page...');
    await client.createOrReplace({
      _type: 'residencesPage',
      _id: 'residencesPage',
      title: 'Residences Page',
      heroTitle: {
        en: 'More Space for Life to Bloom',
        ar: 'مساحات أوسع لتزدهر الحياة العائلية'
      },
      heroSubtitle: {
        en: 'The Residences',
        ar: 'المساكن والوحدات'
      },
      ...(imgResidences ? { heroImage: imgResidences } : {})
    });
    console.log('  ✓ Residences Page document created/updated.');

    // ─── 5. Seed Contact Page ───
    console.log('Seeding Contact Page...');
    await client.createOrReplace({
      _type: 'contactPage',
      _id: 'contactPage',
      title: 'Contact Page',
      heroTitle: {
        en: 'Your Sanctuary Awaits Your Inquiry',
        ar: 'ملاذك الآمن بانتظار استفسارك'
      },
      heroSubtitle: {
        en: 'Contact Us',
        ar: 'اتصل بنا'
      },
      ...(imgAbout ? { heroImage: imgAbout } : {}),
      contactEmail: 'info@parkview.community',
      contactPhone: '+963 11 4068',
      address: {
        en: 'Yaafour, Damascus, Syria - Directly behind Swiss House',
        ar: 'يعفور، دمشق، سوريا - خلف البيت السويسري مباشرةً'
      }
    });
    console.log('  ✓ Contact Page document created/updated.');

    // ─── 6. Seed Gallery Page ───
    console.log('Seeding Gallery Page...');
    await client.createOrReplace({
      _type: 'galleryPage',
      _id: 'galleryPage',
      title: 'Gallery Page',
      heroTitle: {
        en: 'The Art of Refined Living in Frames',
        ar: 'فن العيش الراقي مصوراً بالتفصيل'
      },
      heroSubtitle: {
        en: 'Visual Gallery',
        ar: 'معرض الصور'
      },
      ...(imgGallery ? { heroImage: imgGallery } : {})
    });
    console.log('  ✓ Gallery Page document created/updated.');

    // ─── 7. Seed Footer Settings ───
    console.log('Seeding Footer Settings...');
    await client.createOrReplace({
      _type: 'footerSettings',
      _id: 'footerSettings',
      title: 'Footer Settings',
      col1Title: {
        en: 'A New Standard of Living',
        ar: 'معيار جديد للمعيشة'
      },
      col1Text: {
        en: 'A modern residential retreat combining breathtaking landscape gardens and premium comforts for balanced living.',
        ar: 'مجمع سكني معاصر يوفر مزيجاً تحديداً بين الطبيعة الخلابة ووسائل الراحة الحديثة لحياة عائلية متكاملة.'
      },
      socialLinks: [
        { _key: 'social_fb', platform: 'facebook', url: '#' },
        { _key: 'social_tw', platform: 'twitter', url: '#' },
        { _key: 'social_ig', platform: 'instagram', url: '#' },
        { _key: 'social_wa', platform: 'whatsapp', url: 'https://wa.me/963997711226' }
      ],
      col2Title: {
        en: 'The Address',
        ar: 'العنوان'
      },
      col2Text: {
        en: `A landmark residential destination in Yaafour Valley. An Address Reserved for the Few Prime location in Yaafour Directly behind the Swiss House • 15 minutes to central Damascus * Direct access to Damascus–Beirut Road * Connected to Dimas Highway`,
        ar: `وجهة سكنية بارزة في وادي يعفور. عنوان مخصص للنخبة، موقع متميز في يعفور خلف البيت السويسري مباشرة • ١٥ دقيقة إلى وسط دمشق * وصول مباشر إلى طريق دمشق - بيروت * متصل بأوتوستراد الديماس`
      },
      col3Title: {
        en: 'Contact Us',
        ar: 'اتصل بنا'
      },
      phone: '+963 11 4068',
      email: 'info@parkview.community',
      address: {
        en: 'Yaafour, Damascus, Syria - Behind Swiss House',
        ar: 'يعفور، دمشق، سوريا - خلف البيت السويسري'
      },
      copyrightText: {
        en: 'Park View Yaafour. All rights reserved.',
        ar: 'بارك فيو يعفور. جميع الحقوق محفوظة.'
      }
    });
    console.log('  ✓ Footer Settings document created/updated.');

    // ─── 8. Seed Site Settings ───
    console.log('Seeding Site Settings...');
    await client.createOrReplace({
      _type: 'siteSettings',
      _id: 'siteSettings',
      title: 'Site Settings',
      ...(imgLogo ? { logo: imgLogo } : {}),
      contactPhone: '+963 11 4068',
      whatsappNumber: '963997711226'
    });
    console.log('  ✓ Site Settings document created/updated.');

    console.log('\n✅ Seeding of all pages, footer settings, and site settings completed successfully!');
  } catch (err) {
    console.error('Seeding failed:', err);
  }
}

seed();
