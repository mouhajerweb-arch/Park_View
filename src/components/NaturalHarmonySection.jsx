'use client';
import React, { useEffect, useRef } from 'react';
import { Box, Typography, Grid2 as Grid } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { optimizedImageUrl } from '../sanity/client';

gsap.registerPlugin(ScrollTrigger);

// Custom SVG Icons for the 6 features
const FeatureIcon = ({ type }) => {
  const strokeColor = '#3D362E';
  const strokeWidth = '1.8';
  
  switch (type) {
    case 'garden':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 0 0-10 10c0 5.523 4.477 10 10 10s10-4.477 10-10A10 10 0 0 0 12 2z" />
          <path d="M12 6a6 6 0 0 0-6 6c0 3.314 2.686 6 6 6s6-2.686 6-6a6 6 0 0 0-6-6z" />
          <circle cx="12" cy="12" r="2" fill={strokeColor} />
        </svg>
      );
    case 'lake':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 6c3.2 0 3.2 2 6.4 2s3.2-2 6.4-2 3.2 2 6.4 2" />
          <path d="M2 12c3.2 0 3.2 2 6.4 2s3.2-2 6.4-2 3.2 2 6.4 2" />
          <path d="M2 18c3.2 0 3.2 2 6.4 2s3.2-2 6.4-2 3.2 2 6.4 2" />
        </svg>
      );
    case 'fitness':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <line x1="6" y1="12" x2="18" y2="12" />
          <line x1="6" y1="9" x2="6" y2="15" />
          <line x1="3" y1="10" x2="3" y2="14" />
          <line x1="18" y1="9" x2="18" y2="15" />
          <line x1="21" y1="10" x2="21" y2="14" />
        </svg>
      );
    case 'meditation':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="2.5" />
          <path d="M12 8c-2.5 0-4.5 1.5-4.5 4v4h9v-4c0-2.5-2-4-4.5-4z" />
          <path d="M6 20h12M9 16c-1 0-2 1-2 2v2M15 16c1 0 2 1 2 2v2" />
        </svg>
      );
    case 'terrace':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 21V10h16v11" />
          <path d="M2 10h20M12 4v6" />
          <circle cx="12" cy="3" r="1.5" />
        </svg>
      );
    case 'walking':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13" cy="4" r="2" />
          <path d="M13 8l-2 4-2 4m4-8h-3l-2 3M8 12h2v4l3 5" />
        </svg>
      );
    default:
      return null;
  }
};

export default function NaturalHarmonySection({ sectionData }) {
  const { t, lang } = useLanguage();
  
  const sectionRef = useRef(null);
  const textColRef = useRef(null);
  const titleRef = useRef(null);
  const pRef = useRef(null);
  const listRef = useRef(null);
  
  const largeImgColRef = useRef(null);
  const largeImgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal of text and list items
      gsap.fromTo(
        [titleRef.current, pRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textColRef.current,
            start: 'top 75%',
          },
        }
      );

      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Large image zoom reveal
      gsap.fromTo(
        largeImgRef.current,
        { scale: 1.05, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: largeImgColRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  const nh = t.naturalHarmony;
  const displayTitle = sectionData?.title?.[lang] || sectionData?.title?.en || nh.title;
  const displayParagraph = sectionData?.paragraph?.[lang] || sectionData?.paragraph?.en || nh.paragraph;
  const displayBullets = sectionData?.bullets?.length
    ? sectionData.bullets.map((bullet) => ({
        icon: bullet.icon,
        iconImageUrl: optimizedImageUrl(bullet.iconImageUrl, { width: 96, quality: 90 }),
        label: bullet.label?.[lang] || bullet.label?.en || '',
      })).filter((bullet) => bullet.label)
    : nh.bullets;
  const displayImage = optimizedImageUrl(sectionData?.largeImageUrl, { width: 1400 }) || "/images/harmony-pool.jpg";

  return (
    <Box
      id="natural-harmony"
      ref={sectionRef}
      sx={{
        width: '100%',
        minHeight: { xs: 'auto', md: '100vh' },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row-reverse' },
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#F6F2EC',
      }}
    >
      {/* Left Column: Copy & Icons Grid */}
      <Box
        ref={textColRef}
        sx={{
          width: { xs: '100%', md: '50%' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F6F2EC',
          py: { xs: 8, md: 6 },
          px: { xs: 4, sm: 8, md: 10, lg: 12 },
        }}
      >
        <Box sx={{ maxWidth: '580px', width: '100%' }}>
          {/* Title */}
          <Typography
            ref={titleRef}
            variant="h2"
            sx={{
              fontFamily: '"CS Brandis", serif',
              fontWeight: 300,
              fontSize: { xs: '2rem', sm: '2.4rem', md: '2.8rem', lg: '3.2rem' },
              lineHeight: 1.15,
              color: '#3D362E',
              mb: 4,
              textAlign: 'start',
              width: '100%',
              letterSpacing: '-0.01em',
            }}
          >
            {displayTitle}
          </Typography>

          {/* Description */}
          <Typography
            ref={pRef}
            variant="body1"
            sx={{
              fontFamily: '"Silka", sans-serif',
              fontWeight: 300,
              fontSize: { xs: '0.94rem', md: '1rem' },
              lineHeight: 1.85,
              color: '#6B6661',
              mb: 5,
              textAlign: 'start',
              width: '100%',
            }}
          >
            {displayParagraph}
          </Typography>

          {/* Grid of 6 icons features */}
          <Grid 
            ref={listRef} 
            container 
            spacing={3}
            sx={{ 
              flexDirection: lang === 'ar' ? 'row-reverse' : 'row' 
            }}
          >
            {displayBullets.map((bullet, idx) => (
              <Grid key={idx} size={6}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    flexDirection: lang === 'ar' ? 'row-reverse' : 'row',
                    textAlign: lang === 'ar' ? 'right' : 'left',
                  }}
                >
                  <Box
                    sx={{
                      // width: 40,
                      // height: 40,
                      borderRadius: '50%',
                      // backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      // boxShadow: '0 4px 10px rgba(61, 54, 46, 0.03)',
                      // border: '1px solid #EAE5DE',
                      flexShrink: 0
                    }}
                  >
                    {bullet.iconImageUrl ? (
                      <Box
                        component="img"
                        src={bullet.iconImageUrl}
                        alt=""
                        aria-hidden="true"
                        sx={{
                          width: 40,
                          height: 40,
                          objectFit: 'contain',
                          display: 'block',
                        }}
                      />
                    ) : (
                      <FeatureIcon type={bullet.icon} />
                    )}
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: '"Silka", sans-serif',
                      fontWeight: 500,
                      fontSize: '0.92rem',
                      color: '#3D362E',
                    }}
                  >
                    {bullet.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Right Column: Full-Bleed Image */}
      <Box
        ref={largeImgColRef}
        sx={{
          width: { xs: '100%', md: '50%' },
          height: { xs: '450px', md: 'auto' },
          alignSelf: 'stretch',
          overflow: 'hidden',
          position: 'relative',
          padding: 0,
          margin: 0,
        }}
      >
        <Box
          ref={largeImgRef}
          component="img"
          src={displayImage}
          alt="Life lived in natural harmony swimming pool view"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            padding: 0,
            margin: 0,
          }}
        />
      </Box>

      {/* Page index vertical label */}
      {/* <Box className="side-tab-bar">
        <Typography className="side-tab-title">
          {nh.sideBrand}
        </Typography>
        <Typography className="side-tab-number">
          {nh.pageNo}
        </Typography>
      </Box> */}
    </Box>
  );
}
