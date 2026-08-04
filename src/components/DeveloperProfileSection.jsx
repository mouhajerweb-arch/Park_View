'use client';
import React, { useEffect, useRef } from 'react';
import { Box, Container, Grid2 as Grid, Typography } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import LearnMoreLink from './LearnMoreLink';

gsap.registerPlugin(ScrollTrigger);

export default function DeveloperProfileSection() {
  const { t, lang } = useLanguage();

  const sectionRef = useRef(null);
  const imageBoxRef = useRef(null);
  const contentColRef = useRef(null);
  const quoteBoxRef = useRef(null);
  const sectorsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal: Clip-path slide up and subtle zoom
      gsap.fromTo(
        imageBoxRef.current,
        {
          opacity: 0,
          clipPath: 'inset(100% 0% 0% 0%)',
          scale: 1.05
        },
        {
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          duration: 1.6,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: imageBoxRef.current,
            start: 'top 80%',
          },
        }
      );

      // Text elements reveal
      if (contentColRef.current) {
        gsap.fromTo(
          contentColRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      }

      // Quote box reveal
      if (quoteBoxRef.current) {
        gsap.fromTo(
          quoteBoxRef.current,
          { opacity: 0, scale: 0.98 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: quoteBoxRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      // Sectors grid reveal
      if (sectorsRef.current) {
        gsap.fromTo(
          sectorsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectorsRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const dp = t.developerProfile;

  const coreSectors = [
    { title: dp.constructionTitle, desc: dp.constructionDesc },
    { title: dp.realEstateTitle, desc: dp.realEstateDesc },
    { title: dp.hospitalityTitle, desc: dp.hospitalityDesc },
    { title: dp.retailTitle, desc: dp.retailDesc }
  ];

  return (
    <Box
      id="developer-profile"
      ref={sectionRef}
      className="brochure-section"
      sx={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#FFFFFF', // High-end white background
        py: { xs: 8, md: 16 },
        px: { xs: 3, sm: 6, md: 10, lg: 12 },
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid rgba(61, 54, 46, 0.05)',
      }}
    >
      <Container maxWidth="xl" sx={{ pr: { md: 8 } }}>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 6, md: 8, lg: 12 },
            alignItems: 'flex-start',
            width: '100%'
          }}
        >
          {/* Left Column: Project Architecture Facade & Biography Footer Text */}
          <Box sx={{ width: { xs: '100%', md: '41.666667%' } }}>
            <Box
              ref={imageBoxRef}
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              {/* Premium Framed Architectural Rendering */}
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: '100%', sm: '380px', md: '100%' },
                  aspectRatio: '3/4',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 50px rgba(61, 54, 46, 0.06)',
                  border: '1px solid rgba(61, 54, 46, 0.1)',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 15,
                    left: 15,
                    right: 15,
                    bottom: 15,
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    borderRadius: '8px',
                    pointerEvents: 'none',
                    zIndex: 2
                  }
                }}
              >
                <Box
                  component="img"
                  src="/images/prestige-tranquility.jpg"
                  alt="Park View Residential Facade"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </Box>

              {/* Portrait Caption */}
              <Box sx={{ mt: 3.5, mb: 4, textAlign: 'start', width: '100%' }}>
                <Typography
                  sx={{
                    fontFamily: '"CS Brandis", serif',
                    fontSize: '1.35rem',
                    fontWeight: 500,
                    color: '#3D362E',
                    lineHeight: 1.2,
                    textAlign: 'start',
                    width: '100%',
                  }}
                >
                  {lang === 'ar' ? 'التصميم المعماري والمساحات الخضراء' : 'Architecture & Landscaping'}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Silka", sans-serif',
                    fontSize: '0.82rem',
                    fontWeight: 400,
                    letterSpacing: '0.12em',
                    color: '#9E978E',
                    textTransform: 'uppercase',
                    mt: 0.5,
                    textAlign: 'start',
                    width: '100%',
                  }}
                >
                  {lang === 'ar' ? 'مجمع بارك فيو السكني' : 'Park View Yaafour'}
                </Typography>
              </Box>

              {/* Biography Footer Narrative (Moved here to balance columns height) */}
              <Typography
                variant="body1"
                sx={{
                  fontFamily: '"Silka", sans-serif',
                  fontWeight: 300,
                  fontSize: '0.94rem',
                  lineHeight: 1.8,
                  color: '#6B6661',
                  maxWidth: '440px',
                  whiteSpace: 'pre-line',
                  textAlign: 'start',
                  width: '100%',
                }}
              >
                {dp.footerText}
              </Typography>
            </Box>

            <LearnMoreLink path="/about" bg="#FFFFFF" />
          </Box>

          {/* Right Column: Editorial Text & Timeline List */}
          <Box sx={{ width: { xs: '100%', md: '58.333333%' } }}>
            <Box
              ref={contentColRef}
              sx={{
                textAlign: 'start',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
              }}
            >
              {/* Division Subtitle */}
              <Typography
                sx={{
                  fontFamily: '"Silka", sans-serif',
                  fontSize: { xs: '11px', sm: '13px' },
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  color: '#7C7368',
                  textTransform: 'uppercase',
                  mb: 1.5,
                  textAlign: 'start',
                  width: '100%',
                }}
              >
                {dp.subtitle}
              </Typography>

              {/* Founder Header Title */}
              <Typography
                variant="h2"
                sx={{
                  fontFamily: '"CS Brandis", serif',
                  fontWeight: 300,
                  fontSize: { xs: '1.9rem', sm: '2.4rem', md: '2.9rem' },
                  lineHeight: 1.2,
                  color: '#3D362E',
                  mb: 4,
                  textAlign: 'start',
                  width: '100%',
                }}
              >
                {dp.title}
              </Typography>

              {/* Main Narrative Paragraph */}
              <Typography
                variant="body1"
                sx={{
                  fontFamily: '"Silka", sans-serif',
                  fontWeight: 300,
                  fontSize: { xs: '0.96rem', md: '1.025rem' },
                  lineHeight: 1.85,
                  color: '#6B6661',
                  mb: 5,
                  whiteSpace: 'pre-line',
                  textAlign: 'start',
                  width: '100%',
                }}
              >
                {dp.description}
              </Typography>

              {/* Creative Vision Quote Block */}
              <Box
                ref={quoteBoxRef}
                sx={{
                  borderLeft: lang === 'ar' ? 'none' : '2px solid #7C7368',
                  borderRight: lang === 'ar' ? '2px solid #7C7368' : 'none',
                  pl: lang === 'ar' ? 0 : 4,
                  pr: lang === 'ar' ? 4 : 0,
                  py: 0.5,
                  mb: 6,
                  textAlign: 'start',
                  width: '100%',
                  backgroundColor: '#f9f9f8',
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"CS Brandis", serif',
                    fontStyle: 'italic',
                    fontSize: { xs: '1.15rem', md: '1.35rem' },
                    color: '#3D362E',
                    lineHeight: 1.5,
                    mb: 1.5,
                    textAlign: 'start',
                    width: '100%',
                  }}
                >
                  {dp.quoteText}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Silka", sans-serif',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    color: '#9E978E',
                    textTransform: 'uppercase',
                    textAlign: 'start',
                    width: '100%',
                  }}
                >
                  {dp.quoteAuthor}
                </Typography>
              </Box>

              <Grid
                ref={sectorsRef}
                container
                spacing={{ xs: 4, sm: 5 }}
                sx={{ width: '100%' }}
              >
                {coreSectors.map((sector, idx) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                    <Box sx={{ width: '100%', textAlign: 'start' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                        {/* Number bullet */}
                        <Typography
                          sx={{
                            fontFamily: '"CS Brandis", serif',
                            fontSize: '1.15rem',
                            fontWeight: 300,
                            color: '#7C7368',
                          }}
                        >
                          {String(idx + 1).padStart(2, '0')}.
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{
                            fontFamily: '"Guise", sans-serif',
                            fontSize: '1.05rem',
                            fontWeight: 600,
                            letterSpacing: '0.02em',
                            color: '#3D362E',
                            textAlign: 'start',
                          }}
                        >
                          {sector.title}
                        </Typography>
                      </Box>

                      {/* Description */}
                      <Typography
                        sx={{
                          fontFamily: '"Silka", sans-serif',
                          fontSize: '0.88rem',
                          fontWeight: 300,
                          lineHeight: 1.6,
                          color: '#6B6661',
                          textAlign: 'start',
                          width: '100%',
                        }}
                      >
                        {sector.desc}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
