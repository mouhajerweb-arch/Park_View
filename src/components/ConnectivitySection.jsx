'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Grid2 as Grid, Typography } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import LearnMoreLink from './LearnMoreLink';
import { client, urlFor } from '../sanity/client';

gsap.registerPlugin(ScrollTrigger);

const DestinationIcon = ({ type }) => {
  switch (type) {
    case 'monument':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)" stroke="#3D362E" strokeWidth="1.8" fill="none" />
          <circle cx="12" cy="12" r="2.2" fill="#3D362E" />
        </svg>
      );
    case 'hospital':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3D362E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18M5 21V7l7-4 7 4v14" />
          <path d="M9 12h6M12 9v6" />
        </svg>
      );
    case 'uptown':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3D362E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 21V4M4 8h5l4 8h7" />
          <circle cx="4" cy="4" r="1.5" fill="#3D362E" />
        </svg>
      );
    case 'mall':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3D362E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="9" width="16" height="12" rx="1" />
          <path d="M9 9V5a3 3 0 016 0v4M9 14h6" />
        </svg>
      );
    case 'stadium':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3D362E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10c0-3.3 4-6 9-6s9 2.7 9 6v7c0 3.3-4 6-9 6s-9-2.7-9-6v-7z" />
          <path d="M3 10v4c0 3.3 4 6 9 6s9-2.7 9-6v-4" />
          <path d="M8 7v10M16 7v10M12 4v16" />
        </svg>
      );
    case 'airport':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3D362E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 19h19M4 14l5-2.5 4.5 3.5 6-6-2.5-1-4 3-5-2-2 1.5 2 2.5-4 1z" />
        </svg>
      );
    default:
      return null;
  }
};

export default function ConnectivitySection({ sectionData }) {
  const { t, lang } = useLanguage();
  const sectionRef = useRef(null);
  const mapContainerRef = useRef(null);
  const textRef = useRef(null);
  const listRef = useRef(null);

  const [connectivityData, setConnectivityData] = useState(sectionData || null);

  useEffect(() => {
    if (sectionData) {
      setConnectivityData(sectionData);
      return;
    }

    let active = true;
    client
      .fetch(`*[_type == "page" && _id == "home"][0].sections[_type == "connectivitySection"][0]`)
      .then((data) => {
        if (active && data) {
          setConnectivityData(data);
        }
      })
      .catch((err) => console.warn('Error fetching connectivity section data:', err));
    return () => {
      active = false;
    };
  }, [sectionData]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        mapContainerRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.06,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [t]);

  const labels = t.connectivity.mapLabels;

  const mapImage = lang === 'ar'
    ? (connectivityData?.mapImageArUrl || (connectivityData?.mapImageAr ? urlFor(connectivityData.mapImageAr).url() : null))
    : (connectivityData?.mapImageEnUrl || connectivityData?.mapImageUrl || (connectivityData?.mapImageEn ? urlFor(connectivityData.mapImageEn).url() : null));

  const desktopMapSrc = mapImage || "/images/map-clean-base.png";
  const mobileMapSrc = mapImage || "/images/map-mobile-rotated-labels.png";

  const displayTitle = connectivityData?.title?.[lang] || connectivityData?.title?.en || t.connectivity.title;
  const displaySubtitle = connectivityData?.description?.[lang] || connectivityData?.description?.en || t.connectivity.subtitle;
  const displayDestinations = connectivityData?.destinations?.length
    ? connectivityData.destinations.map((item) => ({
        icon: item.icon,
        time: item.time,
        name: item.label?.[lang] || item.label?.en || '',
      })).filter((item) => item.name || item.time)
    : t.connectivity.destinations;

  return (
    <Box
      id="connectivity"
      ref={sectionRef}
      className="brochure-section"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: '78vh', sm:'85vh', md: '100vh' },
        backgroundColor: '#F6F2EC', // Luxury brochure beige stone
        py: { xs: 5, sm: 6, md: 8 },
        px: { xs: 2, sm: 4, md: 8, lg: 10 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="xl" sx={{ pr: { md: 6 }, px: { xs: 0, sm: 2 } }}>
        {/* Borderless Map Container (Composite Rotated Map Image on Mobile xs, Landscape Map on sm+) */}
        <Box
          ref={mapContainerRef}
          sx={{
            position: 'relative',
            width: '100%',
            mb: { xs: 4, md: 6 },
            overflow: 'hidden',
            borderRadius: '0px',
            border: 'none',
            boxShadow: 'none',
            backgroundColor: '#F6F2EC',
          }}
        >
          {/* Mobile Rotated Map Image with Perfectly Aligned Vector Labels (display on xs screens < 600px) */}
          <Box
            component="img"
            src={mobileMapSrc}
            alt="Damascus Map Rotated Mobile"
            sx={{
              width: '100%',
              height: 'auto',
              display: { xs: 'block', sm: 'none' },
              filter: 'brightness(0.98) contrast(1.02)',
            }}
          />

          {/* Desktop Landscape Map Image (display on sm+ screens ≥ 600px) */}
          <Box
            component="img"
            src={desktopMapSrc}
            alt="Damascus Map Landscape Base"
            sx={{
              width: '100%',
              height: 'auto',
              display: { xs: 'none', sm: 'block' },
              filter: 'brightness(0.98) contrast(1.02)',
            }}
          />

        
        </Box> 

        {/* Bottom Section: Title & Responsive Destinations List */}
        <Box 
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 4, md: 6, lg: 8 },
            alignItems: 'flex-start',
            width: '100%',
            pt: 1
          }}
        >
          {/* Left Column: Heading & Subtitle */}
          <Box sx={{ width: { xs: '100%', md: '41.666667%' } }}>
            <Box ref={textRef} sx={{ textAlign: 'start', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: '"CS Brandis", serif',
                  fontWeight: 600,
                  fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' },
                  lineHeight: 1.15,
                  color: '#3D362E',
                  mb: 0.5,
                  letterSpacing: '-0.01em',
                  textAlign: 'start',
                  width: '100%',
                }}
              >
                {displayTitle}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"CS Brandis", serif',
                  fontWeight: 400,
                  fontSize: { xs: '1.1rem', sm: '1.35rem', md: '1.7rem' },
                  color: '#8E857B',
                  lineHeight: 1.25,
                  textAlign: 'start',
                  width: '100%',
                }}
              >
                {displaySubtitle}
              </Typography>
            </Box>
            <LearnMoreLink path="/location" bg="#F6F2EC" />
          </Box>

          {/* Right Column: 2-Column Destination Grid */}
          <Box sx={{ width: { xs: '100%', md: '58.333333%' } }}>
            <Grid container spacing={{ xs: 1.5, sm: 2 }} ref={listRef}>
              {displayDestinations.map((item, index) => (
                <Grid size={{ xs: 12, sm: 6 }} key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      py: 0.5,
                    }}
                  >
                    {/* Destination Icon */}
                    <Box
                      sx={{
                        width: { xs: 28, sm: 32 },
                        height: { xs: 28, sm: 32 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <DestinationIcon type={item.icon} />
                    </Box>

                    {/* Time & Destination Text */}
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, flexWrap: 'nowrap' }}>
                      <Typography
                        component="span"
                        sx={{
                          fontFamily: '"Silka", sans-serif',
                          fontWeight: 500,
                          fontSize: { xs: '0.92rem', sm: '1rem', md: '1.08rem' },
                          color: '#3D362E',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        · {item.time}
                      </Typography>
                      <Typography
                        component="span"
                        sx={{
                          fontFamily: '"Silka", sans-serif',
                          fontWeight: 400,
                          fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
                          color: '#5C544B',
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>

    </Box>
  );
}
