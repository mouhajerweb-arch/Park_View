'use client';
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme/theme';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import { RegisterProvider } from '../context/RegisterContext';
import RegisterDrawer from '../components/RegisterDrawer';
import PageLoader from '../components/PageLoader';
import SmoothScroll from '../components/SmoothScroll';
import { usePathname } from 'next/navigation';
import { client } from '../sanity/client';
import './globals.css';

// Suppress the harmless React 19 tabIndex warning inside Sanity Studio to prevent Next.js dev overlay from popping up
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  console.error = (...args) => {
    if (
      args[0] &&
      typeof args[0] === 'string' &&
      (args[0].includes('Invalid prop `tabIndex` supplied to `React.Fragment`') ||
       args[0].includes('React.Fragment can only have `key` and `children` props'))
    ) {
      return;
    }
    originalError(...args);
  };
}

function LayoutContent({ children }) {
  const { lang, t } = useLanguage();
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  const [siteSettings, setSiteSettings] = useState(null);

  useEffect(() => {
    let active = true;
    client
      .fetch(`*[_type == "siteSettings" && _id == "siteSettings"][0] {
        ...,
        "faviconUrl": favicon.asset->url
      }`)
      .then((data) => {
        if (active && data) {
          setSiteSettings(data);
        }
      })
      .catch((err) => console.warn('Error fetching site settings for layout:', err));
    return () => {
      active = false;
    };
  }, []);

  if (isStudio) {
    return (
      <html lang="en">
        <body className="sanity-studio-body">
          {children}
        </body>
      </html>
    );
  }

  const displayTitle = siteSettings?.siteName?.[lang] || siteSettings?.siteName?.en || "Park View Yaafour — Private Residential Community in Damascus";
  const displayDescription = siteSettings?.defaultSeo?.metaDescription?.[lang] || siteSettings?.defaultSeo?.metaDescription?.en || "Park View is a private residential community in Yaafour, Damascus, spanning 50,000 sqm with 30,000 sqm of landscaped green gardens and contemporary Mediterranean homes.";
  const displayFavicon = siteSettings?.faviconUrl || "/favicon.ico";

  return (
    <html lang={lang} dir={t.dir} suppressHydrationWarning>
      <head>
        <title>{displayTitle}</title>
        <meta name="description" content={displayDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={displayFavicon} />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <PageLoader />
          <RegisterProvider>
            <SmoothScroll>{children}</SmoothScroll>
            <RegisterDrawer />
          </RegisterProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default function RootLayout({ children }) {
  return (
    <LanguageProvider>
      <LayoutContent>{children}</LayoutContent>
    </LanguageProvider>
  );
}
