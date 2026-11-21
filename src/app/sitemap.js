import { client } from '../sanity/client';
import { SITE_URL } from '../lib/seo';

export const revalidate = 3600;

export default async function sitemap() {
  const now = new Date();
  const pages = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: 'about', priority: 0.8, changeFrequency: 'monthly' },
    { path: 'residences', priority: 0.9, changeFrequency: 'weekly' },
    { path: 'location', priority: 0.8, changeFrequency: 'monthly' },
    { path: 'gallery', priority: 0.8, changeFrequency: 'weekly' },
    { path: 'contact', priority: 0.7, changeFrequency: 'monthly' },
    { path: 'blogs', priority: 0.8, changeFrequency: 'weekly' },
    { path: 'privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: 'terms', priority: 0.3, changeFrequency: 'yearly' },
  ];
  const posts = await client.fetch(
    `*[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current, "updated": coalesce(_updatedAt, publishedAt) }`,
    {},
    { next: { revalidate: 3600 } }
  ).catch(() => []);

  const entries = [];
  for (const page of pages) {
    for (const lang of ['ar', 'en']) {
      const prefix = page.path ? `/${page.path}` : '';
      entries.push({ url: `${SITE_URL}${prefix}/${lang}`, lastModified: now, changeFrequency: page.changeFrequency, priority: page.priority });
    }
  }
  for (const post of posts) {
    for (const lang of ['ar', 'en']) {
      entries.push({ url: `${SITE_URL}/blogs/${post.slug}/${lang}`, lastModified: post.updated ? new Date(post.updated) : now, changeFrequency: 'monthly', priority: 0.7 });
    }
  }
  return entries;
}
