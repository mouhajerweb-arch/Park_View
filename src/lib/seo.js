const SITE_URL = 'https://parkview.community';

export function pageMetadata({ path = '', title, description, image = '/images/bg2.jpg', index = true }) {
  const cleanPath = path ? `/${path.replace(/^\/+|\/+$/g, '')}` : '';
  const arabicUrl = `${cleanPath}/ar`;
  const englishUrl = `${cleanPath}/en`;

  return {
    title,
    description,
    alternates: {
      canonical: arabicUrl,
      languages: { 'ar-SY': arabicUrl, en: englishUrl, 'x-default': arabicUrl },
    },
    openGraph: {
      title: `${title} | Park View Yaafour`, description, url: arabicUrl,
      siteName: 'Park View Yaafour', type: 'website', locale: 'ar_SY', alternateLocale: ['en_US'],
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title: `${title} | Park View Yaafour`, description, images: [image] },
    robots: { index, follow: index },
  };
}

export { SITE_URL };
