/**
 * Targeted Sanity Patch: Amenities + Contact Form sections ONLY.
 * Does NOT touch any other sections or data.
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
  console.log(`  ✓ Uploaded: ${path.basename(fullPath)}`);
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
}

async function seed() {
  try {
    // ─── 1. Fetch existing homepage to find section keys ───
    console.log('Fetching existing homepage document...');
    const home = await client.fetch(`*[_type == "page" && _id == "home"][0]`);
    if (!home) {
      console.error('Homepage not found!');
      return;
    }
    const sections = home.sections || [];
    const amenitiesIndex = sections.findIndex(s => s._type === 'amenitiesSection');
    const contactIndex = sections.findIndex(s => s._type === 'contactFormSection');
    console.log(`  Amenities at index: ${amenitiesIndex}`);
    console.log(`  Contact at index: ${contactIndex}`);

    // ─── 2. Upload amenity icons and build data ───
    console.log('\nUploading amenity icons...');
    const amenitiesData = [
      { nameEn: 'Swimming Pool', nameAr: 'مسبح خارجي', iconPath: 'icons/swimming.png' },
      { nameEn: 'Spa & Wellness Centre', nameAr: 'مركز صحي وسبا', iconPath: 'icons/spa.png' },
      { nameEn: 'Outdoor Gym', nameAr: 'صالة رياضية خارجية', iconPath: 'icons/outdoor gym.png' },
      { nameEn: 'Sports Courts', nameAr: 'ملاعب رياضية', iconPath: 'icons/Sports court.png' },
      { nameEn: "Children's Playgrounds", nameAr: 'ملاعب أطفال', iconPath: 'icons/Children background.png' },
      { nameEn: "Kids' Activity Areas", nameAr: 'مناطق أنشطة الأطفال', iconPath: 'icons/Kids activity area.png' },
      { nameEn: 'BBQ & Picnic Areas', nameAr: 'مناطق شواء ونزهات', iconPath: 'icons/bbq.png' },
      { nameEn: 'Outdoor Seating Areas', nameAr: 'جلسات خارجية', iconPath: 'icons/outdoor seating.png' },
      { nameEn: 'Landscaped Gardens', nameAr: 'حدائق منسقة', iconPath: 'icons/garden.png' },
      { nameEn: 'Multi Purpose Hall', nameAr: 'قاعة متعددة الأغراض', iconPath: 'icons/hall.png' },
      { nameEn: '24/7 Gated Security', nameAr: 'أمن وحراسة ٢٤/٧', iconPath: 'icons/gated security.png' },
      { nameEn: 'Dedicated Building Security', nameAr: 'أمن مخصص للمباني', iconPath: 'icons/Building security.png' },
      { nameEn: 'Private Resident Parking', nameAr: 'مواقف خاصة بالسكان', iconPath: 'icons/Private parking.png' },
      { nameEn: 'Visitor Parking', nameAr: 'مواقف سيارات للزوار', iconPath: 'icons/Visitor parking.png' },
      { nameEn: 'On-site Health Clinic', nameAr: 'عيادة صحية بالموقع', iconPath: 'icons/onsite health clinic.png' },
    ];

    const amenitiesList = [];
    for (let i = 0; i < amenitiesData.length; i++) {
      const a = amenitiesData[i];
      const icon = await uploadImage(a.iconPath);
      amenitiesList.push({
        _key: `amenity_${i}`,
        _type: 'amenityItem',
        name: { en: a.nameEn, ar: a.nameAr },
        ...(icon ? { icon } : {}),
      });
    }

    // ─── 3. Patch amenities section ───
    if (amenitiesIndex >= 0) {
      const key = sections[amenitiesIndex]._key;
      await client
        .patch('home')
        .set({ [`sections[_key=="${key}"].amenities`]: amenitiesList })
        .commit();
      console.log('  ✓ Amenities list patched successfully.');
    } else {
      console.warn('  ⚠ Amenities section not found, skipping.');
    }

    // ─── 4. Patch contact form section ───
    console.log('\nPatching contact form section...');
    if (contactIndex >= 0) {
      const key = sections[contactIndex]._key;
      const contactPatch = {
        [`sections[_key=="${key}"].phone`]: '+963 11 4068',
        [`sections[_key=="${key}"].email`]: 'info@parkview.community',
        [`sections[_key=="${key}"].whatsappNumber`]: '963997711226',
        [`sections[_key=="${key}"].address`]: {
          en: 'Yaafour, Damascus, Syria - Directly behind Swiss House',
          ar: 'يعفور، دمشق، سوريا - خلف البيت السويسري مباشرةً'
        },
        [`sections[_key=="${key}"].mapLatitude`]: 33.5277034,
        [`sections[_key=="${key}"].mapLongitude`]: 36.1118096,
        [`sections[_key=="${key}"].description`]: {
          en: "We're Ready to Connect When You Are",
          ar: 'جاهزون للتواصل عندما تكون مستعداً'
        },
        [`sections[_key=="${key}"].formEyebrow`]: {
          en: 'Register Interest',
          ar: 'التسجيل الحصري'
        },
        [`sections[_key=="${key}"].formTitle`]: {
          en: 'Be the First to Know',
          ar: 'كن أول من يعرف'
        },
        [`sections[_key=="${key}"].formDescription`]: {
          en: 'Sign up below to receive exclusive updates, pricing details, and early access to Park View Yaafour.',
          ar: 'سجل أدناه لتلقي التحديثات الحصرية وتفاصيل الأسعار والوصول المبكر إلى بارك فيو يعفور.'
        },
        [`sections[_key=="${key}"].submitButtonText`]: {
          en: 'Register Now',
          ar: 'سجّل الآن'
        },
        [`sections[_key=="${key}"].formLabels`]: {
          firstName: { en: 'First Name', ar: 'الاسم الأول' },
          lastName: { en: 'Last Name', ar: 'اسم العائلة' },
          email: { en: 'Email Address', ar: 'البريد الإلكتروني' },
          phone: { en: 'Phone Number', ar: 'رقم الهاتف' },
          remarks: { en: 'Any Remarks (Optional)', ar: 'ملاحظات (اختياري)' },
        },
        [`sections[_key=="${key}"].successMessage`]: {
          en: 'Thank you! Your enquiry has been submitted.',
          ar: 'شكراً لك! تم إرسال استفسارك بنجاح.'
        },
        [`sections[_key=="${key}"].errorMessage`]: {
          en: 'Please fill in all required fields (Name, Email, Phone Number)',
          ar: 'يرجى ملء جميع الحقول المطلوبة (الاسم، البريد الإلكتروني، رقم الهاتف)'
        },
      };
      await client.patch('home').set(contactPatch).commit();
      console.log('  ✓ Contact form section patched successfully.');
    } else {
      console.warn('  ⚠ Contact form section not found, skipping.');
    }

    console.log('\n✅ All done! Only amenities and contact sections were updated.');
  } catch (error) {
    console.error('Seeding failed:', error);
  }
}

seed();
