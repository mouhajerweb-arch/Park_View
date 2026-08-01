'use client';
import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';

export default function PageLoader() {
  const { isLoaderActive } = useLanguage();
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const logoRef = useRef(null);
  const progressRef = useRef(null);
  const isFirstRender = useRef(true);

  // Sync scroll lock and Lenis smooth scrolling with loader state
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Lock native scroll when loader is active
    if (isLoaderActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Lock/Unlock Lenis smooth scroll
    const checkLenis = setInterval(() => {
      if (window.lenis) {
        if (isLoaderActive) {
          window.lenis.stop();
        } else {
          window.lenis.start();
          clearInterval(checkLenis);
        }
      }
    }, 50);

    return () => clearInterval(checkLenis);
  }, [isLoaderActive]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isLoaderActive) {
        // Ensure container is visible and active when loader is active
        gsap.set(containerRef.current, { visibility: 'visible', yPercent: 0 });

        if (isFirstRender.current) {
          // Initial mount: cover screen and play slow cinematic logo reveal
          isFirstRender.current = false;
          gsap.set(logoRef.current, {
            opacity: 0,
            scale: 1.35,
            y: -40,
            filter: 'blur(15px) drop-shadow(0 0 0px rgba(0,0,0,0))',
          });
          gsap.set(progressRef.current, { scaleX: 0 });

          const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

          // Cinematic logo "landing" (animating from initial styled CSS state)
          tl.to(logoRef.current, {
            opacity: 1,
            scale: 1.0,
            y: 0,
            filter: 'blur(0px) drop-shadow(0 15px 35px rgba(0,0,0,0.6))',
            duration: 1.8,
          }, 0.1);

          // Symmetric progress line growing outward from center
          tl.to(progressRef.current, {
            scaleX: 1,
            duration: 1.2,
            ease: 'power2.inOut',
          }, '-=1.2');

        } else {
          // Language toggle: Snap to visible instantly (no sliding down from top)
          gsap.set(logoRef.current, {
            opacity: 0,
            scale: 1.25,
            y: -25,
            filter: 'blur(10px) drop-shadow(0 0 0px rgba(0,0,0,0))',
          });
          gsap.set(progressRef.current, { scaleX: 0 });

          // Play a quick cinematic reveal animation immediately on snap
          const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
          tl.to(logoRef.current, {
            opacity: 1,
            scale: 1.0,
            y: 0,
            filter: 'blur(0px) drop-shadow(0 15px 35px rgba(0,0,0,0.6))',
            duration: 0.9,
          }, 0.05);
          
          tl.to(progressRef.current, {
            scaleX: 1,
            duration: 0.7,
            ease: 'power2.inOut',
          }, '-=0.6');
        }
      } else {
        // Slide up (bottom to top) to reveal content
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => {
            // Completely hide container to avoid interception of clicks & render overhead
            gsap.set(containerRef.current, { visibility: 'hidden' });
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaderActive]);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0c1d15', // Fallback deep green color matching image to prevent white-flash glitch
        transform: 'translateY(0%)', // Start fully visible
      }}
    >
      {/* Background Wrapper (Static, no scale animations) */}
      <Box
        ref={bgRef}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          backgroundColor: '#0c1d15', // Deep green fallback background
          backgroundImage: `linear-gradient(rgba(12, 16, 14, 0.45), rgba(12, 16, 14, 0.45)), url('/images/loader-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Central Logo Container */}
      <Box
        ref={logoRef}
        component="img"
        src="/images/park-view-full-logo.png"
        alt="PARK VIEW Logo"
        sx={{
          width: { xs: '260px', sm: '380px', md: '440px' },
          maxWidth: '85vw',
          mb: 4,
          willChange: 'transform, opacity, filter',
          // Initial style state: hidden, blurred, scaled, and translated up.
          // This prevents the logo from flashing on the screen before JS/GSAP starts.
          opacity: 0,
          transform: 'translateY(-40px) scale(1.35)',
          filter: 'blur(15px) drop-shadow(0 0 0px rgba(0,0,0,0))',
        }}
      />

      {/* Thin Premium Progress Bar */}
      <Box
        sx={{
          width: '140px',
          height: '2px',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '2px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          ref={progressRef}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#E6D5C3', // Warm premium gold/ivory color matching brochure
            transformOrigin: 'center center', // Cinematic symmetric growth
            transform: 'scaleX(0)', // Starts hidden. Prevents pre-animation flash.
          }}
        />
      </Box>
    </Box>
  );
}
