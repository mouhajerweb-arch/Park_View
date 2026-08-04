'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import { client } from '../sanity/client';

export default function LuxuryLivingSection() {
  const { t, lang } = useLanguage();
  
  const sectionRef = useRef(null);
  const textColRef = useRef(null);
  const titleRef = useRef(null);
  const pRef = useRef(null);
  const statsRef = useRef(null);
  
  const largeImgColRef = useRef(null);
  const largeImgRef = useRef(null);

  const [secData, setSecData] = useState(null);

  useEffect(() => {
    let active = true;
    client
      .fetch(`*[_type == "locationPage" && _id == "locationPage"][0].sections[_type == "luxuryLivingSection"][0] {
        ...,
        "largeImageUrl": largeImage.asset->url
      }`)
      .then((data) => {
        if (active && data) {
          setSecData(data);
        }
      })
      .catch((err) => console.warn('Error fetching luxury living section data:', err));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    // Import gsap inside useEffect dynamically to avoid pre-render issues
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
            duration: 0.7,
            stagger: 0.1,
            delay: 0.4,
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
  }, [lang, secData]);

  const ll = t.luxuryLiving;

  // Resolve dynamic values
  const displayTitle = secData?.title?.[lang] || secData?.title?.en || ll.title;
  const displayParagraph = secData?.paragraph?.[lang] || secData?.paragraph?.en || ll.paragraph;
  const displayLargeImg = secData?.largeImageUrl || "/images/curated-garden.jpg";

  const defaultStats = [
    { value: '50K', label: ll.stat1Label },
    { value: '30K', label: ll.stat2Label },
    { value: '3', label: ll.stat3Label },
  ];
  const displayStats = secData?.stats && secData.stats.length > 0
    ? secData.stats.map(s => ({
        value: s.value,
        label: s.label?.[lang] || s.label?.en || ''
      }))
    : defaultStats;

  return (
    <Box
      id="luxury-narrative"
      ref={sectionRef}
      sx={{
        width: '100%',
        minHeight: { xs: 'auto', md: '100vh' },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Left Column: Text & Stats */}
      <Box
        ref={textColRef}
        sx={{
          width: { xs: '100%', md: '50%' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          py: { xs: 8, md: 6 },
          px: { xs: 4, sm: 8, md: 10, lg: 12 },
        }}
      >
        <Box sx={{ maxWidth: '580px', width: '100%' }}>
          {/* Section Heading */}
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

          {/* Narrative Paragraph */}
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

          {/* Key Stats Counter Grid */}
          <Box
            ref={statsRef}
            sx={{
              display: 'flex',
              gap: { xs: 4, sm: 6 },
              width: '100%',
              flexDirection: lang === 'ar' ? 'row-reverse' : 'row',
              justifyContent: 'flex-start',
            }}
          >
            {displayStats.map((stat, idx) => (
              <Box 
                key={idx} 
                sx={{ 
                  textAlign: 'start',
                  minWidth: '100px'
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"CS Brandis", serif',
                    fontSize: { xs: '2.5rem', md: '3.2rem' },
                    fontWeight: 300,
                    color: '#3D362E',
                    lineHeight: 1,
                    mb: 1.5,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Silka", sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: '#9E978E',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    lineHeight: 1.4,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Right Column: Full-Bleed Cover Image */}
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
          src={displayLargeImg}
          alt="Luxury living environment residential promenade rendering"
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

      {/* Brochure Side Tab Bar */}
      <Box className="side-tab-bar">
        <Typography className="side-tab-title">
          {ll.sideBrand}
        </Typography>
        <Typography className="side-tab-number">
          {ll.pageNo}
        </Typography>
      </Box>
    </Box>
  );
}
