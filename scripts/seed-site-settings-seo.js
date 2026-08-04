/**
 * Seeding Script: Default SEO Metadata inside Site Settings (Published & Drafts)
 * Populates defaultSeo field (metaTitle, metaDescription) for siteSettings documents in Sanity.
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

async function runSeeding() {
  try {
    console.log('--- SEEDING DEFAULT SITE SETTINGS SEO METADATA (PUBLISHED & DRAFTS) ---');
    
    const defaultSeoPatch = {
      defaultSeo: {
        _type: 'seo',
        metaTitle: {
          _type: 'localizedString',
          en: 'Park View Yaafour | Luxury Residential Community in Damascus, Syria',
          ar: 'بارك فيو يعفور | مجمع سكني مغلق فاخر في دمشق، سوريا'
        },
        metaDescription: {
          _type: 'localizedText',
          en: 'Park View is a private residential community in Yaafour, Damascus, spanning 50,000 sqm with 30,000 sqm of landscaped green gardens and contemporary Mediterranean homes.',
          ar: 'بارك فيو هو مجمع سكني خاص في يعفور، دمشق. يمتد على مساحة 50,000 متر مربع ويضم حدائق خضراء منسقة بمساحة 30,000 متر مربع وفيلات عصرية بتصاميم متوسطية راقية.'
        }
      }
    };

    await patchBoth('siteSettings', defaultSeoPatch);
    
    console.log('\n🎉 DEFAULT SITE SETTINGS SEO SEEDING COMPLETED SUCCESSFULLY!');
  } catch (err) {
    console.error('Site Settings SEO Seeding failed:', err);
  }
}

runSeeding();
