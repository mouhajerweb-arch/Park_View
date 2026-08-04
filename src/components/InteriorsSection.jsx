'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Grid2 as Grid, Typography } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { usePathname } from 'next/navigation';
import { client } from '../sanity/client';

gsap.registerPlugin(ScrollTrigger);

export default function InteriorsSection() {
  const { t, lang } = useLanguage();
  const pathname = usePathname();
  const [activeRoom, setActiveRoom] = useState('dining'); // 'dining' | 'bedroom' | 'bathroom'
  
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);

  const [secData, setSecData] = useState(null);

  useEffect(() => {
    let active = true;
    const isResidencesPage = pathname?.includes('/residences');
    const pageType = isResidencesPage ? 'residencesPage' : 'page';

    client
      .fetch(`*[_type == "${pageType}"][0].sections[_type == "interiorsSection"][0] {
        ...,
        "resolvedTabs": tabs[] {
          ...,
          "resolvedImages": images[] {
            ...,
            "imageUrl": image.asset->url
          }
        }
      }`)
      .then((data) => {
        if (active && data) {
          setSecData(data);
        }
      })
      .catch((err) => console.warn('Error fetching interiors section data:', err));
    return () => {
      active = false;
    };
  }, [pathname]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal header
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Reveal content
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [lang, secData]);

  // Transition when changing tabs
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activeRoom]);

  const intr = t.interiors;

  // Resolve dynamic values
  const displayTitle = secData?.title?.[lang] || secData?.title?.en || intr.title;
  const displaySubtitle = secData?.eyebrow?.[lang] || secData?.eyebrow?.en || intr.subtitle;

  const getTabData = (tabId) => {
    const tabObj = secData?.resolvedTabs?.find((tab) => tab.tabId === tabId);
    if (tabObj) {
      return {
        desc: tabObj.tabDescription?.[lang] || tabObj.tabDescription?.en || '',
        img: tabObj.resolvedImages?.[0]?.imageUrl || '',
      };
    }
    
    // Default Fallbacks
    if (tabId === 'dining') {
      return { desc: intr.diningDesc, img: '/images/interior-dining.jpg' };
    } else if (tabId === 'bedroom') {
      return { desc: intr.bedroomDesc, img: '/images/interior-bedroom.jpg' };
    } else {
      return { desc: intr.bathroomDesc, img: '/images/prestige-tranquility.jpg' };
    }
  };

  const activeData = getTabData(activeRoom);

  return (
    <Box
      id="interiors"
      ref={sectionRef}
      className="brochure-section"
      sx={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#FFFFFF', // High-end white to contrast with beige holistic section
        py: { xs: 8, md: 14 },
        px: { xs: 3, sm: 6, md: 10, lg: 12 },
        borderBottom: '1px solid rgba(61, 54, 46, 0.05)',
      }}
    >
      <Container maxWidth="xl" sx={{ pr: { md: 8 } }}>
        {/* Section Header */}
        <Box 
          ref={headerRef}
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'flex-start',
            mb: { xs: 5, md: 7 },
            width: '100%',
          }}
        >
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
            {displaySubtitle}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"CS Brandis", serif',
              fontWeight: 300,
              fontSize: { xs: '2rem', sm: '2.4rem', md: '2.8rem' },
              lineHeight: 1.15,
              color: '#3D362E',
              mb: 4,
              textAlign: 'start',
              letterSpacing: '-0.01em',
              width: '100%',
            }}
          >
            {displayTitle}
          </Typography>

          {/* Interactive room tab pills */}
          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              borderBottom: '1px solid rgba(61, 54, 46, 0.1)',
              pb: 1.5,
              width: '100%',
              justifyContent: 'flex-start',
              flexDirection: 'row',
            }}
          >
            {[
              { id: 'dining', label: intr.tabs.dining },
              { id: 'bedroom', label: intr.tabs.bedroom },
              { id: 'bathroom', label: intr.tabs.bathroom }
            ].map((tab) => (
              <Box
                key={tab.id}
                onClick={() => setActiveRoom(tab.id)}
                sx={{
                  fontFamily: '"Silka", sans-serif',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  color: activeRoom === tab.id ? '#3D362E' : '#9E978E',
                  cursor: 'pointer',
                  position: 'relative',
                  pb: 1,
                  transition: 'color 0.3s ease',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -13,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: '#3D362E',
                    transform: activeRoom === tab.id ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.3s ease',
                    transformOrigin: 'left'
                  }
                }}
              >
                {tab.label}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Room content rendering */}
        <Box ref={contentRef}>
          <Box>
            <Box
              sx={{
                width: '100%',
                height: { xs: '240px', sm: '380px', md: '500px' },
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 12px 30px rgba(61, 54, 46, 0.05)',
                mb: 4
              }}
            >
              <Box
                component="img"
                src={activeData.img}
                alt={`${activeRoom} room layout rendering`}
                sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </Box>
            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Silka", sans-serif',
                fontWeight: 300,
                fontSize: '0.96rem',
                lineHeight: 1.85,
                color: '#6B6661',
                textAlign: lang === 'ar' ? 'right' : 'justify',
                maxWidth: '850px',
                ml: lang === 'ar' ? 'auto' : '0',
                mr: lang === 'ar' ? '0' : 'auto'
              }}
            >
              {activeData.desc}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
