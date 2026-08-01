'use client';
import React, { useEffect, useRef } from 'react';
import { Box, Container, Grid2 as Grid, Typography } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

// Palette definitions matching our theme
const primaryColor = '#2B2825'; // Bold theme charcoal slate

const amenitiesList = [
  { nameEn: 'Swimming Pool', nameAr: 'مسبح خارجي', iconSrc: '/icons/swimming.png' },
  { nameEn: 'Spa & Wellness Centre', nameAr: 'مركز صحي وسبا', iconSrc: '/icons/spa.png' },
  { nameEn: 'Outdoor Gym', nameAr: 'صالة رياضية خارجية', iconSrc: '/icons/outdoor gym.png' },
  { nameEn: 'Sports Courts', nameAr: 'ملاعب رياضية', iconSrc: '/icons/Sports court.png' },
  { nameEn: "Children's Playgrounds", nameAr: 'ملاعب أطفال', iconSrc: '/icons/Children background.png' },
  { nameEn: "Kids' Activity Areas", nameAr: 'مناطق أنشطة الأطفال', iconSrc: '/icons/Kids activity area.png' },
  { nameEn: 'BBQ & Picnic Areas', nameAr: 'مناطق شواء ونزهات', iconSrc: '/icons/bbq.png' },
  { nameEn: 'Outdoor Seating Areas', nameAr: 'جلسات خارجية', iconSrc: '/icons/outdoor seating.png' },
  { nameEn: 'Landscaped Gardens', nameAr: 'حدائق منسقة', iconSrc: '/icons/garden.png' },
  { nameEn: 'Multi Purpose Hall', nameAr: 'قاعة متعددة الأغراض', iconSrc: '/icons/hall.png' },
  { nameEn: '24/7 Gated Security', nameAr: 'أمن وحراسة ٢٤/٧', iconSrc: '/icons/gated security.png' },
  { nameEn: 'Dedicated Building Security', nameAr: 'أمن مخصص للمباني', iconSrc: '/icons/Building security.png' },
  { nameEn: 'Private Resident Parking', nameAr: 'مواقف خاصة بالسكان', iconSrc: '/icons/Private parking.png' },
  { nameEn: 'Visitor Parking', nameAr: 'مواقف سيارات للزوار', iconSrc: '/icons/Visitor parking.png' },
  { nameEn: 'On site Health Clinic', nameAr: 'عيادة صحية بالموقع', iconSrc: '/icons/onsite health clinic.png' }
];

export default function AmenitiesSection() {
  const { lang } = useLanguage();
  
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal alignment
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

      // Stagger grid elements fade-in
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <Box
      id="amenities-features"
      ref={sectionRef}
      className="brochure-section"
      sx={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#FFFFFF', // High-end pure white backdrop matching Gallery
        py: { xs: 8, md: 14 },
        px: { xs: 3, sm: 6, md: 10, lg: 12 },
        borderBottom: '1px solid rgba(61, 54, 46, 0.05)',
      }}
    >
      <Container maxWidth="xl" sx={{ pr: { md: 8 } }}>
        
        {/* Left/Right Aligned Header matching Gallery Theme */}
        <Box 
          ref={headerRef} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'flex-start',
            mb: { xs: 6, md: 9 },
            width: '100%',
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Guise", sans-serif',
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
            {lang === 'ar' ? 'المرافق ونمط الحياة' : 'Lifestyle & Amenities'}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"CS Brandis", serif',
              fontWeight: 300,
              fontSize: { xs: '2rem', sm: '2.4rem', md: '2.8rem' },
              lineHeight: 1.15,
              color: '#2B2825',
              mb: 3,
              textAlign: 'start',
              width: '100%',
              letterSpacing: '-0.01em',
            }}
          >
            {lang === 'ar' ? 'الموقع المثالي للعيش العصري الراقي' : 'The Location for Refined Living'}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: '"Silka", sans-serif',
              fontWeight: 300,
              fontSize: '0.96rem',
              color: '#6B6661',
              textAlign: lang === 'ar' ? 'right' : 'left',
              maxWidth: '650px'
            }}
          >
            {lang === 'ar'
              ? 'يقدم بارك فيو مجموعة متكاملة من المرافق ووسائل الراحة التي تلبي تطلعات العائلات الباحثة عن الرفاهية والهدوء والأمان.'
              : 'Park View Yaafour provides an address set apart, fully integrated with premium health, social, and residential security facilities for a lifetime of ease.'}
          </Typography>
        </Box>

        {/* Clean, Spacious, Borderless Floating Grid of Amenities (Separated Row/Col spacing) */}
        <Grid 
          ref={gridRef}
          container 
          columnSpacing={{ xs: 3, sm: 6, md: 8 }}
          rowSpacing={{ xs: 1, sm: 2, md: 3 }} // Removed row gap spacing significantly
          sx={{ 
            flexDirection: lang === 'ar' ? 'row-reverse' : 'row',
            justifyContent: 'center',
            px: { xs: 1, md: 2 }
          }}
        >
          {amenitiesList.map((item, idx) => {
            return (
              <Grid
                key={idx}
                size={{ xs: 6, sm: 4, md: 2.4 }} 
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  py: 1.5, // Reduced vertical padding
                  px: 1,
                  textAlign: 'center',
                  transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    '& .icon-wrap': {
                      transform: 'scale(1.1)'
                    }
                  }
                }}
              >
                {/* Custom PNG Icon wrapper (No border boxes, completely borderless floating) */}
                <Box 
                  className="icon-wrap"
                  sx={{ 
                    mb: 2, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                >
                  <Box
                    component="img"
                    src={item.iconSrc}
                    alt={lang === 'ar' ? item.nameAr : item.nameEn}
                    sx={{
                      width: { xs: '38px', md: '45px' },
                      height: { xs: '38px', md: '45px' },
                      objectFit: 'contain'
                    }}
                  />
                </Box>
                
                {/* Uppercase Letter-Spaced Label matching Theme */}
                <Typography
                  sx={{
                    fontFamily: '"Silka", sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    color: '#2B2825',
                    letterSpacing: '0.12em',
                    lineHeight: 1.45,
                    maxWidth: '160px'
                  }}
                >
                  {lang === 'ar' ? item.nameAr : item.nameEn}
                </Typography>
              </Grid>
            );
          })}
        </Grid>

      </Container>
    </Box>
  );
}
