'use client';
import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function PrestigeSection() {
  const { t, lang } = useLanguage();

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
        }
      );

      // Fade in body narrative
      gsap.fromTo(
        bodyRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 85%',
          },
        }
      );

      // Slide and scale image
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.05, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <Box
      id="prestige-intro"
      ref={sectionRef}
      className="brochure-section"
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#F6F2EC', // Luxury beige matching brochure
        py: { xs: 8, md: 12 },
        px: { xs: 3, sm: 6, md: 10, lg: 12 },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="xl" sx={{ pr: { md: 6 } }}>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 6, md: 8, lg: 10 },
            alignItems: 'center',
            width: '100%'
          }}
        >
          {/* Left Column: Text Content */}
          <Box sx={{ width: { xs: '100%', md: '45%' }, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ maxWidth: '540px', textAlign: 'start', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography
                ref={headingRef}
                variant="h2"
                sx={{
                  fontFamily: '"CS Brandis", serif',
                  fontWeight: 600,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '2.85rem', lg: '3.25rem' },
                  lineHeight: 1.15,
                  color: '#2B2825',
                  mb: { xs: 3, md: 5 },
                  letterSpacing: '-0.02em',
                  textAlign: 'start',
                  width: '100%',
                }}
              >
                {t.prestige.headingLine1}
                <br />
                {t.prestige.headingLine2}
                <br />
                {t.prestige.headingLine3}
              </Typography>

              <Typography
                ref={bodyRef}
                variant="body1"
                sx={{
                  fontFamily: '"Silka", sans-serif',
                  fontWeight: 300,
                  fontSize: { xs: '0.95rem', md: '1.025rem' },
                  lineHeight: 1.85,
                  color: '#6B6661',
                  textAlign: 'start',
                  width: '100%',
                }}
              >
                {t.prestige.body}
              </Typography>
            </Box>
          </Box>

          {/* Right Column: High-Res Render Image */}
          <Box sx={{ width: { xs: '100%', md: '55%' } }}>
            <Box
              ref={imageRef}
              sx={{
                width: '100%',
                maxHeight: { xs: '450px', md: '680px' },
                height: 'auto',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(43, 40, 37, 0.08)',
                position: 'relative',
              }}
            >
              <Box
                component="img"
                src="/images/prestige-tranquility.jpg"
                alt="Park View Yaafour Garden Promenade"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
