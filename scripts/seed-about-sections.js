/**
 * Seeding Script: About Page Sections
 * ONLY seeds/updates the `sections` array inside the `aboutPage` document.
 * Does NOT touch homepage or any other CMS documents.
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

async function seedAboutSections() {
  try {
    console.log('Seeding images for About Page sections...');
    
    // ─── 1. Upload Images ───
    const imgPrestige = await uploadImage('images/prestige-tranquility.jpg');
    const imgNatureTable = await uploadImage('images/nature-table-placeholder.jpg');
    const imgNatureInterior = await uploadImage('images/nature-interior-placeholder.jpg');
    const imgHarmonyPool = await uploadImage('images/harmony-pool.jpg');
    const imgCuratedGarden = await uploadImage('images/curated-garden.jpg');

    // ─── 2. Build Sections Array ───
    const sections = [
      // 1. Prestige Section
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
          en: 'Mediterranean styling meets clean modern lines in a community that feels both timeless and current. Located in the coveted Yaafour Valley, Park View offers a secure, gated environment where families can thrive surrounded by beautifully landscaped gardens and world-class amenities. Crafted with a focus on privacy, comfort, and elegant architectural design.',
          ar: 'تلتقي اللمسات المتوسطية مع الخطوط الحديثة الواضحة في مجمع يشع بالخلود والمعاصرة. يقع بارك فيو في وادي يعفور المرغوب، ويوفر بيئة آمنة ومغلقة حيث يمكن للعائلات أن تزدهر محاطة بالحدائق المنسقة الجميلة والمرافق العالمية. صُمم بتركيز على الخصوصية والراحة والتميز المعماري الراقي.'
        },
        ...(imgPrestige ? { mainImage: imgPrestige } : {})
      },
      // 2. Developer Profile Section
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
          en: 'With a legacy of delivery and a focus on premium quality, Unlimited Real Estate & Investment is committed to creating landmark communities that set new standards. Park View is a testament to this vision, offering a lifestyle of unmatched refinement.',
          ar: 'مع إرث من الإنجاز والتركيز على الجودة المتميزة، تلتزم شركة انليميتد العقارية للاستثمار بإنشاء مجتمعات سكنية معلمية تضع معايير جديدة. بارك فيو شهادة على هذه الرؤية، مقدمة نمط حياة ذو رقي لا يضاهى.'
        },
        ...(imgPrestige ? { profileImage: imgPrestige } : {})
      },
      // 3. Nature Serenity Section
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
          en: 'Mediterranean architectures rise naturally from their surroundings, utilizing organic materials, sun-bleached facades, and local stone accents. Wide pathways, pocket parks, and olive groves line the streets, ensuring nature is never more than a step away from home.',
          ar: 'تنبثق العمارة المتوسطية بشكل طبيعي من محيطها، مستخدمةً الواجهات المبيضة بالشمس، والتطعيمات الحجرية المحلية. ممرات واسعة، حدائق صغيرة، وحقول زيتون تصطف على جانبي الشوارع، مما يضمن أن الطبيعة ليست أبعد من خطوة واحدة من منزلك.'
        },
        paragraph2: {
          en: 'Vibrant flower beds and drystone walls frame quiet courtyards, creating a landscape that is both rich and sustainable. Every villa and low-rise building is positioned to capture cooling valley breezes, maximizing natural airflow and natural light throughout the year.',
          ar: 'أحواض زهور نابضة بالحياة وجدران حجرية جافة تؤطر ساحات الفناء الهادئة، مما يخلق مشهداً طبيعياً غنياً ومستداماً. تم توجيه كل فيلا ومبنى منخفض الارتفاع لالتقاط نسيم الوادي البارد، مما يزيد من تدفق الهواء الطبيعي والضوء الطبيعي طوال العام.'
        },
        ...(imgNatureTable ? { smallImage: imgNatureTable } : {}),
        ...(imgNatureInterior ? { largeImage: imgNatureInterior } : {})
      },
      // 4. Natural Harmony Section
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
          en: 'We believe spaces should nurture wellness. Park View integrates recreational facilities directly with lush, peaceful landscapes, offering places for quiet reflection and active play alike.',
          ar: 'نؤمن بأن المساحات يجب أن ترعى العافية. يدمج بارك فيو المرافق الترفيهية مباشرة مع المناظر الطبيعية المورقة والهادئة، مقدماً أماكن للتأمل الهادئ واللعب النشط على حد سواء.'
        },
        bullets: [
          {
            _key: 'bullet_1',
            icon: 'garden',
            label: { en: 'Landscaped Gardens', ar: 'حدائق منسقة' }
          },
          {
            _key: 'bullet_2',
            icon: 'lake',
            label: { en: 'Water Features', ar: 'مسطحات مائية' }
          },
          {
            _key: 'bullet_3',
            icon: 'fitness',
            label: { en: 'Wellness Paths', ar: 'مسارات عافية' }
          },
          {
            _key: 'bullet_4',
            icon: 'meditation',
            label: { en: 'Yoga & Meditation Gardens', ar: 'حدائق اليوغا والتأمل' }
          },
          {
            _key: 'bullet_5',
            icon: 'terrace',
            label: { en: 'Social Pavilions', ar: 'أجنحة اجتماعية' }
          },
          {
            _key: 'bullet_6',
            icon: 'walking',
            label: { en: 'Green Walkways', ar: 'ممرات مشي خضراء' }
          }
        ],
        ...(imgHarmonyPool ? { largeImage: imgHarmonyPool } : {})
      },
      // 5. Curated Living Section
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
          en: 'Enjoy amenities designed to elevate your leisure hours. From quiet garden seating to social clubhouses, every detail has been planned to foster a strong sense of community.',
          ar: 'استمتع بمرافق مصممة للارتقاء بأوقات فراغك. من الجلسات الهادئة في الحديقة إلى النوادي الاجتماعية، تم التخطيط لكل تفصيل لتعزيز شعور قوي بالانتماء للمجتمع.'
        },
        paragraph2: {
          en: 'Secure, fully serviced surroundings let you focus on what matters most. Discover a neighborhood where convenience and high-end living coexist in perfect harmony.',
          ar: 'محيط آمن ومخدوم بالكامل يتيح لك التركيز على ما يهم أكثر. اكتشف حياً يتعايش فيه التيسير مع المعيشة الراقية في توازن مثالي.'
        },
        ...(imgCuratedGarden ? { largeImage: imgCuratedGarden } : {})
      }
    ];

    // ─── 3. Patch the aboutPage Document ONLY ───
    console.log('Patching aboutPage document in Sanity...');
    
    // Make sure the document exists first
    const aboutPageExists = await client.fetch('*[_type == "aboutPage" && _id == "aboutPage"][0]');
    if (!aboutPageExists) {
      console.log('aboutPage document does not exist. Creating it first...');
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
        heroImage: imgPrestige
      });
    }

    await client
      .patch('aboutPage')
      .set({ sections })
      .commit();

    console.log('\n✅ Successfully patched aboutPage sections. Seeding completed safely!');
  } catch (err) {
    console.error('Seeding aboutPage sections failed:', err);
  }
}

seedAboutSections();
