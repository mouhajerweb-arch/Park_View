'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Grid2 as Grid, Typography } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { client } from '../sanity/client';

gsap.registerPlugin(ScrollTrigger);

export default function HolisticLivingSection() {
  const { t, lang } = useLanguage();
  const [activePhase, setActivePhase] = useState('orchid'); // 'orchid' | 'magnolia'
  
  const sectionRef = useRef(null);
  const switcherRef = useRef(null);
  const contentGridRef = useRef(null);

  const [secData, setSecData] = useState(null);

  useEffect(() => {
    let active = true;
    client
      .fetch(`*[_type == "residencesPage" && _id == "residencesPage"][0].sections[_type == "holisticLivingSection"][0] {
        ...,
        "orchid": {
          ...,
          "image1Url": orchid.image1.asset->url,
          "image2Url": orchid.image2.asset->url
        },
        "magnolia": {
          ...,
          "image1Url": magnolia.image1.asset->url,
          "image2Url": magnolia.image2.asset->url
        }
      }`)
      .then((data) => {
        if (active && data) {
          setSecData(data);
        }
      })
      .catch((err) => console.warn('Error fetching holistic living section data:', err));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal the tab switcher and headers
      gsap.fromTo(
        switcherRef.current,
        { opacity: 0, y: 20 },
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

      // Reveal grid contents
      if (contentGridRef.current) {
        gsap.fromTo(
          contentGridRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentGridRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [lang, secData]);

  // Fade animation when changing tabs
  useEffect(() => {
    if (contentGridRef.current) {
      gsap.fromTo(
        contentGridRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activePhase]);

  const hl = t.holisticLiving;
  
  // Resolve dynamic values
  const displayTitle = secData?.orchid?.title?.[lang] || secData?.orchid?.title?.en || hl.title; // Shared title fallback

  const getPhaseData = () => {
    if (activePhase === 'orchid') {
      const orchidData = secData?.orchid;
      return {
        tabLabel: orchidData?.subtitle?.[lang] || orchidData?.subtitle?.en || hl.phases.orchid.tabLabel,
        desc: orchidData?.description?.[lang] || orchidData?.description?.en || hl.phases.orchid.desc,
        largeImg: orchidData?.image1Url || '/images/holistic-orchid-interior.jpg',
        smallImg: orchidData?.image2Url || '/images/holistic-orchid-flower.jpg',
      };
    } else {
      const magnoliaData = secData?.magnolia;
      return {
        tabLabel: magnoliaData?.subtitle?.[lang] || magnoliaData?.subtitle?.en || hl.phases.magnolia.tabLabel,
        desc: magnoliaData?.description?.[lang] || magnoliaData?.description?.en || hl.phases.magnolia.desc,
        largeImg: magnoliaData?.image1Url || '/images/holistic-magnolia-interior.jpg',
        smallImg: magnoliaData?.image2Url || '/images/holistic-magnolia-woman.jpg',
      };
    }
  };

  const activeData = getPhaseData();

  return (
    <Box
      id="holistic-living"
      ref={sectionRef}
      className="brochure-section"
      sx={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#F6F2EC', // luxury beige brochure page
        py: { xs: 8, md: 14 },
        px: { xs: 3, sm: 6, md: 10, lg: 12 },
        borderBottom: '1px solid rgba(61, 54, 46, 0.05)',
      }}
    >
      <Container maxWidth="xl" sx={{ pr: { md: 8 } }}>
        
        {/* Toggle Phase Switcher Headers */}
        <Box 
          ref={switcherRef}
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            mb: { xs: 5, md: 8 },
            gap: 3
          }}
        >
          <Box sx={{ width: '100%', textAlign: 'start' }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"CS Brandis", serif',
                fontWeight: 300,
                fontSize: { xs: '2rem', sm: '2.4rem', md: '2.8rem' },
                lineHeight: 1.15,
                color: '#3D362E',
                letterSpacing: '-0.01em',
                textAlign: 'start',
                width: '100%',
              }}
            >
              {displayTitle}
            </Typography>
          </Box>
          
          {/* Custom Switcher Tabs */}
          <Box
            sx={{
              display: 'flex',
              backgroundColor: 'rgba(61, 54, 46, 0.05)',
              borderRadius: '50px',
              p: '4px',
              border: '1px solid rgba(61, 54, 46, 0.08)',
              alignSelf: { xs: 'stretch', sm: 'auto' },
              flexDirection: 'row',
            }}
          >
            {[
              { id: 'orchid', label: hl.phases.orchid.tabLabel },
              { id: 'magnolia', label: hl.phases.magnolia.tabLabel }
            ].map((tab) => (
              <Box
                key={tab.id}
                onClick={() => setActivePhase(tab.id)}
                sx={{
                  fontFamily: '"Silka", sans-serif',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  py: 1,
                  px: 3,
                  borderRadius: '50px',
                  cursor: 'pointer',
                  color: activePhase === tab.id ? '#FFFFFF' : '#6B6661',
                  backgroundColor: activePhase === tab.id ? '#3D362E' : 'transparent',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  textAlign: 'center',
                  flexGrow: { xs: 1, sm: 0 }
                }}
              >
                {tab.label}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Content Grid */}
        <Box 
          ref={contentGridRef} 
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 4, md: 6, lg: 8 },
            width: '100%'
          }}
        >
          {/* Left Column: Small image */}
          <Box sx={{ width: { xs: '100%', md: '33.333333%' } }}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: lang === 'ar' ? 'flex-end' : 'flex-start',
              }}
            >
              {/* Small Portrait Image */}
              <Box
                sx={{
                  width: { xs: '100%', sm: '260px' },
                  height: '340px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 30px rgba(61, 54, 46, 0.06)',
                  border: '1px solid rgba(61, 54, 46, 0.05)',
                  mb: { xs: 0, md: 4 }
                }}
              >
                <Box
                  component="img"
                  src={activeData.smallImg}
                  alt={`${activePhase} phase portrait illustration`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Right Column: Large landscape image and description */}
          <Box sx={{ width: { xs: '100%', md: '66.666667%' } }}>
            <Box sx={{ width: '100%' }}>
              {/* Large Landscape Image */}
              <Box
                sx={{
                  width: '100%',
                  height: { xs: '240px', sm: '380px', md: '420px' },
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 15px 35px rgba(61, 54, 46, 0.06)',
                  border: '1px solid rgba(61, 54, 46, 0.05)',
                  mb: 4
                }}
              >
                <Box
                  component="img"
                  src={activeData.largeImg}
                  alt={`${activePhase} luxury residential interior rendering`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </Box>

              {/* Description Paragraph */}
              <Typography
                variant="body1"
                sx={{
                  fontFamily: '"Silka", sans-serif',
                  fontWeight: 300,
                  fontSize: { xs: '0.96rem', md: '1.025rem' },
                  lineHeight: 1.85,
                  color: '#6B6661',
                  textAlign: lang === 'ar' ? 'right' : 'justify',
                  maxWidth: '720px',
                  ml: lang === 'ar' ? 'auto' : '0',
                  mr: lang === 'ar' ? '0' : 'auto'
                }}
              >
                {activeData.desc}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
