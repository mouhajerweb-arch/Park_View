const { createClient } = require('@sanity/client');

// Initialize client with Write privileges
const client = createClient({
  projectId: '0ikudzlw',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_WRITE_TOKEN, // Requires a token with Editor/Administrator writes
  useCdn: false,
});

const faqsData = [
  {
    qEn: 'Where is Park View located?',
    qAr: 'أين يقع مشروع بارك فيو؟',
    aEn: 'Park View sits in the heart of Yaafour Valley, directly behind Swiss House, one of the area\'s most recognisable landmarks. Direct access to the Damascus–Beirut Road and Dimas Highway puts residents within easy reach of central Damascus, major hospitals, shopping destinations, and Damascus International Airport.',
    aAr: 'يقع بارك فيو في قلب وادي يعفور، خلف البيت السويسري مباشرةً، وهو أحد أكثر المعالم تميزاً في المنطقة. يتيح الوصول المباشر إلى طريق دمشق - بيروت وسريع الديماس للسكان الوصول بسهولة إلى وسط دمشق والمستشفيات الرئيسية ووجهات التسوق ومطار دمشق الدولي.'
  },
  {
    qEn: 'What is Park View?',
    qAr: 'ما هو مشروع بارك فيو؟',
    aEn: 'Park View is a master planned residential community developed by Unlimited Real Estate & Investment. It spans 50,000 sqm, with 30,000 sqm set aside for landscaped gardens and open green space, forming a gated community built around nature, privacy, and modern family life.',
    aAr: 'بارك فيو هو مجمع سكني متكامل ومخطط تم تطويره بواسطة شركة ليميتد العقارية للاستثمار. يمتد على مساحة 50,000 متر مربع، مع تخصيص 30,000 متر مربع للحدائق والمساحات الخضراء المفتوحة، مما يشكل مجتمعاً مغلقاً مبنياً حول الطبيعة والخصوصية وحياة الأسرة الحديثة.'
  },
  {
    qEn: 'Why choose Park View?',
    qAr: 'لماذا تختار بارك فيو؟',
    aEn: 'Park View brings together location, green space, and modern community living in a way that\'s hard to find elsewhere. Across 50,000 sqm, with 30,000 sqm of gardens and open space, it\'s been designed for people who want privacy, comfort, and a well connected address close to Damascus.',
    aAr: 'يجمع بارك فيو بين الموقع المتميز والمساحات الخضراء والعيش المجتمعي الحديث بطريقة يصعب العثور عليها في مكان آخر. يمتد على مساحة 50,000 متر مربع، مع 30,000 متر مربع من الحدائق والمساحات المفتوحة، وقد تم تصميمه للباحثين عن الخصوصية والراحة والموقع المتصل بالقرب من دمشق.'
  },
  {
    qEn: 'Why Invest in Yaafour?',
    qAr: 'لماذا الاستثمار في يعفور؟',
    aEn: 'Yaafour has become one of the most sought after residential areas near Damascus, known for its natural surroundings, spacious developments, and easy access to the capital. As the area keeps growing, it\'s drawing homeowners and investors looking for quality residential communities in a well established location.',
    aAr: 'أصبحت يعفور واحدة من أكثر المناطق السكنية طلباً بالقرب من دمشق، وتشتهر بطبيعتها الخلابة ومشاريعها الواسعة وسهولة الوصول إلى العاصمة. ومع استمرار نمو المنطقة، فإنها تجذب أصحاب المنازل والمستثمرين الباحثين عن مجتمعات سكنية عالية الجودة في موقع مرموق.'
  },
  {
    qEn: 'Is Park View a good investment?',
    qAr: 'هل بارك فيو استثمار جيد؟',
    aEn: 'Park View combines a strong Yaafour location, extensive landscaped space, solid construction, and a developer with over 25 years behind it. Whether you\'re buying a family home or adding to a property portfolio, Park View offers long term value in one of the region\'s most desirable residential areas.',
    aAr: 'يجمع بارك فيو بين الموقع القوي في يعفور، والمساحات الطبيعية الشاسعة، والبناء المتين، ومطور عقاري يمتلك خبرة تزيد عن 25 عاماً. سواء كنت تشتري منزلاً لعائلتك أو تضيف إلى محفظتك العقارية، فإن بارك فيو يقدم قيمة طويلة الأجل في واحدة من أكثر المناطق السكنية رغبة في المنطقة.'
  },
  {
    qEn: 'Who is developing Park View?',
    qAr: 'من هو مطور مشروع بارك فيو؟',
    aEn: 'Park View is developed by Unlimited Real Estate & Investment, a division of Mouhajer International Group. Led by Eng. Maher Mouhajer, the company brings more than 25 years of experience across construction, luxury interiors, hospitality, and real estate development.',
    aAr: 'يتم تطوير بارك فيو من قِبل شركة ليميتد العقارية للاستثمار، وهي جزء من مجموعة مهاجر الدولية. يقود الشركة المهندس ماهر مهاجر، وتتمتع بخبرة تزيد عن 25 عاماً في مجالات الإنشاءات والتصاميم الداخلية الفاخرة والضيافة والتطوير العقاري.'
  },
  {
    qEn: 'What property types are available?',
    qAr: 'ما هي أنواع الوحدات العقارية المتاحة؟',
    aEn: 'Park View offers spacious residential apartments across multiple clusters. Selected layouts include 2, 3, and 4 bedroom residences, with more unit types released as each phase becomes available.',
    aAr: 'يوفر بارك فيو شققاً سكنية فسيحة تتوزع على عدة مجتمعات سكنية. تشمل المخططات المختارة شققاً تضم غرفتين وثلاث وأربع غرف نوم، وسيتم طرح المزيد من أنواع الوحدات مع توفر كل مرحلة.'
  },
  {
    qEn: 'How many phases does the project have?',
    qAr: 'كم عدد مراحل المشروع؟',
    aEn: 'Three: Orchid, Lavender, and Magnolia. Each phase introduces a new collection of residences while sharing the same landscaped surroundings and amenities.',
    aAr: 'ثلاث مراحل: الأوركيد (Orchid)، اللافندر (Lavender)، والماغنوليا (Magnolia). تقدم كل مرحلة مجموعة جديدة من المساكن مع مشاركة نفس الطبيعة والمرافق المحيطة.'
  },
  {
    qEn: 'What amenities are available at Park View?',
    qAr: 'ما هي المرافق المتوفرة في بارك فيو؟',
    aEn: 'Swimming pool, spa and wellness centre, outdoor gym, sports courts, landscaped gardens, walking paths, children\'s playgrounds, kids\' activity areas, BBQ and picnic areas, outdoor seating, a multi purpose community hall, an on site health clinic, private resident parking, visitor parking, and 24/7 gated security.',
    aAr: 'مسبح، مركز سبا وعافية، صالة ألعاب رياضية خارجية، ملاعب رياضية وترفيهية، حدائق منسقة، مسارات للمشي، ملاعب للأطفال، مناطق أنشطة للأطفال، مناطق للشواء والنزهات، جلسات خارجية، صالة مجتمعية متعددة الاستخدامات، عيادة صحية بالموقع، مواقف سيارات خاصة بالسكان، مواقف للزوار، وأمن مغلق على مدار الساعة 24/7.'
  },
  {
    qEn: 'Is Park View a gated community?',
    qAr: 'هل بارك فيو مجمع مغلق؟',
    aEn: 'Yes. Park View is a gated residential community with round the clock security, dedicated building security staff, private resident parking, and visitor parking.',
    aAr: 'نعم. بارك فيو هو مجمع سكني مغلق وبوابات أمنية مع حراسة على مدار الساعة، وأفراد أمن مخصصين للمباني، ومواقف سيارات خاصة بالسكان والزوار.'
  },
  {
    qEn: 'How much green space does the development include?',
    qAr: 'ما هي مساحة المسطحات الخضراء في المشروع؟',
    aEn: 'Of the community\'s 50,000 sqm, 30,000 sqm is dedicated to landscaped gardens, walking paths, and open recreational space.',
    aAr: 'من إجمالي مساحة المجمع البالغة 50,000 متر مربع، هناك 30,000 متر مربع مخصصة للحدائق المنسقة ومسارات المشي والمساحات الترفيهية المفتوحة.'
  }
];

async function seed() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error('Error: SANITY_API_WRITE_TOKEN env variable is missing.');
    console.log('Please add your Editor/Administrator write token to your .env file and run this script again.');
    process.exit(1);
  }

  console.log('Starting comprehensive Sanity seeding...');

  try {
    // 1. Seed FAQs
    console.log('Seeding FAQs...');
    for (let i = 0; i < faqsData.length; i++) {
      const item = faqsData[i];
      const doc = {
        _type: 'faq',
        question: {
          en: item.qEn,
          ar: item.qAr,
        },
        answer: {
          en: item.aEn,
          ar: item.aAr,
        },
        order: i,
      };
      await client.create(doc);
      console.log(`Created FAQ: ${item.qEn}`);
    }

    // 2. Seed Footer Settings
    console.log('Seeding Footer Settings...');
    const footerDoc = {
      _type: 'footerSettings',
      _id: 'footerSettings',
      copyrightText: {
        en: 'All rights reserved.',
        ar: 'جميع الحقوق محفوظة.',
      },
      disclaimerText: {
        en: 'A modern residential retreat combining breathtaking landscape gardens and premium comforts for balanced living.',
        ar: 'ملاذ سكني حديث يجمع بين الحدائق الطبيعية الخلابة ووسائل الراحة المتميزة لحياة متوازنة.',
      }
    };
    await client.createOrReplace(footerDoc);

    // 3. Seed Site Settings
    console.log('Seeding Site Settings...');
    const siteDoc = {
      _type: 'siteSettings',
      _id: 'siteSettings',
      contactPhone: '+963 11 9900',
      whatsappNumber: '963997711226',
    };
    await client.createOrReplace(siteDoc);

    // 4. Seed Homepage (Page document with modular sections)
    console.log('Seeding Homepage...');
    const homepageDoc = {
      _type: 'page',
      _id: 'home',
      title: 'Homepage',
      slug: {
        _type: 'slug',
        current: 'home'
      },
      seo: {
        metaTitle: { en: 'Park View Yaafour — Private Residential Community', ar: 'بارك فيو يعفور — مجمع سكني خاص' },
        metaDescription: {
          en: 'Park View is a private residential community in Yaafour Damascus, spanning 50,000 sqm with 30,000 sqm of green gardens.',
          ar: 'بارك فيو هو مجمع سكني خاص في يعفور دمشق، يمتد على مساحة 50,000 متر مربع مع 30,000 متر مربع من الحدائق الخضراء.'
        }
      },
      sections: [
        {
          _type: 'heroSection',
          enabled: true,
          anchor: 'hero',
          eyebrow: { en: 'YAAFOUR — DAMASCUS', ar: 'يعفور — دمشق' },
          title: { en: 'PARK VIEW', ar: 'بارك فيو' },
          subtitle: { en: 'More Space for Life', ar: 'مساحة أكبر للحياة' },
        },
        {
          _type: 'prestigeSection',
          enabled: true,
          anchor: 'about',
          title: { en: 'A Destination Defined by Prestige and Tranquility', ar: 'وجهةٌ عنوانها الفخامة والسكينة' },
          body: {
            en: 'Envisioned as a refined residential retreat, where expansive green landscapes shape a private and distinguished community. The masterplan blends elegant pathways, lush gardens, and serene outdoor spaces into a harmonious setting that inspires calm, connection, and effortless living. Thoughtfully designed surroundings support a balanced lifestyle rooted in comfort, privacy, and quiet sophistication.',
            ar: 'صُمّم بارك فيو كملاذ سكني راقٍ، حيث تشكل المساحات الخضراء الممتدة مجتمعاً خاصاً ومتميزاً. يمزج المخطط الرئيسي بين الممرات الأنيقة والحدائق الغنّاء والمساحات الخارجية الهادئة في بيئة متناغمة تلهم الهدوء والتواصل والحياة المريحة. تدعم البيئة المصممة بعناية أسلوب حياة متوازن قائم على الراحة والخصوصية والرقي الهادئ.'
          }
        },
        {
          _type: 'developerProfileSection',
          enabled: true,
          anchor: 'developer',
          title: { en: 'Developed by Unlimited Real Estate & Investment', ar: 'تطوير شركة ليميتد العقارية للاستثمار' },
          subtitle: { en: 'A DIVISION OF MOUHAJER INTERNATIONAL GROUP', ar: 'إحدى شركات مجموعة مهاجر الدولية' },
          quote: {
            en: '"We do not just construct buildings; we curate bespoke living environments where architectural luxury and natural harmony meet."',
            ar: '"نحن لا نقوم فقط بتشييد المباني؛ بل نصمم بيئات معيشية خاصة تجمع بين الفخامة المعمارية والوئام الطبيعي."'
          },
          bio: {
            en: 'Park View is developed by Unlimited Real Estate & Investment, a division of Mouhajer International Group with more than 25 years of experience in construction, design, hospitality, and real estate. The company is led by Eng. Maher Mouhajer, whose career includes turnkey construction, luxury residential developments, hospitality projects, and high end interior fit outs across Dubai and Abu Dhabi.',
            ar: 'تم تطوير مشروع بارك فيو من قِبل شركة ليميتد العقارية للاستثمار، وهي جزء من مجموعة مهاجر الدولية التي تتمتع بخبرة تزيد عن 25 عاماً في مجالات المقاولات والتصميم والضيافة والتطوير العقاري. يقود الشركة المهندس ماهر مهاجر، وتتضمن مسيرته المهنية مشاريع بناء سكنية فاخرة وضيافة متكاملة.'
          }
        },
        {
          _type: 'connectivitySection',
          enabled: true,
          anchor: 'location',
          eyebrow: { en: 'HEART OF CONNECTIVITY', ar: 'في قلب شبكة المواصلات' },
          title: { en: 'Effortless Access to Damascus', ar: 'وصول سهل وسريع إلى دمشق' },
          description: {
            en: 'Set in the heart of Yaafour Valley, directly behind Swiss House, Park View sits in one of the area\'s most desirable residential spots. Direct access to Damascus–Beirut Road and Dimas Highway keeps residents close to central Damascus, business districts, healthcare, education, and retail, while still offering a quieter setting surrounded by greenery.',
            ar: 'يقع بارك فيو في قلب وادي يعفور، خلف البيت السويسري مباشرةً، في أحد أكثر المواقع السكنية جاذبية في المنطقة. يبقي الوصول المباشر إلى طريق دمشق - بيروت وسريع الديماس السكان على مقربة من وسط دمشق والمنطقة التجارية والمرافق الصحية والتعليمية والتجزئة، مع الاستمتاع ببيئة هادئة محاطة بالخضار.'
          }
        },
        {
          _type: 'residencesSection',
          enabled: true,
          anchor: 'residences',
          eyebrow: { en: 'SEVEN RESIDENTIAL CLUSTERS', ar: 'سبعة مجتمعات سكنية متكاملة' },
          title: { en: 'A Neighborhood Built Around Outdoor Living', ar: 'حي مصمم حول العيش الخارجي والحياة المجتمعية' },
          description: {
            en: 'Park View is made up of seven residential clusters, each with its own character while sharing the same landscaped surroundings and community facilities. Each cluster connects to the others through gardens, walkways, and shared recreational spaces, creating a neighbourhood built around outdoor living and community life.',
            ar: 'يتكون بارك فيو من سبعة مجتمعات سكنية مترابطة، لكل منها طابعه الخاص مع المشاركة في نفس المساحات الطبيعية المحيطة والمرافق المجتمعية. يتصل كل مجتمع بالآخر عبر حدائق وممرات ومساحات ترفيهية مشتركة، مما يخلق حياً متكاملاً مبنياً حول متعة الحياة الخارجية وتكامل المجتمع.'
          }
        },
        {
          _type: 'interiorsSection',
          enabled: true,
          anchor: 'interiors',
          eyebrow: { en: 'INTERIOR FINISHES', ar: 'التصاميم الداخلية الفاخرة' },
          title: { en: 'Timeless Beauty in Every Detail', ar: 'جمال خالد في كل تفصيل' },
          description: {
            en: 'Clean lines and open layouts are paired with premium finishes to create interiors that feel both sophisticated and welcoming.',
            ar: 'تتلاقى الخطوط الواضحة والمخططات المفتوحة مع تشطيبات فاخرة لخلق مساحات داخلية تشع بالرقي والترحاب.'
          }
        },
        {
          _type: 'gallerySection',
          enabled: true,
          anchor: 'gallery',
          eyebrow: { en: 'VISUAL GALLERY', ar: 'معرض الصور' },
          title: { en: 'The Art of Refined Living', ar: 'جمال الطبيعة وهدوء العيش' },
          description: {
            en: 'Browse high-resolution perspective renders detailing the architectural beauty, private promenade paths, and visual details of Park View Yaafour.',
            ar: 'تصفح لقطات حقيقية ولقطات منظورية لجمال الفيلات الفاخرة والمساحات الخضراء المنسقة والمرافق السكنية في بارك فيو.'
          }
        },
        {
          _type: 'amenitiesSection',
          enabled: true,
          anchor: 'amenities',
          eyebrow: { en: 'PARK VIEW LIFESTYLE', ar: 'أسلوب حياة متكامل' },
          title: { en: 'Lifestyle & Amenities', ar: 'المرافق وأسلوب الحياة' },
          description: {
            en: 'Designed with family life in mind, featuring landscaped parks, children\'s play areas, outdoor recreation, and wellness facilities.',
            ar: 'تم تصميمه مع مراعاة حياة الأسرة، ويتميز بحدائق طبيعية ومناطق لعب للأطفال ومرافق ترفيهية وصحية.'
          }
        },
        {
          _type: 'contactFormSection',
          enabled: true,
          anchor: 'contact',
          eyebrow: { en: 'CONNECT WITH US', ar: 'تواصل معنا' },
          title: { en: 'Register Your Interest', ar: 'سجّل اهتمامك الآن' }
        }
      ]
    };
    await client.createOrReplace(homepageDoc);
    console.log('Homepage Seeded.');

    // 5. Seed About Page
    console.log('Seeding About Page...');
    const aboutPageDoc = {
      _type: 'aboutPage',
      _id: 'aboutPage',
      title: 'About Page',
      seo: {
        metaTitle: { en: 'About Park View Yaafour', ar: 'عن بارك فيو يعفور' },
      },
      sections: [
        {
          _type: 'heroSection',
          enabled: true,
          title: { en: 'About Park View', ar: 'عن بارك فيو' },
          subtitle: { en: 'Shaped by Nature and Serenity', ar: 'من وحي الطبيعة والسكينة' }
        }
      ]
    };
    await client.createOrReplace(aboutPageDoc);
    console.log('About Page Seeded.');

    console.log('All Sanity seeding completed successfully!');
  } catch (error) {
    console.error('Seeding failed:', error);
  }
}

seed();
