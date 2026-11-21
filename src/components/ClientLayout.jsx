'use client';

import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { usePathname } from 'next/navigation';
import theme from '../theme/theme';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import { RegisterProvider } from '../context/RegisterContext';
import RegisterDrawer from './RegisterDrawer';
import PageLoader from './PageLoader';
import SmoothScroll from './SmoothScroll';

function ClientContent({ children }) {
  const { lang, t } = useLanguage();
  const isStudio = usePathname()?.startsWith('/studio');

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  if (isStudio) return children;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PageLoader />
      <RegisterProvider>
        <SmoothScroll>{children}</SmoothScroll>
        <RegisterDrawer />
      </RegisterProvider>
    </ThemeProvider>
  );
}

export default function ClientLayout({ children }) {
  return <LanguageProvider><ClientContent>{children}</ClientContent></LanguageProvider>;
}
