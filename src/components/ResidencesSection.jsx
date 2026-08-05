'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { optimizedImageUrl } from '../sanity/client';

gsap.registerPlugin(ScrollTrigger);

export default function ResidencesSection({ sectionData }) {
  const { t, lang } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const mapContainerRef = useRef(null);
  const pathsRef = useRef([]);

  const [activeCluster, setActiveCluster] = useState(null);
  const displayTitle = sectionData?.title?.[lang] || sectionData?.title?.en || t.residences.title;
  const displaySubtitle = sectionData?.eyebrow?.[lang] || sectionData?.eyebrow?.en || t.residences.subtitle;
  const displayImage = optimizedImageUrl(sectionData?.mainImageUrl, { width: 1800, quality: 84 }) || "/images/cluster.jpg";

  // Clusters detailed descriptions for popovers (English & Arabic)
  const clusterDetails = {
    magnoliaA: {
      titleEn: 'Magnolia A',
      titleAr: 'ماغنوليا A',
      descEn: 'Premium low-rise block with spacious terraces overlooking the western green valley.',
      descAr: 'كتلة سكنية فاخرة منخفضة الارتفاع مع تراسات واسعة تطل على الوادي الأخضر الغربي.',
    },
    magnoliaB: {
      titleEn: 'Magnolia B',
      titleAr: 'ماغنوليا B',
      descEn: 'Elegant family residences surrounded by private gardens and pedestrian walkways.',
      descAr: 'مساكن عائلية أنيقة محاطة بحدائق خاصة وممرات للمشاة.',
    },
    orchidB: {
      titleEn: 'Orchid B',
      titleAr: 'أوركيد B',
      descEn: 'Exclusive residential cluster featuring contemporary architecture and courtyard views.',
      descAr: 'مجمع سكني حصري يتميز بالتصميم المعماري المعاصر وإطلالات على الفناء الداخلي.',
    },
    orchidA: {
      titleEn: 'Orchid A',
      titleAr: 'أوركيد A',
      descEn: 'Luxury flats built around dynamic central fountains with light-filled interiors.',
      descAr: 'شقق فاخرة مبنية حول النوافير المركزية مع مساحات داخلية غنية بالإضاءة الطبيعية.',
    },
    jasmineB: {
      titleEn: 'Jasmine B',
      titleAr: 'ياسمين B',
      descEn: 'Centrally-located residences providing quick access to the sports club and pools.',
      descAr: 'مساكن ذات موقع مركزي توفر وصولاً سريعاً إلى النادي الرياضي والمسابح.',
    },
    jasmineA: {
      titleEn: 'Jasmine A',
      titleAr: 'ياسمين A',
      descEn: 'Premium apartments featuring private double-height lounge spaces and central park views.',
      descAr: 'شقق متميزة تتميز بصالات خاصة بارتفاع مزدوج وإطلالات على الحديقة المركزية.',
    },
    camelliaB: {
      titleEn: 'Camellia B',
      titleAr: 'كاميليا B',
      descEn: 'Sophisticated contemporary block with top-floor penthouses and infinity pool decks.',
      descAr: 'كتلة معاصرة راقية مع شقق بنتهاوس في الطابق العلوي وإطلالات على المسابح.',
    },
    camelliaA: {
      titleEn: 'Camellia A',
      titleAr: 'كاميليا A',
      descEn: 'Sleek luxury units facing the eastern valley park with custom premium finishes.',
      descAr: 'وحدات فاخرة أنيقة تواجه حديقة الوادي الشرقية مع تشطيبات مخصصة فائقة الجودة.',
    },
    lavender: {
      titleEn: 'Lavender Valley',
      titleAr: 'وادي اللافندر',
      descEn: 'Scenic recreational park landscape featuring continuous waterways and outdoor lounges.',
      descAr: 'حديقة ترفيهية خلابة تتميز بمجاري مائية مستمرة وجلسات خارجية هادئة.',
    },
    lily: {
      titleEn: 'Lily Gardens',
      titleAr: 'حدائق الزنبق',
      descEn: 'Beautiful family activity zone with children playparks and sun-lounger pool decks.',
      descAr: 'منطقة أنشطة عائلية جميلة مع حدائق ألعاب للأطفال ومسابح واسعة.',
    },
    tulipB: {
      titleEn: 'Tulip B',
      titleAr: 'توليب B',
      descEn: 'Eastern premium block featuring open-view duplexes and lush peripheral gardens.',
      descAr: 'كتلة شرقية ممتازة تتميز بشقق دوبلكس ذات إطلالة مفتوحة وحدائق محيطية مورقة.',
    },
    tulipA: {
      titleEn: 'Tulip A',
      titleAr: 'توليب A',
      descEn: 'Elegant luxury homes adjacent to the forest trail with maximum privacy layouts.',
      descAr: 'منازل فاخرة أنيقة مجاورة لمسار الغابة مع مخططات توفر أقصى درجات الخصوصية.',
    },
  };

  const navLinks = [
    { id: 'magnoliaB', label: t.residences.clusters.magnoliaB, x: 220, y: 555, dotX: 150, dotY: 330, path: 'M 250 555 L 170 555 L 170 380 L 150 330' },
    { id: 'magnoliaA', label: t.residences.clusters.magnoliaA, x: 220, y: 525, dotX: 200, dotY: 310, path: 'M 250 525 L 250 380 L 200 310' },
    { id: 'orchidB', label: t.residences.clusters.orchidB, x: 280, y: 70, dotX: 280, dotY: 300, path: 'M 280 80 L 280 300' },
    { id: 'orchidA', label: t.residences.clusters.orchidA, x: 340, y: 70, dotX: 330, dotY: 310, path: 'M 340 80 L 340 280 L 330 310' },
    { id: 'jasmineB', label: t.residences.clusters.jasmineB, x: 480, y: 70, dotX: 480, dotY: 305, path: 'M 480 80 L 480 305' },
    { id: 'jasmineA', label: t.residences.clusters.jasmineA, x: 540, y: 70, dotX: 530, dotY: 310, path: 'M 540 80 L 540 280 L 530 310' },
    { id: 'camelliaB', label: t.residences.clusters.camelliaB, x: 680, y: 70, dotX: 670, dotY: 310, path: 'M 680 80 L 680 280 L 670 310' },
    { id: 'camelliaA', label: t.residences.clusters.camelliaA, x: 740, y: 70, dotX: 720, dotY: 305, path: 'M 740 80 L 740 305' },
    { id: 'lavender', label: t.residences.clusters.lavender, x: 450, y: 545, dotX: 420, dotY: 420, path: 'M 450 535 L 420 535 L 420 420' },
    { id: 'lily', label: t.residences.clusters.lily, x: 580, y: 545, dotX: 580, dotY: 425, path: 'M 580 535 L 580 425' },
    { id: 'tulipB', label: t.residences.clusters.tulipB, x: 740, y: 535, dotX: 760, dotY: 315, path: 'M 740 525 L 740 380 L 760 315' },
    { id: 'tulipA', label: t.residences.clusters.tulipA, x: 740, y: 565, dotX: 840, dotY: 320, path: 'M 740 555 L 840 555 L 840 320' },
  ];

  // Unique clusters list for mobile picker
  const mobileSelectorList = [
    { id: 'magnoliaA', label: t.residences.clusters.magnoliaA },
    { id: 'magnoliaB', label: t.residences.clusters.magnoliaB },
    { id: 'orchidA', label: t.residences.clusters.orchidA },
    { id: 'orchidB', label: t.residences.clusters.orchidB },
    { id: 'jasmineA', label: t.residences.clusters.jasmineA },
    { id: 'jasmineB', label: t.residences.clusters.jasmineB },
    { id: 'camelliaA', label: t.residences.clusters.camelliaA },
    { id: 'camelliaB', label: t.residences.clusters.camelliaB },
    { id: 'lavender', label: t.residences.clusters.lavender },
    { id: 'lily', label: t.residences.clusters.lily },
    { id: 'tulipA', label: t.residences.clusters.tulipA },
    { id: 'tulipB', label: t.residences.clusters.tulipB },
  ];

  useEffect(() => {
    pathsRef.current.forEach((path) => {
      if (path) {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
      }
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 25 },
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
        mapContainerRef.current,
        { opacity: 0, scale: 0.97, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );

      gsap.to(pathsRef.current, {
        strokeDashoffset: 0,
        duration: 1.4,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: mapContainerRef.current,
          start: 'top 55%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      id="residences"
      ref={sectionRef}
      sx={{
        backgroundColor: '#ffffff', // Premium warm layout theme matching page 2
        py: { xs: 8, sm: 10, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        px: { xs: 2, sm: 4, md: 8, lg: 10 },

        // borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      }}
    >
      <Container maxWidth="xl" >
        {/* Section Heading */}
        <Box ref={titleRef} sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"CS Brandis", serif',
              fontWeight: 300,
              fontSize: { xs: '32px', sm: '42px', md: '50px' },
              color: '#3D362E',
              lineHeight: 1.2,
              mb: 1.5,
              textAlign: lang === 'ar' ? 'right' : 'left',
            }}
          >
            {displayTitle}
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Silka", sans-serif',
              fontSize: { xs: '11px', sm: '13px' },
              fontWeight: 600,
              letterSpacing: '0.2em',
              color: '#7C7368',
              textTransform: 'uppercase',
              textAlign: lang === 'ar' ? 'right' : 'left',
            }}
          >
            {displaySubtitle}
          </Typography>
        </Box>

        {/* Masterplan Explorer Card Wrapper */}
        <Box
          ref={mapContainerRef}
          sx={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#ffffff',
            // borderRadius: { xs: '16px', md: '24px' },
            overflow: 'hidden',
            // boxShadow: '0 16px 48px rgba(61, 54, 46, 0.08)',
            // border: '1px solid rgba(0, 0, 0, 0.03)',
            // p: { xs: 1.5, sm: 2, md: 3 },
          }}
        >

          <Box
            component="img"
            src={displayImage}
            alt="Park View Yaafour Garden Promenade"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              borderRadius:"25px"
            }}
          />
        </Box>
      </Container>
     
      {/* Keyframe pulse animation stylesheet injection */}
      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(0.9);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.4);
            opacity: 0.1;
          }
          100% {
            transform: scale(0.9);
            opacity: 0;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
}
