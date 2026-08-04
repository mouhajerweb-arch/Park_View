/**
 * Seed Gallery Items + Clean Up Inline Images
 * 
 * 1. Creates individual `galleryItem` documents in the "Gallery Images" content section
 * 2. Removes inline `images` array from gallerySection on Homepage and Gallery Page
 *    so both pages use the centralized galleryItem documents as their single source of truth
 * 3. Keeps the gallerySection metadata (eyebrow, title, description) on each page
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

async function patchBoth(docId, patches) {
  const idsToPatch = [docId, `drafts.${docId}`];
  for (const id of idsToPatch) {
    const docExists = await client.fetch('*[_id == $id][0]', { id });
    if (docExists) {
      console.log(`  Patching document: ${id}...`);
      await client.patch(id).set(patches).commit();
      console.log(`  ✓ Patched: ${id}`);
    }
  }
}

async function run() {
  try {
    console.log('=== SEEDING GALLERY ITEMS & CLEANING INLINE IMAGES ===\n');

    // ─── 1. Define the 8 gallery items ───
    const galleryData = [
      { id: 'gallery-grand-gateway',    order: 1, imagePath: 'images/luxury-entry.jpg',          titleEn: 'Grand Gateway',       titleAr: 'البوابة الكبرى',       subtitleEn: 'Main entrance security gatehouse',          subtitleAr: 'بوابة الحراسة والأمان للمدخل الرئيسي' },
      { id: 'gallery-oasis-pool',       order: 2, imagePath: 'images/harmony-pool.jpg',          titleEn: 'Oasis Pool',          titleAr: 'مسبح الواحة',          subtitleEn: 'Mediterranean landscape swimming pool',     subtitleAr: 'مسبح منسق على الطراز المتوسطي' },
      { id: 'gallery-dining-salon',     order: 3, imagePath: 'images/interior-dining.jpg',       titleEn: 'Dining Salon',        titleAr: 'صالون الطعام',         subtitleEn: 'Luxury finished dining room design',        subtitleAr: 'تصميم داخلي فاخر لغرفة الطعام' },
      { id: 'gallery-master-suite',     order: 4, imagePath: 'images/interior-bedroom.jpg',      titleEn: 'Master Suite',        titleAr: 'الجناح الرئيسي',       subtitleEn: 'Expansive master bedroom design',           subtitleAr: 'تصميم جناح غرفة النوم الرئيسية الفسيحة' },
      { id: 'gallery-green-promenade',  order: 5, imagePath: 'images/curated-garden.jpg',        titleEn: 'Green Promenade',     titleAr: 'الممر الأخضر',         subtitleEn: 'Manicured gardens & walking paths',         subtitleAr: 'الحدائق المنسقة ومسارات المشي الهادئة' },
      { id: 'gallery-courtyard-facade', order: 6, imagePath: 'images/prestige-tranquility.jpg',  titleEn: 'Courtyard Facade',    titleAr: 'واجهة الفناء',         subtitleEn: 'Mediterranean building facades overview',   subtitleAr: 'واجهات معمارية على الطراز المتوسطي' },
      { id: 'gallery-residential-cluster', order: 7, imagePath: 'images/curated-garden.jpg',     titleEn: 'Residential Cluster', titleAr: 'المجمع السكني',        subtitleEn: 'Aerial view of residential clusters',       subtitleAr: 'منظر جوي للمجمعات السكنية' },
      { id: 'gallery-balcony-living',   order: 8, imagePath: 'images/harmony-pool.jpg',          titleEn: 'Balcony Living',      titleAr: 'حياة الشرفة',          subtitleEn: 'Private outdoor balcony terraces',          subtitleAr: 'شرفات خارجية خاصة' },
    ];

    // ─── 2. Upload images and create galleryItem documents ───
    console.log('Step 1: Creating galleryItem documents in "Gallery Images" content section...');
    
    for (const item of galleryData) {
      const img = await uploadImage(item.imagePath);
      
      const doc = {
        _id: item.id,
        _type: 'galleryItem',
        title: { _type: 'localizedString', en: item.titleEn, ar: item.titleAr },
        subtitle: { _type: 'localizedString', en: item.subtitleEn, ar: item.subtitleAr },
        order: item.order,
        ...(img ? { image: img } : {})
      };
      
      await client.createOrReplace(doc);
      console.log(`  ✓ Created galleryItem: ${item.titleEn} (order: ${item.order})`);
    }

    // ─── 3. Update Homepage gallerySection - remove inline images, keep metadata ───
    console.log('\nStep 2: Removing inline images from Homepage gallerySection (will use galleryItem docs)...');
    
    const homepage = await client.fetch('*[_type == "page" && _id == "home"][0]');
    if (homepage && homepage.sections) {
      const updatedSections = homepage.sections.map(section => {
        if (section._type === 'gallerySection') {
          // Keep metadata, remove inline images array
          const { images, ...metaOnly } = section;
          return metaOnly;
        }
        return section;
      });
      await patchBoth('home', { sections: updatedSections });
      console.log('  ✓ Homepage gallerySection: inline images removed, metadata preserved.');
    }

    // ─── 4. Update Gallery Page gallerySection - remove inline images, keep metadata ───
    console.log('\nStep 3: Removing inline images from Gallery Page gallerySection (will use galleryItem docs)...');
    
    const galleryPage = await client.fetch('*[_type == "galleryPage" && _id == "galleryPage"][0]');
    if (galleryPage && galleryPage.sections) {
      const updatedSections = galleryPage.sections.map(section => {
        if (section._type === 'gallerySection') {
          const { images, ...metaOnly } = section;
          return metaOnly;
        }
        return section;
      });
      await patchBoth('galleryPage', { sections: updatedSections });
      console.log('  ✓ Gallery Page gallerySection: inline images removed, metadata preserved.');
    }

    // ─── 5. Verify ───
    console.log('\nStep 4: Verifying galleryItem documents...');
    const items = await client.fetch('*[_type == "galleryItem"] | order(order asc) { _id, "title": title.en, order }');
    console.log(`  Found ${items.length} galleryItem documents:`);
    items.forEach(item => console.log(`    ${item.order}. ${item.title} (${item._id})`));

    console.log('\n🎉 DONE! Gallery Images content section is now the single source of truth.');
    console.log('   Both Homepage and Gallery Page will fetch from galleryItem documents.');
  } catch (err) {
    console.error('Failed:', err);
  }
}

run();
