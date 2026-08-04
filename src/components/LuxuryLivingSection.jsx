'use client';
import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import gsap from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function LuxuryLivingSection({ sectionData }) {
  const { t, lang } = useLanguage();
  
  // React Hook declarations
  const sectionRef = React.useRef(null);
  const textColRef = React.useRef(null);
  const titleRef = React.useRef(null);
  const pRef = React.useRef(null);
  const statsRef = React.useRef(null);
  
  const largeImgColRef = React.useRef(null);
  const largeImgRef = React.useRef(null);

  React.useEffect(() => {
    // Import gsap inside useEffect dynamically to avoid pre-render issues if any,
    // although we already have it in client components.
    const gsapModule = require('gsap');
    const ScrollTriggerModule = require('gsap/ScrollTrigger');
    gsapModule.gsap.registerPlugin(ScrollTriggerModule.ScrollTrigger);
    const gsap = gsapModule.gsap;

    const ctx = gsap.context(() => {
      // Text column reveal
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

      // Stats staggered fade-in
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
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

  const ll = t.luxuryLiving;
  const displayTitle = sectionData?.title?.[lang] || sectionData?.title?.en || ll.title;
  const displayParagraph = sectionData?.paragraph?.[lang] || sectionData?.paragraph?.en || ll.paragraph;
  const displayStats = sectionData?.stats?.length
    ? sectionData.stats.map((stat) => ({
        num: stat.value,
        label: stat.label?.[lang] || stat.label?.en || '',
      }))
    : ll.stats;
  const displayImage = sectionData?.largeImageUrl || "/images/luxury-entry.jpg";

  return (
    <Box
      id="luxury-living"
      ref={sectionRef}
      sx={{
        width: '100%',
        minHeight: { xs: 'auto', md: '100vh' },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#F6F2EC',
      }}
    >
      {/* Left Column: Text and Stats */}
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

          {/* Paragraph */}
          <Typography
            ref={pRef}
            variant="body1"
            sx={{
              fontFamily: '"Silka", sans-serif',
              fontWeight: 300,
              fontSize: { xs: '0.94rem', md: '1rem' },
              lineHeight: 1.85,
              color: '#6B6661',
              mb: 6,
              textAlign: 'start',
              width: '100%',
            }}
          >
            {displayParagraph}
          </Typography>

          {/* Stats Box */}
          <Box
            ref={statsRef}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              textAlign: 'start',
              width: '100%',
            }}
          >
            {displayStats.map((stat, idx) => (
              <Box key={idx} sx={{ width: '100%', textAlign: 'start' }}>
                <Typography
                  sx={{
                    fontFamily: '"CS Brandis", serif',
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                    fontWeight: 300,
                    color: '#3D362E',
                    lineHeight: 1,
                    mb: 0.5,
                    textAlign: 'start',
                    width: '100%',
                  }}
                >
                  {stat.num}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Silka", sans-serif',
                    fontSize: '0.9rem',
                    fontWeight: 300,
                    color: '#7C7368',
                    textAlign: 'start',
                    width: '100%',
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Right Column: Full-Bleed Gated Entry Night View */}
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
          alt="Gated community night entry view rendering"
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
          {ll.sideBrand}
        </Typography>
        <Typography className="side-tab-number">
          {ll.pageNo}
        </Typography>
      </Box> */}
    </Box>
  );
}
