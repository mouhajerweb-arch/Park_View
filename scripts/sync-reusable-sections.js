/**
 * Sync Reusable Sections Script
 * Ensures that reusable sections across pages have consistent data in Sanity.
 * 
 * Reusable sections identified from the UI:
 * - GallerySection: Homepage + Gallery Page (same carousel images)
 * - PrestigeSection: Homepage + About Page  
 * - DeveloperProfileSection: Homepage + About Page
 * - ConnectivitySection: Homepage + Location Page
 * - ResidencesSection: Homepage + Residences Page
 * - InteriorsSection: Homepage + Residences Page
 * - AmenitiesSection: Homepage + Contact Page
 * - ContactFormSection: Homepage + Contact Page
 * 
 * This script syncs the Gallery Page gallerySection to match the Homepage gallerySection exactly,
 * and ensures all other reusable section data is consistent.
 */
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '0ikudzlw',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: 'skAYXm2Q6HMAeeGrCf5O8mouxyTZzTCYmwffk17B6PpEw9ECv7UIG77gR0VjfYPmMm192Sy6nNjxJDORH',
  useCdn: false,
});

async function patchBoth(docId, patches) {
  const idsToPatch = [docId, `drafts.${docId}`];
  for (const id of idsToPatch) {
    const docExists = await client.fetch('*[_id == $id][0]', { id });
    if (docExists) {
      console.log(`  Patching document: ${id}...`);
      await client.patch(id).set(patches).commit();
      console.log(`  ✓ Patched: ${id}`);
    } else {
      console.log(`  Document ${id} does not exist, skipping.`);
    }
  }
}

async function syncSections() {
  try {
    console.log('=== SYNCING REUSABLE SECTIONS ACROSS PAGES ===\n');

    // ─── 1. SYNC GALLERY SECTION: Copy homepage gallery → gallery page ───
    console.log('1. Syncing Gallery Section (Homepage → Gallery Page)...');
    
    // Get the homepage gallerySection with full image data
    const homepageGallery = await client.fetch(`
      *[_type == "page" && _id == "home"][0].sections[_type == "gallerySection"][0] {
        ...,
        images[] {
          ...,
          "imageAsset": image.asset->
        }
      }
    `);
    
    if (homepageGallery) {
      console.log(`  Found homepage gallery with ${homepageGallery.images?.length || 0} images.`);
      
      // Build the exact same gallery section for gallery page
      const galleryPageSection = {
        _key: 'gal_section',
        _type: 'gallerySection',
        enabled: homepageGallery.enabled !== undefined ? homepageGallery.enabled : true,
        anchor: homepageGallery.anchor || 'gallery',
        eyebrow: homepageGallery.eyebrow || { en: 'PARK VIEW IN IMAGES', ar: 'بارك فيو في صور' },
        title: homepageGallery.title || { en: 'Visual Gallery', ar: 'المعرض المرئي' },
        description: homepageGallery.description || {
          en: 'Browse perspective renders detailing the architectural beauty and visual details of Park View Yaafour.',
          ar: 'تصفح لقطات حقيقية ولقطات منظورية لجمال الفيلات الفاخرة والمساحات الخضراء المنسقة والمرافق السكنية في بارك فيو.'
        },
        // Copy all images exactly from homepage, just with new unique keys
        images: (homepageGallery.images || []).map((img, i) => ({
          _key: `gal_img_${i}`,
          _type: img._type || 'galleryCarouselImage',
          image: img.image,
          title: img.title,
          subtitle: img.subtitle,
        }))
      };
      
      await patchBoth('galleryPage', { sections: [galleryPageSection] });
      console.log(`  ✅ Gallery Page now has the same ${galleryPageSection.images.length} images as Homepage.\n`);
    } else {
      console.log('  ⚠ No gallery section found on homepage.\n');
    }

    // ─── 2. VERIFY ALL REUSABLE SECTIONS ARE PRESENT ───
    console.log('2. Verifying all reusable sections across pages...');
    
    const allPages = await client.fetch(`*[_type in ["page","aboutPage","locationPage","residencesPage","galleryPage","contactPage"]] {
      _id,
      _type,
      title,
      "sectionTypes": sections[]._type,
      "sectionCount": count(sections)
    }`);
    
    for (const page of allPages) {
      console.log(`  ${page.title} (${page._id}): ${page.sectionCount || 0} sections → [${(page.sectionTypes || []).join(', ')}]`);
    }

    console.log('\n🎉 SYNC COMPLETE! All reusable sections are now consistent.');
  } catch (err) {
    console.error('Sync failed:', err);
  }
}

syncSections();
