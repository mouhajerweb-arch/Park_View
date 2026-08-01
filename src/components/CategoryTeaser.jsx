'use client';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Container, Button } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function CategoryTeaser() {
  const { lang } = useLanguage();
  const router = useRouter();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each teaser row sliding in and fading
      const rows = sectionRef.current.querySelectorAll('.teaser-row');
      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  const teasers = [
    {
      id: 'about',
      labelEn: 'About Park View',
      labelAr: 'عن بارك فيو',
      descEn: 'A masterplanned residential sanctuary spanning 50,000 sqm with 30,000 sqm set aside for gardens and tranquil nature paths.',
      descAr: 'مجمع سكني متكامل يمتد على مساحة 50,000 متر مربع مع تخصيص 30,000 متر مربع للحدائق المنسقة ومسارات المشي الهادئة.',
      img: '/images/prestige-tranquility.jpg',
      link: '/about',
      btnEn: 'Discover Our Philosophy',
      btnAr: 'اكتشف فلسفتنا السكنية'
    },
    {
      id: 'location',
      labelEn: 'Strategic Location',
      labelAr: 'الموقع الاستراتيجي',
      descEn: 'Nestled behind Swiss House in Yaafour Valley. Direct highway connectivity to Damascus city center and Beirut.',
      descAr: 'يقع خلف البيت السويسري في وادي يعفور الراقي. وصول مباشر للمحافظة ووسط دمشق والحدود اللبنانية.',
      img: '/images/location-strategic.jpg',
      link: '/location',
      btnEn: 'Explore Connectivity Map',
      btnAr: 'استكشف شبكة المواصلات'
    },
    {
      id: 'residences',
      labelEn: 'Premium Residences',
      labelAr: 'الوحدات السكنية الراقية',
      descEn: 'Discover the seven residential clusters and interactively explore detailed floor plans and layouts.',
      descAr: 'اكتشف الكتل والمجتمعات السكنية السبعة، واستكشف مخططات الطوابق والوحدات التفصيلية بلمسة واحدة.',
      img: '/images/luxury-entry.jpg',
      link: '/residences',
      btnEn: 'Browse Unit Blueprints',
      btnAr: 'تصفح مخططات الشقق'
    },
    {
      id: 'gallery',
      labelEn: 'Visual Gallery',
      labelAr: 'معرض الصور الفاخر',
      descEn: 'Step inside Park View through high-resolution landscape renderings, amenity highlights, and interior styles.',
      descAr: 'ادخل إلى بارك فيو عبر صور عالية الدقة للمساحات الخضراء، التشطيبات الداخلية، واللقاطات المعمارية.',
      img: '/images/harmony-pool.jpg',
      link: '/gallery',
      btnEn: 'View Visual Gallery',
      btnAr: 'تصفح المعرض الكامل'
    }
  ];

  return (
    <Box 
      ref={sectionRef} 
      sx={{ 
        width: '100%', 
        backgroundColor: '#FFFFFF', 
        pb: { xs: 8, md: 12 },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 4, sm: 6, md: 8 }
      }}
    >
      {teasers.map((teaser) => (
        <Box
          key={teaser.id}
          className="teaser-row"
          onClick={() => router.push(teaser.link)}
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: '380px', sm: '420px', md: '480px' },
            overflow: 'hidden',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
              '& .teaser-bg': {
                transform: 'scale(1.03)',
              },
              '& .teaser-overlay': {
                backgroundColor: 'rgba(43, 40, 37, 0.45)',
              },
              '& .teaser-btn': {
                backgroundColor: '#FFFFFF',
                color: '#3D362E',
                borderColor: '#FFFFFF'
              }
            }
          }}
        >
          {/* Background Image with Zoom effect */}
          <Box
            className="teaser-bg"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${teaser.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 1s cubic-bezier(0.25, 1, 0.5, 1)',
              zIndex: 1
            }}
          />

          {/* Dark luxury overlay filter */}
          <Box
            className="teaser-overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(43, 40, 37, 0.35)',
              transition: 'background-color 0.5s ease',
              zIndex: 2
            }}
          />

          {/* Centered Content Container */}
          <Container 
            maxWidth="xl" 
            sx={{ 
              position: 'relative', 
              zIndex: 3, 
              color: '#FFFFFF',
              px: { xs: 4, sm: 8, md: 10, lg: 12 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: lang === 'ar' ? 'flex-end' : 'flex-start',
              textAlign: lang === 'ar' ? 'right' : 'left'
            }}
          >
            {/* Category label */}
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"CS Brandis", serif',
                fontWeight: 300,
                fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.4rem' },
                lineHeight: 1.1,
                mb: 2,
                textShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
            >
              {lang === 'ar' ? teaser.labelAr : teaser.labelEn}
            </Typography>

            {/* Category short description */}
            <Typography
              sx={{
                fontFamily: '"Silka", sans-serif',
                fontWeight: 300,
                fontSize: { xs: '0.92rem', md: '1rem' },
                lineHeight: 1.6,
                mb: 4.5,
                maxWidth: '560px',
                textShadow: '0 1px 4px rgba(0,0,0,0.2)'
              }}
            >
              {lang === 'ar' ? teaser.descAr : teaser.descEn}
            </Typography>

            {/* Custom CTA Outline Button */}
            <Button
              className="teaser-btn"
              variant="outlined"
              sx={{
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.45)',
                borderWidth: '1.5px',
                borderRadius: '50px',
                px: 4,
                py: 1.2,
                fontSize: '0.82rem',
                fontFamily: '"Silka", sans-serif',
                fontWeight: 500,
                textTransform: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  borderWidth: '1.5px',
                }
              }}
            >
              {lang === 'ar' ? teaser.btnAr : teaser.btnEn}
            </Button>
          </Container>
        </Box>
      ))}
    </Box>
  );
}
