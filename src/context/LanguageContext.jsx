'use client';
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { translations } from './translations';
import { usePathname, useRouter } from 'next/navigation';

const LanguageContext = createContext();

export { translations };

const MIN_LOADER_DURATION = 2000;

export function LanguageProvider({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [lang, setLang] = useState('ar');
  const [isLoaderActive, setIsLoaderActive] = useState(true);
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const [isHeroReady, setIsHeroReady] = useState(false);
  const routeStartPathRef = useRef(null);
  const loaderStartedAtRef = useRef(Date.now());
  const initialLoaderDoneRef = useRef(false);

  // Set isLoaderActive to false after initial mount animation finishes.
  // Wait for the page hero media to be ready so images/videos never pop in after the loader closes.
  useEffect(() => {
    if (initialLoaderDoneRef.current) return;
    if (!isHeroReady) return;

    const elapsed = Date.now() - loaderStartedAtRef.current;
    const remainingMinimum = Math.max(0, MIN_LOADER_DURATION - elapsed);

    const timer = setTimeout(() => {
      initialLoaderDoneRef.current = true;
      setIsLoaderActive(false);
    }, remainingMinimum);
    return () => clearTimeout(timer);
  }, [isHeroReady]);

  useEffect(() => {
    if (isHeroReady) return;

    const fallbackTimer = setTimeout(() => {
      setIsHeroReady(true);
    }, 10000);

    return () => clearTimeout(fallbackTimer);
  }, [pathname, isHeroReady]);

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
    loaderStartedAtRef.current = Date.now();
    routeStartPathRef.current = pathname;
    setIsLoaderActive(true);
    setIsRouteChanging(true);

    // 2. Wait for slide-down animation to complete, then change language and route
    setTimeout(() => {
      setLang(next);
      sessionStorage.setItem('preferredLang', next);
      router.replace(newPath);
    }, 800);
  };

  const navigateWithLoader = (path) => {
    if (!path || pathname === path) return;

    loaderStartedAtRef.current = Date.now();
    routeStartPathRef.current = pathname;
    setIsHeroReady(false);
    setIsLoaderActive(true);
    setIsRouteChanging(true);

    setTimeout(() => {
      router.push(path);
    }, 250);
  };

  const markHeroReady = useCallback(() => {
    setIsHeroReady(true);
  }, []);

  useEffect(() => {
    if (!isRouteChanging) return;
    if (pathname === routeStartPathRef.current) return;
    if (!isHeroReady) return;

    let rafOne;
    let rafTwo;
    let timer;

    rafOne = requestAnimationFrame(() => {
      rafTwo = requestAnimationFrame(() => {
        const elapsed = Date.now() - loaderStartedAtRef.current;
        const remainingMinimum = Math.max(0, MIN_LOADER_DURATION - elapsed);

        timer = setTimeout(() => {
          routeStartPathRef.current = null;
          setIsRouteChanging(false);
          setIsLoaderActive(false);
        }, remainingMinimum);
      });
    });

    return () => {
      cancelAnimationFrame(rafOne);
      cancelAnimationFrame(rafTwo);
      clearTimeout(timer);
    };
  }, [pathname, isRouteChanging, isHeroReady]);

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
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, navigateWithLoader, markHeroReady, t, isLoaderActive }}>
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
