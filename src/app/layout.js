import Script from 'next/script';
import ClientLayout from '../components/ClientLayout';
import './globals.css';

const SITE_URL = 'https://parkview.community';
const META_PIXEL_ID = '2225745461706390';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Park View Yaafour | Private Residential Community in Damascus', template: '%s | Park View Yaafour' },
  description: 'Discover Park View Yaafour, a private residential community near Damascus with landscaped gardens, contemporary Mediterranean homes, premium amenities, and secure family living.',
  applicationName: 'Park View Yaafour',
  authors: [{ name: 'Park View' }],
  creator: 'Park View', publisher: 'Park View', category: 'Real Estate',
  keywords: ['Park View Yaafour', 'Yaafour residences', 'Damascus residential community', 'luxury homes Syria', 'gated community Damascus', 'real estate Yaafour'],
  alternates: { canonical: '/ar', languages: { 'ar-SY': '/ar', en: '/en', 'x-default': '/ar' } },
  openGraph: {
    type: 'website', url: '/ar', siteName: 'Park View Yaafour', locale: 'ar_SY', alternateLocale: ['en_US'],
    title: 'Park View Yaafour | Private Residential Community in Damascus',
    description: 'A refined private residential community where contemporary Mediterranean homes meet expansive landscaped gardens in Yaafour, Damascus.',
    images: [{ url: '/images/bg2.jpg', width: 1200, height: 630, alt: 'Park View Yaafour residential community' }],
  },
  twitter: { card: 'summary_large_image', title: 'Park View Yaafour', description: 'Private residential community in Yaafour, Damascus.', images: ['/images/bg2.jpg'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  icons: { icon: '/favicon.ico', apple: '/images/logo.png' },
  manifest: '/manifest.webmanifest',
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': ['Organization', 'RealEstateAgent'],
  '@id': `${SITE_URL}/#organization`, name: 'Park View Yaafour', url: SITE_URL,
  logo: `${SITE_URL}/images/park-view-full-logo.png`, email: 'info@parkview.community', telephone: '+963114068',
  address: { '@type': 'PostalAddress', addressLocality: 'Yaafour', addressRegion: 'Rif Dimashq', addressCountry: 'SY' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script id="park-view-structured-data" type="application/ld+json" strategy="beforeInteractive">{JSON.stringify(organizationSchema)}</Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');fbq('track', 'PageView');
          `}
        </Script>
        <noscript><img height="1" width="1" style={{ display: 'none' }} src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`} alt="" /></noscript>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
