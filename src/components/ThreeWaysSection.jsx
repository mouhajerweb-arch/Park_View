'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { client } from '../sanity/client';

gsap.registerPlugin(ScrollTrigger);

export default function ThreeWaysSection() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('orchid'); // 'orchid' | 'lavender' | 'magnolia'
  
  const sectionRef = useRef(null);
  const textColRef = useRef(null);
  const titleRef = useRef(null);
  const pRef = useRef(null);
  const tabsContainerRef = useRef(null);
  const tabContentRef = useRef(null);
  
  const largeImgColRef = useRef(null);
  const largeImgRef = useRef(null);

  const [secData, setSecData] = useState(null);

  useEffect(() => {
    let active = true;
    client
      .fetch(`*[_type == "residencesPage" && _id == "residencesPage"][0].sections[_type == "threeWaysSection"][0] {
        ...,
        "largeImageUrl": largeImage.asset->url
      }`)
      .then((data) => {
        if (active && data) {
          setSecData(data);
        }
      })
      .catch((err) => console.warn('Error fetching three ways section data:', err));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text column reveal
      gsap.fromTo(
        [titleRef.current, pRef.current, tabsContainerRef.current],
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

  // Fade animation when changing tabs
  useEffect(() => {
    if (tabContentRef.current) {
      gsap.fromTo(
        tabContentRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  const tw = t.threeWays;
  
  // Resolve dynamic values
  const displayTitle = secData?.title?.[lang] || secData?.title?.en || tw.title;
  const displayParagraph = secData?.description?.[lang] || secData?.description?.en || tw.paragraph;
  const displayLargeImg = secData?.largeImageUrl || "/images/harmony-pool.jpg";

  const getPhaseData = () => {
    switch (activeTab) {
      case 'orchid':
        return {
          title: secData?.phases?.orchidTitle?.[lang] || secData?.phases?.orchidTitle?.en || tw.phases.orchidTitle,
          desc: secData?.phases?.orchidDesc?.[lang] || secData?.phases?.orchidDesc?.en || tw.phases.orchidDesc,
        };
      case 'lavender':
        return {
          title: secData?.phases?.lavenderTitle?.[lang] || secData?.phases?.lavenderTitle?.en || tw.phases.lavenderTitle,
          desc: secData?.phases?.lavenderDesc?.[lang] || secData?.phases?.lavenderDesc?.en || tw.phases.lavenderDesc,
        };
      case 'magnolia':
        return {
          title: secData?.phases?.magnoliaTitle?.[lang] || secData?.phases?.magnoliaTitle?.en || tw.phases.magnoliaTitle,
          desc: secData?.phases?.magnoliaDesc?.[lang] || secData?.phases?.magnoliaDesc?.en || tw.phases.magnoliaDesc,
        };
      default:
        return {};
    }
  };

  const activeData = getPhaseData();

  return (
    <Box
      id="three-ways-to-live"
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
      {/* Left Column: Text & Tabs */}
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
          {/* Subtitle */}
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
            {tw.subtitle}
          </Typography>

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
              mb: 3,
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
              mb: 5,
              textAlign: 'start',
              width: '100%',
            }}
          >
            {displayParagraph}
          </Typography>

          {/* Tab Switcher Headers */}
          <Box
            ref={tabsContainerRef}
            sx={{
              display: 'flex',
              gap: 4,
              borderBottom: '1px solid #E5DEC9',
              pb: 1.5,
              mb: 4,
              flexDirection: lang === 'ar' ? 'row-reverse' : 'row',
              justifyContent: 'flex-start',
            }}
          >
            {['orchid', 'lavender', 'magnolia'].map((tab) => {
              const label =
                tab === 'orchid'
                  ? (lang === 'ar' ? 'أوركيد' : 'Orchid')
                  : tab === 'lavender'
                  ? (lang === 'ar' ? 'لافندر' : 'Lavender')
                  : (lang === 'ar' ? 'ماغنوليا' : 'Magnolia');
              return (
                <Typography
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  sx={{
                    fontFamily: '"Silka", sans-serif',
                    fontSize: '0.85rem',
                    fontWeight: activeTab === tab ? 600 : 400,
                    color: activeTab === tab ? '#3D362E' : '#9E978E',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    pb: 1.5,
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -13,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      backgroundColor: '#3D362E',
                      opacity: activeTab === tab ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                    },
                  }}
                >
                  {label}
                </Typography>
              );
            })}
          </Box>

          {/* Dynamic Tab Body Content */}
          <Box ref={tabContentRef} sx={{ minHeight: '180px', width: '100%', textAlign: 'start' }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"CS Brandis", serif',
                fontSize: { xs: '1.4rem', md: '1.65rem' },
                color: '#3D362E',
                mb: 2.5,
                textAlign: 'start',
                width: '100%',
              }}
            >
              {activeData.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontFamily: '"Silka", sans-serif',
                fontWeight: 300,
                fontSize: { xs: '0.88rem', md: '0.94rem' },
                lineHeight: 1.8,
                color: '#6B6661',
                textAlign: 'start',
                width: '100%',
              }}
            >
              {activeData.desc}
            </Typography>
          </Box>
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
          src={displayLargeImg}
          alt="Luxury living residences exterior landscape rendering"
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
      <Box className="side-tab-bar">
        <Typography className="side-tab-title">
          {tw.sideBrand}
        </Typography>
        <Typography className="side-tab-number">
          {tw.pageNo}
        </Typography>
      </Box>
    </Box>
  );
}
