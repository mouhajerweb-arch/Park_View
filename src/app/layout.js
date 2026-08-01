'use client';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme/theme';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import { RegisterProvider } from '../context/RegisterContext';
import RegisterDrawer from '../components/RegisterDrawer';
import PageLoader from '../components/PageLoader';
import SmoothScroll from '../components/SmoothScroll';
import { usePathname } from 'next/navigation';
import './globals.css';

function LayoutContent({ children }) {
  const { lang, t } = useLanguage();
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  if (isStudio) {
    return (
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang={lang} dir={t.dir} suppressHydrationWarning>
      <head>
        <title>Park View Yaafour — Private Residential Community in Damascus</title>
        <meta name="description" content="Park View is a private residential community in Yaafour, Damascus, spanning 50,000 sqm with 30,000 sqm of landscaped green gardens and contemporary Mediterranean homes." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
