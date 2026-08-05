import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0ikudzlw',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production for caching, fetch fresh data in dev
  token: process.env.SANITY_API_READ_TOKEN, // Optional token for private drafts or preview mode
});

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export function optimizedImageUrl(source, options = {}) {
  if (!source) return '';

  const { width = 1600, quality = 82 } = options;

  if (typeof source === 'string') {
    if (!source.includes('cdn.sanity.io')) return source;
    const separator = source.includes('?') ? '&' : '?';
    return `${source}${separator}auto=format&w=${width}&q=${quality}`;
  }

  return builder.image(source).auto('format').width(width).quality(quality).url();
}
