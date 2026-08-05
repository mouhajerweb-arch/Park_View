'use client';
import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { optimizedImageUrl } from '../sanity/client';

export default function SubpageHero({ bgImage, titleEn, titleAr, subtitleEn, subtitleAr }) {
  const { lang, markHeroReady } = useLanguage();
  const textRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const displayBgImage = bgImage ? optimizedImageUrl(bgImage, { width: 2200, quality: 84 }) : '';

  useEffect(() => {
    if (!displayBgImage) return;

    const image = new Image();
    image.onload = () => markHeroReady();
    image.onerror = () => markHeroReady();
    image.src = displayBgImage;
  }, [displayBgImage, markHeroReady]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Elegant fade & slide up for text content
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.4, 
          stagger: 0.2, 
          ease: 'power4.out' 
        }
      );

      // Bounce scroll indicator
      gsap.fromTo(
        scrollIndicatorRef.current,
        { y: 0 },
        { y: 8, duration: 1.2, repeat: -1, yoyo: true, ease: 'power1.inOut' }
      );
    }, textRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '80vh', sm: '100vh', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#1E1A16',
      }}
    >
      {/* Zoomed background image for luxury texture */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${displayBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1,
          transform: 'scale(1.03)',
        }}
      />

      {/* Dark editorial tint & vignette overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          // backgroundColor: 'rgba(30, 26, 22, 0.45)',
          backgroundImage: 'linear-gradient(to bottom, rgba(30, 26, 22, 0.3) 0%, rgba(30, 26, 22, 0.75) 100%)',
          zIndex: 2,
        }}
      />

      {/* Center-Aligned Editorial Content */}
      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          color: '#FFFFFF',
          px: 3,
        }}
      >
        <Box 
          ref={textRef} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' 
          }}
        >
          {/* Subtitle with gold borders */}
          <Typography
            sx={{
              fontFamily: '"Guise", sans-serif',
              fontSize: { xs: '11px', sm: '13px' },
              fontWeight: 500,
              letterSpacing: '0.2em',
              color: '#ffffff',
              textTransform: 'uppercase',
              mb: 2.5,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.5,
              '&::before, &::after': {
                content: '""',
                width: '16px',
                height: '1px',
                backgroundColor: 'rgba(200, 190, 176, 0.4)'
              }
            }}
          >
            {lang === 'ar' ? subtitleAr : subtitleEn}
          </Typography>

          {/* Golden Horizontal Accent Divider */}
          <Box 
            sx={{ 
              width: '45px', 
              height: '1.5px', 
              backgroundColor: '#7C7368', 
              mb: 3.5 
            }} 
          />

          {/* Large Editorial Headline */}
          <Typography
            variant="h1"
            sx={{
              fontFamily: '"CS Brandis", serif',
              fontSize: { xs: '3.4rem', sm: '4.4rem', md: '5.2rem' },
              fontWeight: 300,
              lineHeight: 1.15,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              textShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}
          >
            {lang === 'ar' ? titleAr : titleEn}
          </Typography>
        </Box>
      </Container>

      {/* <Box
        ref={scrollIndicatorRef}
        sx={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          opacity: 0.85
        }}
      >
        <Box
          sx={{
            width: '18px',
            height: '28px',
            borderRadius: '10px',
            border: '1.5px solid rgba(255, 255, 255, 0.65)',
            display: 'flex',
            justifyContent: 'center',
            p: '4px'
          }}
        >
          <Box
            sx={{
              width: '3px',
              height: '6px',
              backgroundColor: '#FFFFFF',
              borderRadius: '50%'
            }}
          />
        </Box>
      </Box> */}
    </Box>
  );
}
