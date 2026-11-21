import { client, optimizedImageUrl } from '../../../sanity/client';
import { pageMetadata } from '../../../lib/seo';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{title, excerpt, image, "imageUrl": image.asset->url}`,
    { slug },
    { next: { revalidate: 300 } }
  ).catch(() => null);

  if (!post) return pageMetadata({ path: `blogs/${slug}`, title: 'Park View Journal', description: 'Insights and stories from Park View Yaafour.', index: false });

  return pageMetadata({
    path: `blogs/${slug}`,
    title: post.title?.en || post.title?.ar || 'Park View Journal',
    description: post.excerpt?.en || post.excerpt?.ar || 'Insights and stories from Park View Yaafour.',
    image: optimizedImageUrl(post.image || post.imageUrl, { width: 1200, quality: 85 }) || '/images/bg2.jpg',
  });
}

export default function Layout({ children }) { return children; }
