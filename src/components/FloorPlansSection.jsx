'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { client } from '../sanity/client';

gsap.registerPlugin(ScrollTrigger);

export default function FloorPlansSection({ sectionData }) {
  const { t, lang } = useLanguage();
  const [activeBlock, setActiveBlock] = useState('magnoliaA'); // 'magnoliaA' | 'magnoliaB'
  const [activeUnit, setActiveUnit] = useState('7a-001'); // unit keys
  const [sanityData, setSanityData] = useState(sectionData || null);
  
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);

  // Fetch floor plans data from Sanity
  useEffect(() => {
    if (sectionData) {
      setSanityData(sectionData);
      return;
    }

    let active = true;
    client
      .fetch(
        `*[_type == "residencesPage" && _id == "residencesPage"][0].sections[_type == "floorPlansSection"][0] {
          ...,
          blocks[] {
            ...,
            units[] {
              ...,
              "imageUrl": image.asset->url
            }
          }
        }`
      )
      .then((data) => {
        if (active && data) {
          setSanityData(data);
        }
      })
      .catch((err) => console.warn('Error fetching floor plans from Sanity:', err));
    return () => {
      active = false;
    };
  }, [sectionData]);

  // Update active block when sanityData loads
  useEffect(() => {
    if (sanityData?.blocks?.length > 0) {
      const firstBlockId = sanityData.blocks[0].blockId;
      setActiveBlock(firstBlockId);
    }
  }, [sanityData]);

  // Set default active unit when active block changes
  useEffect(() => {
    if (sanityData?.blocks?.length > 0) {
      const blockObj = sanityData.blocks.find(b => b.blockId === activeBlock);
      if (blockObj?.units?.length > 0) {
        setActiveUnit(blockObj.units[0].unitId);
        return;
      }
    }
    // Fallback to static keys
    if (activeBlock === 'magnoliaA') {
      setActiveUnit('7a-001');
    } else {
      setActiveUnit('7b-001');
    }
  }, [activeBlock, sanityData]);

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
  }, [lang]);

  // Transition when changing active unit
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      );
    }
  }, [activeUnit]);

  const fp = t.floorPlans;

  // Compute blocks list dynamically
  const blocksList = sanityData?.blocks?.map(b => ({
    id: b.blockId,
    label: b.blockName?.[lang] || b.blockName?.en || ''
  })) || [
    { id: 'magnoliaA', label: fp.blocks.magnoliaA },
    { id: 'magnoliaB', label: fp.blocks.magnoliaB }
  ];

  // Compute unit list dynamically
  const activeBlockObj = sanityData?.blocks?.find(b => b.blockId === activeBlock);
  const unitList = activeBlockObj?.units?.map(u => u.unitId) || (
    activeBlock === 'magnoliaA' 
      ? ['7a-001', '7a-101', '7a-102', '7a-x01']
      : ['7b-001', '7b-101', '7b-102', '7b-204', '7b-x01', '7b-x02']
  );

  // Compute current unit specifications dynamically
  let currentUnitData = null;
  if (sanityData?.blocks) {
    for (const block of sanityData.blocks) {
      const found = block.units?.find(u => u.unitId === activeUnit);
      if (found) {
        currentUnitData = {
          name: found.name?.[lang] || found.name?.en || '',
          size: found.size?.[lang] || found.size?.en || '',
          orientation: found.orientation?.[lang] || found.orientation?.en || '',
          beds: found.beds?.[lang] || found.beds?.en || '',
          bullets: found.bullets?.map(b => b?.[lang] || b?.en || '') || [],
          imageUrl: found.imageUrl
        };
        break;
      }
    }
  }

  // Fallback to local translations if no Sanity data
  if (!currentUnitData) {
    const localUnit = fp.units[activeUnit] || fp.units['7a-001'];
    currentUnitData = {
      name: localUnit.name,
      size: localUnit.size,
      orientation: localUnit.orientation,
      beds: localUnit.beds,
      bullets: localUnit.bullets || [],
      imageUrl: `/images/floorplan-${activeUnit}.png`
    };
  }
  
  // Floorplan image file mappings
  const floorplanImg = currentUnitData.imageUrl || `/images/floorplan-${activeUnit}.png`;

  const handleRequestPlans = () => {
    const WHATSAPP_NUMBER = sanityData?.whatsappNumber || '963997711226';
    const unitName = currentUnitData.name;
    const message = lang === 'ar'
      ? `مرحباً، أود الحصول على مخططات الطوابق والكتيب الخاص بـ ${unitName} في مشروع بارك فيو يعفور.`
      : `Hello, I would like to request the floor plan layout plans and brochure catalog for ${unitName} at Park View Yaafour.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Box
      id="floor-plans"
      ref={sectionRef}
      className="brochure-section"
      sx={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#F6F2EC', // luxury beige brochure background
        py: { xs: 8, md: 14 },
        px: { xs: 3, sm: 6, md: 10, lg: 12 },
        borderBottom: '1px solid rgba(61, 54, 46, 0.05)',
      }}
    >
      <Container maxWidth="xl" sx={{ pr: { md: 8 } }}>
        {/* Header */}
        <Box 
          ref={headerRef} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'flex-start',
            mb: { xs: 5, md: 6 },
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
            {sanityData?.eyebrow?.[lang] || sanityData?.eyebrow?.en || fp.subtitle}
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
              width: '100%',
              letterSpacing: '-0.01em',
            }}
          >
            {sanityData?.title?.[lang] || sanityData?.title?.en || fp.title}
          </Typography>

          {/* Block toggles (Magnolia A / Magnolia B) */}
          <Box
            sx={{
              display: 'flex',
              backgroundColor: 'rgba(61, 54, 46, 0.05)',
              borderRadius: '50px',
              p: '4px',
              border: '1px solid rgba(61, 54, 46, 0.08)',
              mb: 4,
              flexDirection: 'row',
            }}
          >
            {blocksList.map((block) => (
              <Box
                key={block.id}
                onClick={() => setActiveBlock(block.id)}
                sx={{
                  fontFamily: '"Silka", sans-serif',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  py: 1,
                  px: 3.5,
                  borderRadius: '50px',
                  cursor: 'pointer',
                  color: activeBlock === block.id ? '#FFFFFF' : '#6B6661',
                  backgroundColor: activeBlock === block.id ? '#3D362E' : 'transparent',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  textAlign: 'center',
                }}
              >
                {block.label}
              </Box>
            ))}
          </Box>

          {/* Unit selection sub-bar */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1.5,
              width: '100%',
              borderBottom: '1px solid rgba(61, 54, 46, 0.1)',
              pb: 1.5,
              justifyContent: lang === 'ar' ? 'flex-end' : 'flex-start',
              flexDirection: 'row',
            }}
          >
            {unitList.map((unitKey) => {
              const uName = (() => {
                if (sanityData?.blocks) {
                  for (const block of sanityData.blocks) {
                    const found = block.units?.find(u => u.unitId === unitKey);
                    if (found) return found.name?.[lang] || found.name?.en || '';
                  }
                }
                return fp.units[unitKey]?.name || '';
              })();

              return (
                <Box
                  key={unitKey}
                  onClick={() => setActiveUnit(unitKey)}
                  sx={{
                    fontFamily: '"Silka", sans-serif',
                    fontWeight: activeUnit === unitKey ? 600 : 400,
                    fontSize: '0.88rem',
                    color: activeUnit === unitKey ? '#3D362E' : '#7C7368',
                    backgroundColor: activeUnit === unitKey ? '#FFFFFF' : 'transparent',
                    border: activeUnit === unitKey ? '1px solid rgba(61, 54, 46, 0.15)' : '1px solid transparent',
                    borderRadius: '30px',
                    py: 0.6,
                    px: 2.2,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: activeUnit === unitKey ? '0 4px 12px rgba(61, 54, 46, 0.05)' : 'none',
                  }}
                >
                  {uName.split(' ').slice(0, 2).join(' ')}
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Content Display: Specs / Blurred Blueprint Locked card */}
        <Box 
          ref={contentRef} 
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 5, md: 6, lg: 8 },
            alignItems: 'flex-start', // Vertically aligned to top
            width: '100%'
          }}
        >
          {/* Left Column: Specifications & Rooms */}
          <Box sx={{ width: { xs: '100%', md: '41.666667%' }, pt: { md: 2 } }}>
            <Box sx={{ textAlign: 'start', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              
              {/* Unit Name Heading */}
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"CS Brandis", serif',
                  fontSize: { xs: '1.6rem', md: '2rem' },
                  fontWeight: 400,
                  color: '#3D362E',
                  mb: 3,
                  textAlign: 'start',
                  width: '100%',
                }}
              >
                {currentUnitData.name}
              </Typography>

              {/* Dimensions Specs Grid */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 3.5,
                  mb: 4.5,
                  borderBottom: '1px solid rgba(61, 54, 46, 0.1)',
                  pb: 3,
                  flexDirection: lang === 'ar' ? 'row-reverse' : 'row',
                }}
              >
                {/* Area spec */}
                <Box>
                  <Typography
                    sx={{
                      fontFamily: '"Silka", sans-serif',
                      fontSize: '0.78rem',
                      color: '#9E978E',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      mb: 0.5
                    }}
                  >
                    {sanityData?.areaLabel?.[lang] || sanityData?.areaLabel?.en || fp.specs.area}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Silka", sans-serif',
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      color: '#3D362E'
                    }}
                  >
                    {currentUnitData.size}
                  </Typography>
                </Box>

                {/* Orientation spec */}
                <Box>
                  <Typography
                    sx={{
                      fontFamily: '"Silka", sans-serif',
                      fontSize: '0.78rem',
                      color: '#9E978E',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      mb: 0.5
                    }}
                  >
                    {sanityData?.orientationLabel?.[lang] || sanityData?.orientationLabel?.en || fp.specs.orientation}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Silka", sans-serif',
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      color: '#3D362E'
                    }}
                  >
                    {currentUnitData.orientation}
                  </Typography>
                </Box>

                {/* Bedrooms spec */}
                <Box>
                  <Typography
                    sx={{
                      fontFamily: '"Silka", sans-serif',
                      fontSize: '0.78rem',
                      color: '#9E978E',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      mb: 0.5
                    }}
                  >
                    {sanityData?.bedroomsLabel?.[lang] || sanityData?.bedroomsLabel?.en || fp.specs.bedrooms}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Silka", sans-serif',
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      color: '#3D362E'
                    }}
                  >
                    {currentUnitData.beds}
                  </Typography>
                </Box>
              </Box>

              {/* Rooms Bullet Checklist */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.8
                }}
              >
                {currentUnitData.bullets.map((bullet, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 2,
                      flexDirection: lang === 'ar' ? 'row-reverse' : 'row',
                    }}
                  >
                    {/* Gold checkmark icon */}
                    <Box
                      sx={{
                        width: '16px',
                        height: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#7C7368',
                        mt: 0.3,
                        flexShrink: 0
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: '"Silka", sans-serif',
                        fontWeight: 300,
                        fontSize: '0.94rem',
                        lineHeight: 1.5,
                        color: '#6B6661',
                      }}
                    >
                      {bullet}
                    </Typography>
                  </Box>
                ))}
              </Box>

            </Box>
          </Box>

          {/* Right Column: Premium Locked / Blurred Blueprint Card */}
          <Box sx={{ width: { xs: '100%', md: '58.333333%' }, display: 'flex', justifyContent: 'center' }}>
            <Box
              onClick={handleRequestPlans}
              sx={{
                width: { xs: '100%', sm: '420px', md: '440px' },
                aspectRatio: '1/1.38', // Explicit Portrait Ratio
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid rgba(61, 54, 46, 0.1)',
                boxShadow: '0 12px 30px rgba(61, 54, 46, 0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 40px rgba(61, 54, 46, 0.08)',
                  '& .blur-overlay-bg': {
                    filter: 'blur(20px) contrast(0.9) brightness(0.85)',
                    opacity: 0.35
                  },
                  '& .glass-overlay-card': {
                    borderColor: 'rgba(90, 115, 101, 0.35)',
                    boxShadow: '0 8px 32px rgba(61, 54, 46, 0.08)'
                  }
                }
              }}
            >
              {/* Blurred Floor Plan blueprint image */}
              <Box
                className="blur-overlay-bg"
                component="img"
                src={floorplanImg}
                alt={`${currentUnitData.name} blueprint map`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'blur(14px) contrast(0.95) brightness(0.9)',
                  opacity: 0.45,
                  transition: 'all 0.4s ease'
                }}
              />

              {/* Premium Floating Glass overlay dialog */}
              <Box
                className="glass-overlay-card"
                sx={{
                  position: 'absolute',
                  width: '85%',
                  height: '85%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  p: 3,
                  backgroundColor: 'rgba(253, 251, 247, 0.85)', // Premium ivory glass color
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(124, 115, 104, 0.18)',
                  borderRadius: '12px',
                  transition: 'all 0.4s ease'
                }}
              >
                {/* Lock Architectural Icon */}
                <Box
                  sx={{
                    width: 54,
                    height: 54,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(90, 115, 101, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2.5,
                    color: '#5A7365'
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </Box>

                {/* Subtitle */}
                <Typography
                  sx={{
                    fontFamily: '"Guise", sans-serif',
                    fontSize: '9.5px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    color: '#7C7368',
                    textTransform: 'uppercase',
                    mb: 1
                  }}
                >
                  {sanityData?.requestSubtitle?.[lang] || sanityData?.requestSubtitle?.en || (lang === 'ar' ? 'مخططات خاصة' : 'Private Layouts')}
                </Typography>

                {/* Heading */}
                <Typography
                  sx={{
                    fontFamily: '"CS Brandis", serif',
                    fontWeight: 400,
                    fontSize: { xs: '1.2rem', sm: '1.4rem' },
                    lineHeight: 1.3,
                    color: '#2B2825',
                    mb: 2,
                    textTransform: 'uppercase'
                  }}
                >
                  {sanityData?.requestTitle?.[lang] || sanityData?.requestTitle?.en || (lang === 'ar' ? 'طلب مخطط الطابق' : 'Request Floor Plan')}
                </Typography>

                {/* Details */}
                <Typography
                  sx={{
                    fontFamily: '"Silka", sans-serif',
                    fontSize: '0.8rem',
                    lineHeight: 1.5,
                    color: '#7C7368',
                    mb: 4,
                    px: 1,
                    fontWeight: 300
                  }}
                >
                  {sanityData?.requestDescription?.[lang] || sanityData?.requestDescription?.en || (lang === 'ar'
                    ? 'يرجى الاتصال بفريق المبيعات لدينا عبر واتساب لتلقي مخطط الطابق التفصيلي الكامل بصيغة PDF.'
                    : 'Please contact our prestige sales team directly on WhatsApp to receive the complete floor plan brochures.')}
                </Typography>

                {/* CTA Button */}
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#2B2825',
                    color: '#FFFFFF',
                    fontFamily: '"Guise", sans-serif',
                    fontWeight: 500,
                    fontSize: '12px',
                    letterSpacing: '0.04em',
                    borderRadius: '50px',
                    px: 3,
                    py: 1.3,
                    boxShadow: 'none',
                    textTransform: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#5A7365', // Transitions elegantly to Sage Green on hover
                      boxShadow: 'none',
                    }
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  {sanityData?.requestButtonText?.[lang] || sanityData?.requestButtonText?.en || (lang === 'ar' ? 'طلب المخطط عبر واتساب ↗' : 'Request via WhatsApp ↗')}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
