'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Grid2 as Grid, Typography, Button } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { usePathname } from 'next/navigation';
import { client } from '../sanity/client';

gsap.registerPlugin(ScrollTrigger);

export default function FloorPlansSection() {
  const { t, lang } = useLanguage();
  const pathname = usePathname();
  const [activeBlock, setActiveBlock] = useState('magnoliaA'); // 'magnoliaA' | 'magnoliaB'
  const [activeUnit, setActiveUnit] = useState('7a-001'); // unit keys
  
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);

  const [secData, setSecData] = useState(null);

  useEffect(() => {
    let active = true;
    const isResidencesPage = pathname?.includes('/residences');
    const pageType = isResidencesPage ? 'residencesPage' : 'page';

    client
      .fetch(`*[_type == "${pageType}"][0].sections[_type == "floorPlansSection"][0]`)
      .then((data) => {
        if (active && data) {
          setSecData(data);
        }
      })
      .catch((err) => console.warn('Error fetching floor plans section data:', err));
    return () => {
      active = false;
    };
  }, [pathname]);

  // Set default active unit when active block changes
  useEffect(() => {
    if (activeBlock === 'magnoliaA') {
      setActiveUnit('7a-001');
    } else {
      setActiveUnit('7b-001');
    }
  }, [activeBlock]);

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

  const fp = t.floorPlans;

  // Resolve dynamic values
  const displayTitle = secData?.title?.[lang] || secData?.title?.en || fp.title;
  const displaySubtitle = secData?.eyebrow?.[lang] || secData?.eyebrow?.en || fp.subtitle;
  const displayDescription = secData?.description?.[lang] || secData?.description?.en || fp.description;

  // Floor plans data
  const magnoliaAUnits = {
    '7a-001': {
      titleEn: 'Duplex Ground + First Floor',
      titleAr: 'دوبلكس الطابق الأرضي + الأول',
      roomsEn: '4 Bedrooms + Living Room + Maid Room',
      roomsAr: '٤ غرف نوم + غرفة معيشة + غرفة عاملة منزلية',
      area: '430 sqm',
      gardenEn: 'Private garden & swimming pool',
      gardenAr: 'حديقة خاصة ومسبح خارجي',
      imgSrc: '/images/Magnolia A - ground floor duplex.jpg'
    },
    '7a-002': {
      titleEn: 'Apartment Second Floor',
      titleAr: 'شقة الطابق الثاني',
      roomsEn: '3 Bedrooms + Living Room',
      roomsAr: '٣ غرف نوم + غرفة معيشة',
      area: '345 sqm',
      gardenEn: 'Wide landscape terrace balcon',
      gardenAr: 'شرفة واسعة تطل على المناظر الطبيعية',
      imgSrc: '/images/Magnolia A - second floor.jpg'
    },
    '7a-003': {
      titleEn: 'Penthouse Third Floor',
      titleAr: 'شقة بنتهاوس الطابق الثالث',
      roomsEn: '4 Bedrooms + Living Room + Maid Room',
      roomsAr: '٤ غرف نوم + غرفة معيشة + غرفة عاملة منزلية',
      area: '430 sqm + roof deck',
      gardenEn: 'Private rooftop terrace pool deck',
      gardenAr: 'تراس سطح خاص مع مسبح',
      imgSrc: '/images/Magnolia A - third floor penthouse.jpg'
    }
  };

  const magnoliaBUnits = {
    '7b-001': {
      titleEn: 'Apartment Ground Floor',
      titleAr: 'شقة الطابق الأرضي',
      roomsEn: '3 Bedrooms + Living Room',
      roomsAr: '٣ غرف نوم + غرفة معيشة',
      area: '315 sqm',
      gardenEn: 'Private landscaped garden',
      gardenAr: 'حديقة خاصة منسقة',
      imgSrc: '/images/Magnolia B - ground floor.jpg'
    },
    '7b-002': {
      titleEn: 'Apartment First Floor',
      titleAr: 'شقة الطابق الأول',
      roomsEn: '3 Bedrooms + Living Room',
      roomsAr: '٣ غرف نوم + غرفة معيشة',
      area: '325 sqm',
      gardenEn: 'Double-height balcony terrace',
      gardenAr: 'تراس ذو ارتفاع مزدوج',
      imgSrc: '/images/Magnolia B - first floor.jpg'
    },
    '7b-003': {
      titleEn: 'Apartment Second Floor',
      titleAr: 'شقة الطابق الثاني',
      roomsEn: '3 Bedrooms + Living Room',
      roomsAr: '٣ غرف نوم + غرفة معيشة',
      area: '325 sqm',
      gardenEn: 'Panoramic valley views balcony',
      gardenAr: 'شرفة بإطلالة بانورامية على الوادي',
      imgSrc: '/images/Magnolia B - second floor.jpg'
    },
    '7b-004': {
      titleEn: 'Penthouse Third Floor',
      titleAr: 'شقة بنتهاوس الطابق الثالث',
      roomsEn: '4 Bedrooms + Living Room + Roof Deck',
      roomsAr: '٤ غرف نوم + غرفة معيشة + تراس سطح',
      area: '400 sqm',
      gardenEn: 'Roof infinity pool deck terrace',
      gardenAr: 'تراس سطح مع مسبح إنفينيتي',
      imgSrc: '/images/Magnolia B - third floor penthouse.jpg'
    }
  };

  const activeUnitsMap = activeBlock === 'magnoliaA' ? magnoliaAUnits : magnoliaBUnits;
  const currentUnitData = activeUnitsMap[activeUnit] || Object.values(activeUnitsMap)[0];

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
              mb: 3,
              textAlign: 'start',
              letterSpacing: '-0.01em',
              width: '100%',
            }}
          >
            {displayTitle}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: '"Silka", sans-serif',
              fontWeight: 300,
              fontSize: { xs: '0.94rem', md: '1rem' },
              lineHeight: 1.8,
              color: '#6B6661',
              maxWidth: '680px',
              textAlign: 'start',
              width: '100%',
            }}
          >
            {displayDescription}
          </Typography>
        </Box>

        {/* Layout Grid */}
        <Grid 
          ref={contentRef} 
          container 
          spacing={{ xs: 4, md: 8 }}
          sx={{ flexDirection: lang === 'ar' ? 'row-reverse' : 'row' }}
        >
          {/* Left Column: Interactive Selectors & Technical specs */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ width: '100%', textAlign: 'start' }}>
              {/* Step 1: Select Block */}
              <Typography
                sx={{
                  fontFamily: '"Silka", sans-serif',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: '#9E978E',
                  textTransform: 'uppercase',
                  mb: 2
                }}
              >
                {lang === 'ar' ? '١. اختر المبنى السكني' : '1. Select Residential Block'}
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mb: 5, flexDirection: 'row' }}>
                <Button
                  onClick={() => setActiveBlock('magnoliaA')}
                  variant={activeBlock === 'magnoliaA' ? 'contained' : 'outlined'}
                  sx={{
                    fontFamily: '"Silka", sans-serif',
                    textTransform: 'none',
                    borderRadius: '50px',
                    borderColor: '#3D362E',
                    color: activeBlock === 'magnoliaA' ? '#FFFFFF' : '#3D362E',
                    backgroundColor: activeBlock === 'magnoliaA' ? '#3D362E' : 'transparent',
                    '&:hover': {
                      backgroundColor: activeBlock === 'magnoliaA' ? '#2B2621' : 'rgba(61, 54, 46, 0.04)',
                      borderColor: '#3D362E',
                    },
                    px: 3,
                    py: 1,
                  }}
                >
                  {lang === 'ar' ? 'ماغنوليا A (دوبلكس وشقق)' : 'Magnolia A (Duplex & Apts)'}
                </Button>
                <Button
                  onClick={() => setActiveBlock('magnoliaB')}
                  variant={activeBlock === 'magnoliaB' ? 'contained' : 'outlined'}
                  sx={{
                    fontFamily: '"Silka", sans-serif',
                    textTransform: 'none',
                    borderRadius: '50px',
                    borderColor: '#3D362E',
                    color: activeBlock === 'magnoliaB' ? '#FFFFFF' : '#3D362E',
                    backgroundColor: activeBlock === 'magnoliaB' ? '#3D362E' : 'transparent',
                    '&:hover': {
                      backgroundColor: activeBlock === 'magnoliaB' ? '#2B2621' : 'rgba(61, 54, 46, 0.04)',
                      borderColor: '#3D362E',
                    },
                    px: 3,
                    py: 1,
                  }}
                >
                  {lang === 'ar' ? 'ماغنوليا B (شقق عائلية)' : 'Magnolia B (Family Apts)'}
                </Button>
              </Box>

              {/* Step 2: Select Unit */}
              <Typography
                sx={{
                  fontFamily: '"Silka", sans-serif',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: '#9E978E',
                  textTransform: 'uppercase',
                  mb: 2
                }}
              >
                {lang === 'ar' ? '٢. اختر الوحدة السكنية' : '2. Select Unit Plan'}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 6 }}>
                {Object.keys(activeUnitsMap).map((unitKey) => {
                  const unit = activeUnitsMap[unitKey];
                  const isSelected = activeUnit === unitKey;
                  return (
                    <Box
                      key={unitKey}
                      onClick={() => setActiveUnit(unitKey)}
                      sx={{
                        border: '1px solid',
                        borderColor: isSelected ? '#3D362E' : '#EAE5DE',
                        borderRadius: '10px',
                        p: 2,
                        cursor: 'pointer',
                        backgroundColor: isSelected ? 'rgba(61, 54, 46, 0.03)' : '#FFFFFF',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: lang === 'ar' ? 'row-reverse' : 'row',
                        textAlign: lang === 'ar' ? 'right' : 'left'
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: '"Silka", sans-serif',
                            fontWeight: 600,
                            fontSize: '0.88rem',
                            color: '#3D362E'
                          }}
                        >
                          {lang === 'ar' ? unit.titleAr : unit.titleEn}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: '"Silka", sans-serif',
                            fontSize: '0.76rem',
                            color: '#9E978E',
                            mt: 0.5
                          }}
                        >
                          {lang === 'ar' ? unit.roomsAr : unit.roomsEn}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: '"CS Brandis", serif',
                          fontWeight: 500,
                          fontSize: '1rem',
                          color: '#7C7368',
                          flexShrink: 0
                        }}
                      >
                        {unitKey.toUpperCase()}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>

              {/* Step 3: Technical Specifications Panel */}
              <Box
                sx={{
                  borderTop: '1px solid #E5DEC9',
                  pt: 4,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Silka", sans-serif',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    color: '#9E978E',
                    textTransform: 'uppercase',
                    mb: 2.5
                  }}
                >
                  {lang === 'ar' ? 'المواصفات الفنية المساحة' : 'Technical Specifications'}
                </Typography>

                <Grid container spacing={3} sx={{ flexDirection: lang === 'ar' ? 'row-reverse' : 'row' }}>
                  <Grid size={6}>
                    <Typography
                      sx={{
                        fontFamily: '"Silka", sans-serif',
                        fontSize: '0.72rem',
                        color: '#9E978E',
                        textTransform: 'uppercase',
                        mb: 0.5
                      }}
                    >
                      {lang === 'ar' ? 'المساحة المبنية' : 'Built-up Area'}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"CS Brandis", serif',
                        fontSize: '1.4rem',
                        color: '#3D362E',
                        fontWeight: 300
                      }}
                    >
                      {currentUnitData?.area}
                    </Typography>
                  </Grid>

                  <Grid size={6}>
                    <Typography
                      sx={{
                        fontFamily: '"Silka", sans-serif',
                        fontSize: '0.72rem',
                        color: '#9E978E',
                        textTransform: 'uppercase',
                        mb: 0.5
                      }}
                    >
                      {lang === 'ar' ? 'المساحة الخارجية' : 'Outdoor Feature'}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"CS Brandis", serif',
                        fontSize: '1.15rem',
                        color: '#3D362E',
                        fontWeight: 300,
                        lineHeight: 1.2
                      }}
                    >
                      {lang === 'ar' ? currentUnitData?.gardenAr : currentUnitData?.gardenEn}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>

          {/* Right Column: Architectural Drawing blueprint blueprint */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                width: '100%',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                p: { xs: 2, sm: 4 },
                boxShadow: '0 15px 35px rgba(61, 54, 46, 0.04)',
                border: '1px solid rgba(61, 54, 46, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                minHeight: { xs: '320px', sm: '460px', md: '580px' },
              }}
            >
              <Box
                component="img"
                src={currentUnitData?.imgSrc}
                alt={`${activeUnit} technical layout blueprint`}
                sx={{
                  maxWidth: '100%',
                  maxHeight: '520px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
