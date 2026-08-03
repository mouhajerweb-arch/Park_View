/**
 * Targeted Sanity Seed Script: New FAQs
 * Deletes all existing FAQ documents and seeds the 21 custom FAQs
 * with bilingual English and Arabic translations and deterministic IDs.
 */
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '0ikudzlw',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: 'skAYXm2Q6HMAeeGrCf5O8mouxyTZzTCYmwffk17B6PpEw9ECv7UIG77gR0VjfYPmMm192Sy6nNjxJDORH',
  useCdn: false,
});

const newFaqs = [
  {
    question: {
      en: 'Where is Park View located?',
      ar: 'أين يقع مشروع بارك فيو؟'
    },
    answer: {
      en: "Park View sits in the heart of Yaafour Valley, directly behind Swiss House, one of the area's most recognisable landmarks. Direct access to the Damascus–Beirut Road and Dimas Highway puts residents within easy reach of central Damascus, major hospitals, shopping destinations, and Damascus International Airport.",
      ar: 'يقع مشروع بارك فيو في قلب وادي يعفور، خلف البيت السويسري مباشرةً، وهو أحد أبرز معالم المنطقة. يوفر الوصول المباشر إلى طريق دمشق-بيروت وسريع الديماس للسكان سهولة الوصول إلى وسط دمشق والمستشفيات الكبرى ووجهات التسوق ومطار دمشق الدولي.'
    },
    order: 0
  },
  {
    question: {
      en: 'What is Park View?',
      ar: 'ما هو مشروع بارك فيو؟'
    },
    answer: {
      en: 'Park View is a master planned residential community developed by Unlimited Real Estate & Investment. It spans 50,000 sqm, with 30,000 sqm set aside for landscaped gardens and open green space, forming a gated community built around nature, privacy, and modern family life.',
      ar: 'بارك فيو هو مجمع سكني متكامل تم تطويره من قبل شركة انليميتد العقارية للاستثمار. يمتد على مساحة 50,000 متر مربع، مع تخصيص 30,000 متر مربع للحدائق المنسقة والمساحات الخضراء المفتوحة، مما يشكل مجتمعاً مغلقاً مبنياً حول الطبيعة والخصوصية والحياة الأسرية الحديثة.'
    },
    order: 1
  },
  {
    question: {
      en: 'Why choose Park View?',
      ar: 'لماذا تختار بارك فيو؟'
    },
    answer: {
      en: "Park View brings together location, green space, and modern community living in a way that's hard to find elsewhere. Across 50,000 sqm, with 30,000 sqm of gardens and open space, it's been designed for people who want privacy, comfort, and a well connected address close to Damascus.",
      ar: 'يجمع بارك فيو بين الموقع والمساحات الخضراء والعيش المجتمعي الحديث بطريقة يصعب العثور عليها في أي مكان آخر. على مساحة 50,000 متر مربع، مع 30,000 متر مربع من الحدائق والمساحات المفتوحة، تم تصميمه للأشخاص الذين يبحثون عن الخصوصية والراحة وموقع متصل بشكل ممتاز بالقرب من دمشق.'
    },
    order: 2
  },
  {
    question: {
      en: 'Why Invest in Yaafour',
      ar: 'لماذا الاستثمار في يعفور؟'
    },
    answer: {
      en: "Yaafour has become one of the most sought after residential areas near Damascus, known for its natural surroundings, spacious developments, and easy access to the capital. As the area keeps growing, it's drawing homeowners and investors looking for quality residential communities in a well established location.",
      ar: 'أصبحت يعفور واحدة من أكثر المناطق السكنية طلباً بالقرب من دمشق، وتشتهر ببيئتها الطبيعية ومشاريعها الواسعة وسهولة الوصول إلى العاصمة. ومع استمرار نمو المنطقة، فإنها تجذب أصحاب المنازل والمستثمرين الذين يبحثون عن مجمعات سكنية عالية الجودة في موقع متميز.'
    },
    order: 3
  },
  {
    question: {
      en: 'Is Park View a good investment?',
      ar: 'هل بارك فيو استثمار جيد؟'
    },
    answer: {
      en: 'Park View combines a strong Yaafour location, extensive landscaped space, solid construction, and a developer with over 25 years behind it. Whether you\'re buying a family home or adding to a property portfolio, Park View offers long term value in one of the region\'s most desirable residential areas.',
      ar: 'يجمع بارك فيو بين الموقع القوي في يعفور والمساحات الطبيعية الواسعة والبناء المتين ومطور عقاري يتمتع بخبرة تزيد عن 25 عاماً. سواء كنت تشتري منزلاً لعائلتك أو تضيف إلى محفظتك العقارية، فإن بارك فيو يقدم قيمة طويلة الأجل في واحدة من أكثر المناطق السكنية جاذبية في المنطقة.'
    },
    order: 4
  },
  {
    question: {
      en: 'Who is developing Park View?',
      ar: 'من يقوم بتطوير بارك فيو؟'
    },
    answer: {
      en: 'Park View is developed by Unlimited Real Estate & Investment. The company brings more than 25 years of experience across construction, luxury interiors, hospitality, and real estate development.',
      ar: 'تم تطوير بارك فيو من قبل شركة انليميتد العقارية للاستثمار. تتمتع الشركة بخبرة تزيد عن 25 عاماً في مجالات المقاولات والتصميم الداخلي الفاخر والضيافة والتطوير العقاري.'
    },
    order: 5
  },
  {
    question: {
      en: 'What property types are available?',
      ar: 'ما هي أنواع العقارات المتاحة؟'
    },
    answer: {
      en: 'Park View offers spacious residential apartments across multiple clusters. Selected layouts include 2, 3, and 4 bedroom residences, with more unit types released as each phase becomes available.',
      ar: 'يقدم بارك فيو شققاً سكنية فسيحة موزعة على عدة مجتمعات سكنية. تشمل المخططات المختارة مساكن تضم غرفتين وثلاث وأربع غرف نوم، مع طرح المزيد من أنواع الوحدات مع توفر كل مرحلة.'
    },
    order: 6
  },
  {
    question: {
      en: 'How many phases does the project have?',
      ar: 'كم عدد مراحل المشروع؟'
    },
    answer: {
      en: 'Three: Orchid, Lavender, and Magnolia. Each phase introduces a new collection of residences while sharing the same landscaped surroundings and amenities.',
      ar: 'ثلاث مراحل: أوركيد، لافندر، وماغنوليا. تقدم كل مرحلة مجموعة جديدة من المساكن مع المشاركة في نفس البيئة الطبيعية المنسقة والمرافق.'
    },
    order: 7
  },
  {
    question: {
      en: 'What amenities are available at Park View?',
      ar: 'ما هي المرافق المتاحة في بارك فيو؟'
    },
    answer: {
      en: "Swimming pool, spa and wellness centre, outdoor gym, sports courts, landscaped gardens, walking paths, children's playgrounds, kids' activity areas, BBQ and picnic areas, outdoor seating, a multi purpose community hall, an on site health clinic, private resident parking, visitor parking, and 24/7 gated security.",
      ar: 'مسبح، مركز صحي وسبا، صالة رياضية خارجية، ملاعب رياضية، حدائق منسقة، مسارات للمشي، ملاعب للأطفال، مناطق أنشطة للأطفال، مناطق للشواء والنزهات، جلسات خارجية، قاعة مجتمعية متعددة الأغراض، عيادة صحية في الموقع، مواقف خاصة للسكان، مواقف للزوار، وأمن مغلق على مدار الساعة.'
    },
    order: 8
  },
  {
    question: {
      en: 'Is Park View a gated community?',
      ar: 'هل بارك فيو مجمع مغلق؟'
    },
    answer: {
      en: 'Yes. Park View is a gated residential community with round the clock security, dedicated building security staff, private resident parking, and visitor parking.',
      ar: 'نعم. بارك فيو هو مجمع سكني مغلق مع حراسة على مدار الساعة، وموظفي أمن مخصصين للمباني، ومواقف خاصة للسكان ومواقف للزوار.'
    },
    order: 9
  },
  {
    question: {
      en: 'How much green space does the development include?',
      ar: 'ما هي مساحة المساحات الخضراء التي يضمها المشروع؟'
    },
    answer: {
      en: "Of the community's 50,000 sqm, 30,000 sqm is dedicated to landscaped gardens, walking paths, and open recreational space.",
      ar: 'من بين 50,000 متر مربع للمجمع، تم تخصيص 30,000 متر مربع للحدائق المنسقة ومسارات المشي والمساحات الترفيهية المفتوحة.'
    },
    order: 10
  },
  {
    question: {
      en: 'Is Park View suitable for families?',
      ar: 'هل بارك فيو مناسب للعائلات؟'
    },
    answer: {
      en: "Yes. It's been designed with family life in mind, with landscaped parks, children's play areas, outdoor recreation, wellness facilities, and a secure setting throughout.",
      ar: 'نعم. تم تصميمه مع مراعاة حياة الأسرة، ويتميز بحدائق طبيعية ومناطق لعب للأطفال ومرافق ترفيهية وصحية وبيئة آمنة في جميع الأنحاء.'
    },
    order: 11
  },
  {
    question: {
      en: 'Does Park View include retail or commercial spaces?',
      ar: 'هل يضم بارك فيو مساحات تجارية أو محلات بيع بالتجزئة؟'
    },
    answer: {
      en: "The current masterplan focuses on residential living, landscaped gardens, and community amenities. Retail or commercial spaces aren't confirmed at this stage. Contact our sales team for the latest information on future phases.",
      ar: 'يركز المخطط الرئيسي الحالي على العيش السكني والحدائق المنسقة والمرافق المجتمعية. المساحات التجارية أو التجزئة غير مؤكدة في هذه المرحلة. اتصل بفريق المبيعات لدينا للحصول على أحدث المعلومات حول المراحل المستقبلية.'
    },
    order: 12
  },
  {
    question: {
      en: 'What payment plans are available?',
      ar: 'ما هي خطط الدفع المتاحة؟'
    },
    answer: {
      en: 'Flexible payment plans are available across the different phases, and options may vary depending on the residence and release. Contact our sales team for current pricing and payment schedules.',
      ar: 'تتوفر خطط دفع مرنة عبر المراحل المختلفة، وقد تختلف الخيارات اعتماداً على المسكن والإصدار. اتصل بفريق المبيعات لدينا لمعرفة الأسعار الحالية وجداول الدفع.'
    },
    order: 13
  },
  {
    question: {
      en: 'What are the expected service charges?',
      ar: 'ما هي رسوم الخدمة المتوقعة؟'
    },
    answer: {
      en: "Service charges haven't been announced yet. Details will be confirmed before handover and will cover maintenance of shared facilities, landscaped areas, and common spaces.",
      ar: 'لم يتم الإعلان عن رسوم الخدمة بعد. سيتم تأكيد التفاصيل قبل التسليم وتغطية صيانة المرافق المشتركة والمناطق المنسقة والمساحات المشتركة.'
    },
    order: 14
  },
  {
    question: {
      en: 'Who will manage the community?',
      ar: 'من سيدير المجمع السكني؟'
    },
    answer: {
      en: "The community management company hasn't been announced yet. Details will be shared closer to project completion.",
      ar: 'لم يتم الإعلان عن شركة إدارة المجمع بعد. سيتم مشاركة التفاصيل مع اقتراب موعد اكتمال المشروع.'
    },
    order: 15
  },
  {
    question: {
      en: 'How far is Park View from Damascus city centre?',
      ar: 'كم يبعد بارك فيو عن وسط مدينة دمشق؟'
    },
    answer: {
      en: 'About 15 minutes from Umayyad Square and other key destinations in Damascus, making it easy for daily commuting while offering a quieter residential setting.',
      ar: 'حوالي 15 دقيقة من ساحة الأمويين والوجهات الرئيسية الأخرى في دمشق، مما يسهل التنقل اليومي مع توفير بيئة سكنية أكثر هدوءاً.'
    },
    order: 16
  },
  {
    question: {
      en: 'Can overseas Syrians purchase property at Park View?',
      ar: 'هل يمكن للمغتربين السوريين شراء عقار في بارك فيو؟'
    },
    answer: {
      en: 'Eligibility depends on current Syrian property ownership regulations. Our sales team can guide you based on your individual circumstances and the latest legal requirements.',
      ar: 'تعتمد الأهلية على لوائح ملكية العقارات السورية الحالية. يمكن لفريق المبيعات لدينا إرشادك بناءً على ظروفك الفردية وأحدث المتطلبات القانونية.'
    },
    order: 17
  },
  {
    question: {
      en: 'When will the project be completed?',
      ar: 'متى سيتم الانتهاء من المشروع؟'
    },
    answer: {
      en: 'Park View is being delivered in phases, and completion dates for Orchid, Lavender, and Magnolia will be announced as each phase progresses. Contact our sales team for the latest construction updates.',
      ar: 'يتم تسليم بارك فيو على مراحل، وسيتم الإعلان عن تواريخ الانتهاء من مراحل أوركيد ولافندر وماغنوليا مع تقدم كل مرحلة. اتصل بفريق المبيعات لدينا للحصول على أحدث تحديثات البناء.'
    },
    order: 18
  },
  {
    question: {
      en: 'Can I visit the project or sales centre?',
      ar: 'هل يمكنني زيارة المشروع أو مركز المبيعات؟'
    },
    answer: {
      en: 'Yes. You\'re welcome to arrange a visit to learn more, explore available residences, and discuss pricing and payment plans. Contact our sales team to schedule a visit.',
      ar: 'نعم. نرحب بك لترتيب زيارة لمعرفة المزيد واستكشاف المساكن المتاحة ومناقشة الأسعار وخطط الدفع. اتصل بفريق المبيعات لدينا لتحديد موعد الزيارة.'
    },
    order: 19
  },
  {
    question: {
      en: 'How do I register my interest?',
      ar: 'كيف يمكنني تسجيل اهتمامي؟'
    },
    answer: {
      en: 'Registering is free and doesn\'t commit you to a purchase. You\'ll receive updates on new releases, floor plans, pricing, payment plans, construction progress, and availability as each phase opens up.',
      ar: 'التسجيل مجاني ولا يلزمك بالشراء. ستتلقى تحديثات حول الإصدارات الجديدة، ومخططات الطوابق، والأسعار، وخطط الدفع، وتقدم البناء، والتوفر مع فتح كل مرحلة.'
    },
    order: 20
  }
];

async function seedFaqs() {
  try {
    // ─── 1. Query all existing FAQs to delete them ───
    console.log('Querying existing FAQs to delete...');
    const existing = await client.fetch('*[_type == "faq"]');
    console.log(`Found ${existing.length} existing FAQs.`);
    
    if (existing.length > 0) {
      const transaction = client.transaction();
      existing.forEach((faq) => {
        transaction.delete(faq._id);
      });
      await transaction.commit();
      console.log('✓ Successfully deleted existing FAQs.');
    }

    // ─── 2. Insert new FAQs with deterministic IDs ───
    console.log('\nSeeding 21 custom FAQs...');
    const transaction = client.transaction();
    
    newFaqs.forEach((faq, index) => {
      const faqDoc = {
        _type: 'faq',
        _id: `faq_doc_${index}`,
        question: faq.question,
        answer: faq.answer,
        order: faq.order
      };
      transaction.createOrReplace(faqDoc);
    });

    await transaction.commit();
    console.log('✓ Successfully seeded 21 custom FAQs in Sanity.');
  } catch (err) {
    console.error('FAQ seeding failed:', err);
  }
}

seedFaqs();
