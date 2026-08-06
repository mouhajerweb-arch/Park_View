import { createClient } from '@sanity/client';
import { existsSync, readFileSync } from 'node:fs';
import { fallbackBlogPage, fallbackBlogPosts } from '../src/content/blogContent.js';

if (existsSync('.env')) {
  const envFile = readFileSync('.env', 'utf8');
  envFile.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^([^#=\s]+)=(.*)$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].trim();
    }
  });
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0ikudzlw',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

if (!process.env.SANITY_API_WRITE_TOKEN) {
  throw new Error('SANITY_API_WRITE_TOKEN is required to seed blog content.');
}

const blogPageDoc = {
  _id: 'blogPage',
  _type: 'blogPage',
  title: 'Blogs Page',
  ...fallbackBlogPage,
  seo: {
    metaTitle: {
      en: 'Park View Yaafour Journal | Refined Living Insights',
      ar: 'مجلة بارك فيو يعفور | رؤى الحياة الراقية',
    },
    metaDescription: {
      en: 'Stories and insights on landscape, interiors, wellness, and community life at Park View Yaafour.',
      ar: 'قصص ورؤى حول المساحات الخضراء والتصميم الداخلي والرفاهية والحياة المجتمعية في بارك فيو يعفور.',
    },
  },
};

const transaction = client.transaction().createOrReplace(blogPageDoc);

fallbackBlogPosts.forEach((post) => {
  transaction.createOrReplace({
    ...post,
    _id: post._id.replace('seed-', 'sanity-'),
    _type: 'blogPost',
  });
});

await transaction.commit();
console.log('Seeded blog page and blog posts.');
