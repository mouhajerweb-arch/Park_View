export const fallbackBlogPage = {
  heroTitle: {
    en: 'Journal of Refined Living',
    ar: 'مجلة الحياة الراقية',
  },
  heroSubtitle: {
    en: 'Park View Stories',
    ar: 'قصص بارك فيو',
  },
  heroImagePath: '/images/prestige-tranquility.jpg',
  introEyebrow: {
    en: 'Notes from Yaafour',
    ar: 'من وحي يعفور',
  },
  introTitle: {
    en: 'Design, nature, and the quiet intelligence of community life.',
    ar: 'تصميم وطبيعة وذكاء هادئ في تفاصيل الحياة المجتمعية.',
  },
  introText: {
    en: 'Explore considered perspectives on Park View Yaafour, from landscape-led planning and private wellness to the everyday rituals that shape a calmer residential address.',
    ar: 'اكتشف رؤى مدروسة حول بارك فيو يعفور، من التخطيط المرتبط بالطبيعة والرفاهية الخاصة إلى التفاصيل اليومية التي تصنع عنواناً سكنياً أكثر هدوءاً.',
  },
  articleLabels: {
    readArticle: {
      en: 'Read article',
      ar: 'اقرأ المقال',
    },
    backToBlogs: {
      en: 'Back to blogs',
      ar: 'العودة إلى المدونة',
    },
    relatedTitle: {
      en: 'More from the journal',
      ar: 'مقالات ذات صلة',
    },
    notFoundTitle: {
      en: 'Article not found',
      ar: 'المقال غير متوفر',
    },
  },
};

export const fallbackBlogPosts = [
  {
    _id: 'seed-blog-01',
    title: {
      en: 'Why Landscape Is the New Luxury',
      ar: 'لماذا أصبحت المساحات الخضراء عنوان الرفاهية الجديدة',
    },
    slug: { current: 'why-landscape-is-the-new-luxury' },
    excerpt: {
      en: 'At Park View Yaafour, landscape is not decorative. It is the organizing principle behind privacy, movement, shade, and everyday wellbeing.',
      ar: 'في بارك فيو يعفور، لا تأتي المساحات الخضراء كعنصر جمالي فقط، بل كفكرة تنظم الخصوصية والحركة والظل وجودة الحياة اليومية.',
    },
    body: {
      en: 'A residential community feels truly refined when the outdoor spaces are planned with the same care as the homes themselves. Gardens soften transitions, walking paths create slower daily rhythms, and shaded gathering areas give families places to meet without leaving the calm of the community. This is where Park View becomes more than an address: it becomes a living environment shaped around balance.',
      ar: 'تكتسب المجتمعات السكنية رقيها الحقيقي عندما تصمم المساحات الخارجية بالعناية نفسها التي تصمم بها المنازل. فالحدائق تلطف الانتقال بين المساحات، والممرات تمنح اليوم إيقاعاً أهدأ، ومناطق الجلوس المظللة تخلق أماكن لقاء للعائلات داخل هدوء المجتمع نفسه. هنا يصبح بارك فيو أكثر من عنوان، بل بيئة حياة متوازنة.',
    },
    category: { en: 'Landscape', ar: 'المساحات الخضراء' },
    readTime: { en: '4 min read', ar: '٤ دقائق قراءة' },
    publishedAt: '2026-07-12T09:00:00Z',
    featured: true,
    imagePath: '/images/curated-garden.jpg',
    contentBlocks: [
      {
        _key: 'landscape-masterplan',
        _type: 'blogTextBlock',
        heading: { en: 'A Masterplan Led by Open Space', ar: 'مخطط تقوده المساحات المفتوحة' },
        text: {
          en: 'The most memorable residential places begin outside the front door. At Park View, landscaped gardens, pedestrian paths, and calm arrival moments are treated as essential parts of the home experience, creating a community that feels composed before you even step inside.',
          ar: 'تبدأ أكثر الأماكن السكنية حضوراً من خارج باب المنزل. في بارك فيو، تعامل الحدائق والممرات ولحظات الوصول الهادئة كجزء أساسي من تجربة السكن، لتصنع مجتمعاً متوازناً قبل الدخول إلى المنزل.',
        },
      },
      {
        _key: 'landscape-pool-image',
        _type: 'blogImageBlock',
        imagePath: '/images/harmony-pool.jpg',
        caption: { en: 'Water, shade, and planting create a softer daily rhythm.', ar: 'الماء والظل والتشجير يصنعون إيقاعاً يومياً أكثر هدوءاً.' },
      },
      {
        _key: 'landscape-editorial-note',
        _type: 'blogQuoteBlock',
        quote: {
          en: 'True luxury is the ability to move through the day with privacy, shade, and a sense of natural ease.',
          ar: 'الرفاهية الحقيقية هي أن يتحرك اليوم بين الخصوصية والظل وإحساس طبيعي بالراحة.',
        },
      },
      {
        _key: 'landscape-wellbeing',
        _type: 'blogTextBlock',
        heading: { en: 'Designed for Everyday Wellbeing', ar: 'مصمم لرفاهية الحياة اليومية' },
        text: {
          en: 'Generous green areas support small rituals: a morning walk, a quiet bench after sunset, children moving safely between amenities, and neighbors meeting in places that feel natural rather than staged.',
          ar: 'تدعم المساحات الخضراء الواسعة تفاصيل يومية بسيطة: نزهة صباحية، جلسة هادئة بعد الغروب، حركة آمنة للأطفال بين المرافق، ولقاءات طبيعية بين الجيران.',
        },
      },
    ],
    order: 1,
  },
  {
    _id: 'seed-blog-02',
    title: {
      en: 'A Calmer Way to Arrive Home',
      ar: 'طريقة أكثر هدوءاً للعودة إلى المنزل',
    },
    slug: { current: 'a-calmer-way-to-arrive-home' },
    excerpt: {
      en: 'From the gated arrival to the landscaped pedestrian routes, the experience of coming home is composed as a gradual return to privacy.',
      ar: 'من المدخل الآمن إلى المسارات المحاطة بالحدائق، صممت تجربة الوصول إلى المنزل كعودة تدريجية نحو الخصوصية.',
    },
    body: {
      en: 'The best arrival sequences reduce the noise of the outside world step by step. At Park View, secure access, clear circulation, greenery, and residential scale work together to create a composed threshold between the city and home.',
      ar: 'تعمل أفضل تجارب الوصول على تخفيف صخب الخارج خطوة بعد أخرى. في بارك فيو، يجتمع الدخول الآمن والحركة الواضحة والخضرة والمقياس السكني لصناعة انتقال متوازن بين المدينة والمنزل.',
    },
    category: { en: 'Community', ar: 'المجتمع' },
    readTime: { en: '3 min read', ar: '٣ دقائق قراءة' },
    publishedAt: '2026-07-28T09:00:00Z',
    imagePath: '/images/luxury-entry.jpg',
    contentBlocks: [
      {
        _key: 'arrival-threshold',
        _type: 'blogTextBlock',
        heading: { en: 'The Threshold Matters', ar: 'أهمية لحظة الانتقال' },
        text: {
          en: 'A gated community should not only protect. It should create a sense of arrival. Park View uses clear circulation, calm materials, and landscape buffers to make the return home feel gradual and composed.',
          ar: 'لا يقتصر دور المجتمع المغلق على الحماية فقط، بل يصنع شعوراً بالوصول. يوظف بارك فيو حركة واضحة ومواد هادئة وفواصل خضراء لتصبح العودة إلى المنزل تجربة تدريجية ومتوازنة.',
        },
      },
      {
        _key: 'arrival-security-image',
        _type: 'blogImageBlock',
        imagePath: '/images/location-security.jpg',
        caption: { en: 'Security and landscape work together without visual heaviness.', ar: 'يتكامل الأمن مع المشهد الطبيعي دون ثقل بصري.' },
      },
      {
        _key: 'arrival-privacy',
        _type: 'blogTextBlock',
        heading: { en: 'Privacy Without Isolation', ar: 'خصوصية دون عزلة' },
        text: {
          en: 'The plan creates distance from noise while keeping shared amenities close. That balance gives residents a private address with the social ease of a connected neighborhood.',
          ar: 'يخلق المخطط مسافة عن الضجيج مع إبقاء المرافق المشتركة قريبة. يمنح هذا التوازن السكان عنواناً خاصاً مع سهولة اجتماعية تشبه الحي المتصل.',
        },
      },
    ],
    order: 2,
  },
  {
    _id: 'seed-blog-03',
    title: {
      en: 'Interiors That Let the Day Breathe',
      ar: 'مساحات داخلية تمنح اليوم اتساعاً',
    },
    slug: { current: 'interiors-that-let-the-day-breathe' },
    excerpt: {
      en: 'Light, material warmth, and generous proportions create homes that feel composed from morning routines to evening gatherings.',
      ar: 'يسهم الضوء ودفء المواد واتساع النسب في خلق منازل متوازنة من تفاصيل الصباح حتى لقاءات المساء.',
    },
    body: {
      en: 'Elegant interiors do not need to compete for attention. Neutral textures, considered lighting, and framed views allow each room to feel restful while still carrying a strong architectural identity.',
      ar: 'لا تحتاج المساحات الداخلية الراقية إلى المبالغة لتلفت الانتباه. فالخامات الهادئة والإضاءة المدروسة والإطلالات المؤطرة تمنح كل غرفة إحساساً بالراحة مع حضور معماري واضح.',
    },
    category: { en: 'Interiors', ar: 'التصميم الداخلي' },
    readTime: { en: '5 min read', ar: '٥ دقائق قراءة' },
    publishedAt: '2026-08-04T09:00:00Z',
    imagePath: '/images/interior-dining.jpg',
    contentBlocks: [
      {
        _key: 'interiors-light',
        _type: 'blogTextBlock',
        heading: { en: 'Light as a Material', ar: 'الضوء كعنصر تصميم' },
        text: {
          en: 'Natural light gives interiors their softness. In dining and living spaces, broad glazing and measured tones let the day animate the room without overwhelming it.',
          ar: 'يمنح الضوء الطبيعي المساحات الداخلية نعومتها. في غرف الطعام والمعيشة، تسمح الواجهات الواسعة والدرجات الهادئة لليوم بأن ينعكس داخل الغرفة دون مبالغة.',
        },
      },
      {
        _key: 'interiors-bedroom-image',
        _type: 'blogImageBlock',
        imagePath: '/images/interior-bedroom.jpg',
        caption: { en: 'Private rooms balance warmth, proportion, and quiet views.', ar: 'توازن الغرف الخاصة بين الدفء والنسب والإطلالات الهادئة.' },
      },
      {
        _key: 'interiors-editorial-note',
        _type: 'blogQuoteBlock',
        quote: {
          en: 'A refined interior does not shout. It gives the residents space to live fully.',
          ar: 'لا تحتاج المساحة الراقية إلى الصخب، بل تمنح ساكنيها مساحة حقيقية للحياة.',
        },
      },
      {
        _key: 'interiors-slower-pace',
        _type: 'blogTextBlock',
        heading: { en: 'Rooms With a Slower Pace', ar: 'غرف بإيقاع أهدأ' },
        text: {
          en: 'Material warmth, soft lighting, and clean architectural lines create interiors that feel precise yet relaxed, equally suited to family routines and intimate hosting.',
          ar: 'تصنع الخامات الدافئة والإضاءة الناعمة والخطوط المعمارية الواضحة مساحات دقيقة ومريحة في آن واحد، مناسبة لتفاصيل العائلة والاستضافة الهادئة.',
        },
      },
    ],
    order: 3,
  },
];
