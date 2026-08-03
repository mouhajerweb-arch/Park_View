/**
 * Sanity FAQ Deduplication Script
 * Queries all FAQ documents, groups them by their English question title,
 * and deletes all duplicate documents in a single transaction.
 */
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '0ikudzlw',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: 'skAYXm2Q6HMAeeGrCf5O8mouxyTZzTCYmwffk17B6PpEw9ECv7UIG77gR0VjfYPmMm192Sy6nNjxJDORH',
  useCdn: false,
});

async function cleanFaqs() {
  try {
    console.log('Fetching all FAQs from Sanity...');
    const faqs = await client.fetch('*[_type == "faq"]');
    console.log(`Fetched ${faqs.length} total FAQ documents.`);

    const uniqueFaqs = {};
    const toDelete = [];

    faqs.forEach((faq) => {
      // Use clean normalized English question text for grouping, default to id if not set
      const qText = (faq.question?.en || '').trim().toLowerCase() || faq._id;
      if (!uniqueFaqs[qText]) {
        // Keep this document
        uniqueFaqs[qText] = faq._id;
      } else {
        // Mark duplicate document for deletion
        toDelete.push(faq._id);
      }
    });

    console.log(`Found ${Object.keys(uniqueFaqs).length} unique FAQs.`);
    console.log(`Found ${toDelete.length} duplicate FAQs to delete.`);

    if (toDelete.length > 0) {
      console.log('Deleting duplicate documents in a transaction...');
      const transaction = client.transaction();
      toDelete.forEach((id) => {
        transaction.delete(id);
      });
      await transaction.commit();
      console.log('✓ Successfully deleted all duplicate FAQ documents from Sanity.');
    } else {
      console.log('No duplicate FAQs found to clean.');
    }
  } catch (err) {
    console.error('FAQ deduplication failed:', err);
  }
}

cleanFaqs();
