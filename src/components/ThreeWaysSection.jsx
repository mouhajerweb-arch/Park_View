'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function ThreeWaysSection({ sectionData }) {
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
  }, [lang]);

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
  const cmsPhases = sectionData?.phases || [];
  const getCmsPhase = (phaseId) => cmsPhases.find((phase) => phase.phaseId === phaseId);
  const displaySubtitle = sectionData?.eyebrow?.[lang] || sectionData?.eyebrow?.en || tw.subtitle;
  const displayTitle = sectionData?.title?.[lang] || sectionData?.title?.en || tw.title;
  const displayParagraph = sectionData?.description?.[lang] || sectionData?.description?.en || tw.paragraph;
  const displayImage = sectionData?.largeImageUrl || "/images/threeways-balcony.jpg";
  
  const getPhaseData = () => {
    switch (activeTab) {
      case 'orchid':
        if (getCmsPhase('orchid')) {
          const phase = getCmsPhase('orchid');
          return { title: phase.title?.[lang] || phase.title?.en, desc: phase.desc?.[lang] || phase.desc?.en };
        }
        return {
          title: tw.phases.orchidTitle,
          desc: tw.phases.orchidDesc,
        };
      case 'lavender':
        if (getCmsPhase('lavender')) {
          const phase = getCmsPhase('lavender');
          return { title: phase.title?.[lang] || phase.title?.en, desc: phase.desc?.[lang] || phase.desc?.en };
        }
        return {
          title: tw.phases.lavenderTitle,
          desc: tw.phases.lavenderDesc,
        };
      case 'magnolia':
        if (getCmsPhase('magnolia')) {
          const phase = getCmsPhase('magnolia');
          return { title: phase.title?.[lang] || phase.title?.en, desc: phase.desc?.[lang] || phase.desc?.en };
        }
        return {
          title: tw.phases.magnoliaTitle,
          desc: tw.phases.magnoliaDesc,
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
            {displaySubtitle}
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

          {/* Tab buttons */}
          <Box
            ref={tabsContainerRef}
            sx={{
              display: 'flex',
              gap: 1.5,
              mb: 4,
              borderBottom: '1px solid rgba(61, 54, 46, 0.1)',
              pb: 1.5,
              justifyContent: 'flex-start',
              flexDirection: 'row',
            }}
          >
            {['orchid', 'lavender', 'magnolia'].map((tab) => (
              <Box
                key={tab}
                onClick={() => setActiveTab(tab)}
                sx={{
                  fontFamily: '"Silka", sans-serif',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  color: activeTab === tab ? '#3D362E' : '#9E978E',
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
                    transform: activeTab === tab ? 'scaleX(1)' : 'scaleX(0)',
                    transition: 'transform 0.3s ease',
                    transformOrigin: 'left'
                  }
                }}
              >
                {getCmsPhase(tab)?.phaseName?.[lang] || getCmsPhase(tab)?.phaseName?.en || (
                  <>
                    {tab === 'orchid' && t.threeWays.phases.orchidTitle.split(' ')[0]}
                    {tab === 'lavender' && t.threeWays.phases.lavenderTitle.split(' ')[0]}
                    {tab === 'magnolia' && t.threeWays.phases.magnoliaTitle.split(' ')[0]}
                  </>
                )}
              </Box>
            ))}
          </Box>

          {/* Active Tab content */}
          <Box ref={tabContentRef} sx={{ minHeight: '180px', textAlign: lang === 'ar' ? 'right' : 'left' }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"CS Brandis", serif',
                fontSize: '1.5rem',
                fontWeight: 400,
                color: '#3D362E',
                mb: 2,
                textAlign: lang === 'ar' ? 'right' : 'left',
              }}
            >
              {activeData.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: '"Silka", sans-serif',
                fontWeight: 300,
                fontSize: '0.94rem',
                lineHeight: 1.8,
                color: '#6B6661',
                mb: 3,
                textAlign: lang === 'ar' ? 'right' : 'justify',
              }}
            >
              {activeData.desc}
            </Typography>

            {/* Spec grid ("Coming Soon" placeholders for Orchid/Lavender/Magnolia) */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2,
                mt: 3,
                borderTop: '1px dashed rgba(61, 54, 46, 0.1)',
                pt: 2.5
              }}
            >
              {[
                { label: lang === 'ar' ? 'نوع الوحدات' : 'Unit Types', val: tw.phases.comingSoon },
                { label: lang === 'ar' ? 'مساحات الوحدات' : 'Unit Sizes', val: tw.phases.comingSoon },
                { label: lang === 'ar' ? 'أسعار البداية' : 'Starting Prices', val: tw.phases.comingSoon },
                { label: lang === 'ar' ? 'خطة الدفع' : 'Payment Plan', val: tw.phases.comingSoon }
              ].map((item, idx) => (
                <Box key={idx} sx={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                  <Typography
                    sx={{
                      fontFamily: '"Silka", sans-serif',
                      fontSize: '0.8rem',
                      color: '#9E978E',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      mb: 0.5
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Silka", sans-serif',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      color: '#7C7368'
                    }}
                  >
                    {item.val}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Right Column: Full-Bleed Balcony Close-up */}
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
          alt="Luxury residential cluster balcony detail"
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
          {tw.sideBrand}
        </Typography>
        <Typography className="side-tab-number">
          {tw.pageNo}
        </Typography>
      </Box> */}
    </Box>
  );
}
