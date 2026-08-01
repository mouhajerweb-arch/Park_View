'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';
import { usePathname, useRouter } from 'next/navigation';

const LanguageContext = createContext();

export { translations };

export function LanguageProvider({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [lang, setLang] = useState('ar');
  const [isLoaderActive, setIsLoaderActive] = useState(true);

  // Set isLoaderActive to false after initial mount animation finishes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaderActive(false);
    }, 2000); // 2.0s allows initial logo and progress animation to complete elegantly
    return () => clearTimeout(timer);
  }, []);

  // Determine language from URL path on initial load
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (pathname.startsWith('/studio')) return;
    const segments = pathname.split('/').filter(Boolean);
    let urlLang = segments[segments.length - 1]; // last segment
    const validLang = urlLang === 'en' || urlLang === 'ar';
    if (!validLang) {
      const savedLang = sessionStorage.getItem('preferredLang');
      urlLang = savedLang === 'en' || savedLang === 'ar' ? savedLang : 'ar';
      // Redirect to root with language suffix only if not already there
      if (pathname !== `/${urlLang}`) {
        router.replace(`/${urlLang}`);
      }
    }
    setLang(urlLang);
    sessionStorage.setItem('preferredLang', urlLang);
  }, [pathname, router]);

  const toggleLanguage = () => {
    const next = lang === 'en' ? 'ar' : 'en';
    // Build new path preserving current page but swapping language suffix
    const segments = pathname.split('/').filter(Boolean);
    const baseSegments = segments.slice(0, -1); // drop current language
    const newPath = '/' + [...baseSegments, next].join('/') || '/';

    // 1. Show loader (slide down)
    setIsLoaderActive(true);

    // 2. Wait for slide-down animation to complete, then change language and route
    setTimeout(() => {
      setLang(next);
      sessionStorage.setItem('preferredLang', next);
      router.replace(newPath);

      // 3. Wait for new page layout compilation and render, then hide loader (slide up)
      setTimeout(() => {
        setIsLoaderActive(false);
      }, 600);
    }, 800);
  };

  const t = translations[lang];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (pathname.startsWith('/studio')) {
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
      return;
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir, pathname]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t, isLoaderActive }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
