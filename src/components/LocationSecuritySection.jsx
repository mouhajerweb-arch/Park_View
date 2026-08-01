'use client';
import React, { useEffect, useRef } from 'react';
import { Box, Container, Grid2 as Grid, Typography } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const CheckIcon = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="#3D362E" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={{ flexShrink: 0, marginTop: '4px' }}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function LocationSecuritySection() {
  const { t, lang } = useLanguage();
  
  const sectionRef = useRef(null);
  const mainTitleRef = useRef(null);
  
  const row1ImageRef = useRef(null);
  const row1TextRef = useRef(null);
  
  const row2ImageRef = useRef(null);
  const row2TextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main section title animation
      gsap.fromTo(
        mainTitleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Row 1 - Strategic Location
      gsap.fromTo(
        row1ImageRef.current,
        { opacity: 0, scale: 0.97, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row1ImageRef.current,
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        row1TextRef.current,
        { opacity: 0, x: lang === 'ar' ? -30 : 30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row1ImageRef.current,
            start: 'top 80%',
          },
        }
      );

      // Row 2 - Security & Accessibility
      gsap.fromTo(
        row2ImageRef.current,
        { opacity: 0, scale: 0.97, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row2ImageRef.current,
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        row2TextRef.current,
        { opacity: 0, x: lang === 'ar' ? -30 : 30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row2ImageRef.current,
            start: 'top 80%',
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <Box
      id="location-features"
      ref={sectionRef}
      className="brochure-section"
      sx={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#F6F2EC', // Luxury brochure beige
        py: { xs: 8, md: 14 },
        px: { xs: 3, sm: 6, md: 10, lg: 12 },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container maxWidth="xl" sx={{ pr: { md: 8 } }}>
        {/* Section Heading */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography
            ref={mainTitleRef}
            variant="h2"
            sx={{
              fontFamily: '"CS Brandis", serif',
              fontWeight: 300,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
              lineHeight: 1.15,
              color: '#3D362E',
              textAlign: lang === 'ar' ? 'right' : 'left',
              letterSpacing: '-0.01em',
            }}
          >
            {t.locationSecurity.title}
          </Typography>
        </Box>

        {/* Content Rows */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 8, md: 10 } }}>
          
          {/* Row 1: Strategic Location */}
          <Grid 
            container 
            spacing={{ xs: 4, md: 6, lg: 8 }} 
            alignItems="center"
            sx={{ flexDirection: lang === 'ar' ? 'row-reverse' : 'row' }}
          >
            {/* Left Column: Image */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Box
                ref={row1ImageRef}
                sx={{
                  width: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(43, 40, 37, 0.06)',
                  position: 'relative',
                  aspectRatio: { xs: '16/10', md: '16/9' },
                }}
              >
                <Box
                  component="img"
                  src="/images/location-strategic.jpg"
                  alt="Strategic Location roundabout view"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </Box>
            </Grid>

            {/* Right Column: Text Content */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box ref={row1TextRef} sx={{ maxWidth: '500px' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"CS Brandis", serif',
                    fontWeight: 400,
                    fontSize: { xs: '1.6rem', sm: '1.85rem', md: '2.1rem' },
                    color: '#3D362E',
                    mb: 3,
                    textAlign: lang === 'ar' ? 'right' : 'left',
                  }}
                >
                  {t.locationSecurity.strategicTitle}
                </Typography>

                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 2,
                    textAlign: lang === 'ar' ? 'right' : 'left',
                  }}
                >
                  {t.locationSecurity.strategicBullets.map((bullet, i) => (
                    <Box 
                      key={i} 
                      sx={{ 
                        display: 'flex', 
                        gap: 2, 
                        alignItems: 'flex-start',
                        flexDirection: lang === 'ar' ? 'row-reverse' : 'row',
                      }}
                    >
                      <CheckIcon />
                      <Typography
                        sx={{
                          fontFamily: '"Silka", sans-serif',
                          fontWeight: 300,
                          fontSize: { xs: '0.92rem', md: '0.98rem' },
                          lineHeight: 1.6,
                          color: '#6B6661',
                        }}
                      >
                        {bullet}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Row 2: Security & Accessibility */}
          <Grid 
            container 
            spacing={{ xs: 4, md: 6, lg: 8 }} 
            alignItems="center"
            sx={{ flexDirection: lang === 'ar' ? 'row-reverse' : 'row' }}
          >
            {/* Left Column: Image */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Box
                ref={row2ImageRef}
                sx={{
                  width: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(43, 40, 37, 0.06)',
                  position: 'relative',
                  aspectRatio: { xs: '16/10', md: '16/9' },
                }}
              >
                <Box
                  component="img"
                  src="/images/location-security.jpg"
                  alt="Security and gated community accessibility"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </Box>
            </Grid>

            {/* Right Column: Text Content */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box ref={row2TextRef} sx={{ maxWidth: '500px' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"CS Brandis", serif',
                    fontWeight: 400,
                    fontSize: { xs: '1.6rem', sm: '1.85rem', md: '2.1rem' },
                    color: '#3D362E',
                    mb: 3,
                    textAlign: lang === 'ar' ? 'right' : 'left',
                  }}
                >
                  {t.locationSecurity.securityTitle}
                </Typography>

                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 2,
                    textAlign: lang === 'ar' ? 'right' : 'left',
                  }}
                >
                  {t.locationSecurity.securityBullets.map((bullet, i) => (
                    <Box 
                      key={i} 
                      sx={{ 
                        display: 'flex', 
                        gap: 2, 
                        alignItems: 'flex-start',
                        flexDirection: lang === 'ar' ? 'row-reverse' : 'row',
                      }}
                    >
                      <CheckIcon />
                      <Typography
                        sx={{
                          fontFamily: '"Silka", sans-serif',
                          fontWeight: 300,
                          fontSize: { xs: '0.92rem', md: '0.98rem' },
                          lineHeight: 1.6,
                          color: '#6B6661',
                        }}
                      >
                        {bullet}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>

        </Box>
      </Container>

      {/* Brochure Side Tab Bar (Rotated Text Label & Page index) */}
      <Box className="side-tab-bar">
        <Typography className="side-tab-title">
          {t.locationSecurity.sideBrand}
        </Typography>
        <Typography className="side-tab-number">
          {t.locationSecurity.pageNo}
        </Typography>
      </Box>
    </Box>
  );
}
