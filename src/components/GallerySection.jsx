'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { client, urlFor } from '../sanity/client';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: '/images/luxury-entry.jpg', titleEn: 'Grand Gateway', titleAr: 'البوابة الكبرى', subtitleEn: 'Main entrance security gatehouse', subtitleAr: 'بوابة الحراسة والأمان للمدخل الرئيسي' },
  { src: '/images/harmony-pool.jpg', titleEn: 'Oasis Pool', titleAr: 'مسبح الواحة', subtitleEn: 'Mediterranean landscape swimming pool', subtitleAr: 'مسبح منسق على الطراز المتوسطي' },
  { src: '/images/interior-dining.jpg', titleEn: 'Dining Salon', titleAr: 'صالون الطعام', subtitleEn: 'Luxury finished dining room design', subtitleAr: 'تصميم داخلي فاخر لغرفة الطعام' },
  { src: '/images/interior-bedroom.jpg', titleEn: 'Master Suite', titleAr: 'الجناح الرئيسي', subtitleEn: 'Expansive master bedroom design', subtitleAr: 'تصميم جناح غرفة النوم الرئيسية الفسيحة' },
  { src: '/images/curated-garden.jpg', titleEn: 'Green Promenade', titleAr: 'الممر الأخضر', subtitleEn: 'Manicured gardens & walking paths', subtitleAr: 'الحدائق المنسقة ومسارات المشي الهادئة' },
  { src: '/images/prestige-tranquility.jpg', titleEn: 'Courtyard Facade', titleAr: 'واجهة الفناء', subtitleEn: 'Mediterranean building facades overview', subtitleAr: 'واجهات معمارية على الطراز المتوسطي' },
  { src: '/images/curated-garden.jpg', titleEn: 'Tranquil Gardens', titleAr: 'الحدائق الهادئة', subtitleEn: 'More space for life outdoors', subtitleAr: 'مساحات أكبر للمعيشة الخارجية الهادئة' },
  { src: '/images/harmony-pool.jpg', titleEn: 'Sunset Reflections', titleAr: 'انعكاسات الغروب', subtitleEn: 'Evening ambient pool lighting', subtitleAr: 'إضاءة المساء الهادئة للمسبح السكني' }
];

export default function GallerySection() {
  const { lang } = useLanguage();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeDot, setActiveDot] = useState(0); 
  const [zoomedImage, setZoomedImage] = useState(null);
  const [clickCoords, setClickCoords] = useState(null);

  const [galleryList, setGalleryList] = useState(galleryImages);
  const [sectionMeta, setSectionMeta] = useState({
    eyebrow: { en: 'PARK VIEW IN IMAGES', ar: 'بارك فيو في صور' },
    title: { en: 'Visual Gallery', ar: 'المعرض المرئي' },
    description: {
      en: 'Browse perspective renders detailing the architectural beauty and visual details of Park View Yaafour.',
      ar: 'تصفح لقطات حقيقية ولقطات منظورية لجمال الفيلات الفاخرة والمساحات الخضراء المنسقة والمرافق السكنية في بارك فيو.'
    }
  });

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const carouselWrapperRef = useRef(null);
  const trackRef = useRef(null);
  const overlayRef = useRef(null);
  const textOverlayRef = useRef(null);

  // Dragging event state refs
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragOffset = useRef(0);
  const dragStartOffset = useRef(0);

  // Scroll offset state refs
  const originalScrollRef = useRef(0);

  // Dynamic layout dimension states
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [slideWidth, setSlideWidth] = useState(640);
  const slideGap = 12;    
  const step = slideWidth + slideGap; 

  const N = galleryList.length;
  const tripleImages = [...galleryList, ...galleryList, ...galleryList];
  const currentIndexRef = useRef(N);

  // Fetch gallery list and page section metadata from Sanity
  useEffect(() => {
    let active = true;

    // Fetch visual assets
    client.fetch(`*[_type == "galleryItem"] | order(order asc)`).then((data) => {
      if (!active) return;
      if (data && data.length > 0) {
        setGalleryList(
          data.map((item) => ({
            src: item.image ? urlFor(item.image).url() : '',
            titleEn: item.title?.en || '',
            titleAr: item.title?.ar || '',
            subtitleEn: item.subtitle?.en || '',
            subtitleAr: item.subtitle?.ar || '',
          }))
        );
    }).catch((err) => console.warn('Gallery items fetch failed:', err));

    // Fetch section descriptors
    client.fetch(`*[_type == "page" && _id == "home"][0].sections[_type == "gallerySection"][0]`).then((data) => {
      if (!active) return;
      if (data) {
        setSectionMeta({
          eyebrow: {
            en: data.eyebrow?.en || 'PARK VIEW IN IMAGES',
            ar: data.eyebrow?.ar || 'بارك فيو في صور'
          },
          title: {
            en: data.title?.en || 'Visual Gallery',
            ar: data.title?.ar || 'المعرض المرئي'
          },
          description: {
            en: data.description?.en || '',
            ar: data.description?.ar || ''
          }
        });
      }
    }).catch((err) => console.warn('Gallery section meta fetch failed:', err));

    return () => {
      active = false;
    };
  }, []);

  // Measure container and dynamically set slide widths for LTR/RTL peaks balance
  useEffect(() => {
    const handleResize = () => {
      if (carouselWrapperRef.current) {
        const w = carouselWrapperRef.current.offsetWidth;
        setWrapperWidth(w);
        
        let newSlideWidth = 640;
        if (w < 600) {
          newSlideWidth = w - 80;  // Mobile: 40px peaks on left/right
        } else if (w < 960) {
          newSlideWidth = w - 120; // Tablet: 60px peaks on left/right
        } else {
          newSlideWidth = 640;     // Desktop: perfectly centered with equal peaks
        }
        setSlideWidth(newSlideWidth);

        // Instantly position track centered
        const centerOffset = (w - newSlideWidth) / 2;
        const newStep = newSlideWidth + slideGap;
        gsap.set(trackRef.current, { x: -currentIndexRef.current * newStep + centerOffset });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [slideWidth, N]);

  // Handle N changes
  useEffect(() => {
    currentIndexRef.current = N;
    setActiveDot(0);
    if (carouselWrapperRef.current && trackRef.current) {
      const w = carouselWrapperRef.current.offsetWidth;
      const centerOffset = (w - slideWidth) / 2;
      gsap.set(trackRef.current, { x: -N * step + centerOffset });
    }
  }, [N, slideWidth, step]);

  // Autoplay circular loop starts automatically on mount without user interaction
  useEffect(() => {
    if (zoomedImage) return;

    const interval = setInterval(() => {
      if (!isDragging.current) {
        handleNext();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [zoomedImage, activeDot, slideWidth, wrapperWidth, N]);

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

      // Reveal carousel container
      gsap.fromTo(
        carouselWrapperRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: carouselWrapperRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Seamless Infinite Next Centered Slide
  const handleNext = () => {
    if (isTransitioning || !trackRef.current) return;
    setIsTransitioning(true);

    const nextIndex = currentIndexRef.current + 1;
    const centerOffset = (wrapperWidth - slideWidth) / 2;
    const nextOffset = -nextIndex * step + centerOffset;
    const nextDot = (activeDot + 1) % N;

    setActiveDot(nextDot);

    gsap.to(trackRef.current, {
      x: nextOffset,
      duration: 0.55,
      ease: 'power3.out',
      onComplete: () => {
        currentIndexRef.current = nextIndex;
        if (currentIndexRef.current >= 2 * N) {
          currentIndexRef.current = N;
          gsap.set(trackRef.current, { x: -N * step + centerOffset });
        }
        setIsTransitioning(false);
      }
    });
  };

  // Seamless Infinite Prev Centered Slide
  const handlePrev = () => {
    if (isTransitioning || !trackRef.current) return;
    setIsTransitioning(true);

    const prevIndex = currentIndexRef.current - 1;
    const centerOffset = (wrapperWidth - slideWidth) / 2;
    const prevOffset = -prevIndex * step + centerOffset;
    const prevDot = activeDot === 0 ? N - 1 : activeDot - 1;

    setActiveDot(prevDot);

    gsap.to(trackRef.current, {
      x: prevOffset,
      duration: 0.55,
      ease: 'power3.out',
      onComplete: () => {
        currentIndexRef.current = prevIndex;
        if (currentIndexRef.current <= 0) {
          currentIndexRef.current = N;
          gsap.set(trackRef.current, { x: -N * step + centerOffset });
        }
        setIsTransitioning(false);
      }
    });
  };

  // Clickable dots to slide directly to target image centered
  const handleDotClick = (dotIndex) => {
    if (isTransitioning || dotIndex === activeDot || !trackRef.current) return;
    setIsTransitioning(true);
    setActiveDot(dotIndex);

    const targetIndex = N + dotIndex;
    const centerOffset = (wrapperWidth - slideWidth) / 2;
    const targetOffset = -targetIndex * step + centerOffset;

    gsap.to(trackRef.current, {
      x: targetOffset,
      duration: 0.55,
      ease: 'power3.out',
      onComplete: () => {
        currentIndexRef.current = targetIndex;
        setIsTransitioning(false);
      }
    });
  };

  // Swipe Dragging Event Handlers
  const handleDragStart = (clientX) => {
    if (isTransitioning || zoomedImage || !trackRef.current) return;
    isDragging.current = true;
    startX.current = clientX;
    dragStartOffset.current = gsap.getProperty(trackRef.current, 'x') || 0;
  };

  const handleDragMove = (clientX) => {
    if (!isDragging.current || !trackRef.current) return;
    const diff = clientX - startX.current;
    dragOffset.current = diff;
    
    // Butter-smooth follow-cursor drag interpolation
    gsap.to(trackRef.current, {
      x: dragStartOffset.current + diff,
      duration: 0.15,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    // If the movement was tiny, treat it as a click: reset dragOffset and exit.
    if (Math.abs(dragOffset.current) < 5) {
      dragOffset.current = 0;
      return;
    }
    
    const finalX = dragStartOffset.current + dragOffset.current;
    const centerOffset = (wrapperWidth - slideWidth) / 2;

    // Calculate nearest index from where the user left the drag
    let nearestIndex = Math.round((centerOffset - finalX) / step);

    // Keep loop indexing wrap limits within boundaries infinitely
    if (nearestIndex >= 2 * N) {
      nearestIndex -= N;
      gsap.set(trackRef.current, { x: finalX + N * step });
    } else if (nearestIndex <= 0) {
      nearestIndex += N;
      gsap.set(trackRef.current, { x: finalX - N * step });
    }

    currentIndexRef.current = nearestIndex;
    setActiveDot((nearestIndex - N + N) % N);

    const targetOffset = -nearestIndex * step + centerOffset;
    setIsTransitioning(true);

    // Smoothly slide back and snap to the nearest centered item
    gsap.to(trackRef.current, {
      x: targetOffset,
      duration: 0.5,
      ease: 'power3.out',
      onComplete: () => {
        setIsTransitioning(false);
        // Delay resetting dragOffset so we can block zoom click correctly
        setTimeout(() => {
          dragOffset.current = 0;
        }, 50);
      }
    });
  };

  const handleSlideClick = (e, img) => {
    if (Math.abs(dragOffset.current) > 10) return;
    handleImageClick(e, img);
  };

  // Glitch-Free viewport-relative FLIP Zoom-In from clicked element's location
  const handleImageClick = (e, img) => {
    if (isTransitioning) return;
    
    const cardRect = e.currentTarget.getBoundingClientRect();
    
    // Coordinates relative to the viewport (for position: fixed overlay)
    const coords = {
      top: cardRect.top,
      left: cardRect.left,
      width: cardRect.width,
      height: cardRect.height,
    };
    
    setClickCoords(coords);
    setZoomedImage(img);

    // Save current scroll position before scrolling automatically
    originalScrollRef.current = window.scrollY;

    // Stop previous tweens and synchronously lock starting position
    gsap.killTweensOf(overlayRef.current);
    gsap.set(overlayRef.current, {
      display: 'block',
      pointerEvents: 'auto',
      top: coords.top,
      left: coords.left,
      width: coords.width,
      height: coords.height,
      opacity: 1,
    });

    // Prevent page scrolling while fullscreen image is open
    document.body.style.overflow = 'hidden';
    if (window.lenis) {
      window.lenis.stop();
    }

    // Expand modal to occupy the exact window screen viewport (100vw and 100vh)
    gsap.to(overlayRef.current, {
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      duration: 0.8,
      ease: 'power4.inOut',
    });

    // Animate text elements inside the overlay
    if (textOverlayRef.current) {
      gsap.fromTo(
        textOverlayRef.current.children,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          delay: 0.4,
          ease: 'power2.out',
        }
      );
    }
  };

  // Zoom-out back to original place in the slider and scroll back to initial viewport
  const handleCloseZoom = () => {
    if (overlayRef.current && clickCoords) {
      if (textOverlayRef.current) {
        gsap.to(textOverlayRef.current.children, {
          opacity: 0,
          y: -15,
          duration: 0.3,
          stagger: 0.05,
        });
      }

      // Restore body scrolling and Lenis
      document.body.style.overflow = '';
      if (window.lenis) {
        window.lenis.start();
      }

      // Animate overlay back to the exact viewport-relative starting position
      gsap.to(overlayRef.current, {
        top: clickCoords.top,
        left: clickCoords.left,
        width: clickCoords.width,
        height: clickCoords.height,
        duration: 0.8,
        ease: 'power4.inOut',
        onComplete: () => {
          gsap.set(overlayRef.current, {
            display: 'none',
            pointerEvents: 'none'
          });
          setZoomedImage(null);
          setClickCoords(null);
        }
      });
    }
  };

  return (
    <Box
      id="gallery"
      ref={sectionRef}
      className="brochure-section"
      sx={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#FFFFFF',
        py: { xs: 8, md: 14 },
        px: { xs: 3, sm: 6, md: 10, lg: 12 },
        borderBottom: '1px solid rgba(61, 54, 46, 0.05)',
        overflow: 'hidden',
        minHeight: '85vh',
      }}
    >
      <Container maxWidth="xl" sx={{ pr: { md: 8 } }}>
        {/* Header Title */}
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
            {sectionMeta.eyebrow[lang] || sectionMeta.eyebrow.en}
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
              width: '100%',
              letterSpacing: '-0.01em',
            }}
          >
            {sectionMeta.title[lang] || sectionMeta.title.en}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: '"Silka", sans-serif',
              fontWeight: 300,
              fontSize: '0.96rem',
              color: '#6B6661',
              textAlign: 'start',
              width: '100%',
              maxWidth: '650px',
              mb: 2
            }}
          >
            {sectionMeta.description[lang] || sectionMeta.description.en}
          </Typography>
        </Box>


        {/* Slidable Carousel Wrapper Inside Container */}
        <Box 
          ref={carouselWrapperRef}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
          dir="ltr"
          sx={{ 
            position: 'relative', 
            width: '100%', 
            overflow: 'hidden',
            py: 2,
            cursor: isDragging.current ? 'grabbing' : 'grab',
            userSelect: 'none',
            WebkitUserSelect: 'none'
          }}
        >
          {/* Slidable Carousel Track Container */}
          <Box
            ref={trackRef}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: 'max-content',
              pointerEvents: 'auto'
            }}
          >
            {tripleImages.map((img, idx) => (
              <Box
                key={idx}
                onClick={(e) => handleSlideClick(e, img)}
                sx={{
                  width: `${slideWidth}px`, 
                  height: { xs: '200px', sm: '340px', md: '440px' }, 
                  mx: `${slideGap / 2}px`, 
                  borderRadius: 0, 
                  overflow: 'hidden',
                  cursor: 'pointer',
                  flexShrink: 0,
                  position: 'relative',
                  transition: 'transform 0.4s ease',
                  '&:hover': {
                    transform: 'scale(1.012)'
                  }
                }}
              >
                <Box
                  component="img"
                  src={img.src}
                  alt={lang === 'ar' ? img.titleAr : img.titleEn}
                  draggable="false"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    borderRadius: 0,
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Dot Indicators Pagination Navigation Bar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 4,
            mb: 1,
          }}
        >
          {galleryList.map((_, dotIndex) => {
            const isActive = dotIndex === activeDot;
            return (
              <Box
                key={dotIndex}
                onClick={() => handleDotClick(dotIndex)}
                sx={{
                  width: isActive ? '20px' : '8px', 
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: isActive ? '#3D362E' : '#D8D3CD',
                  mx: '5px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                  '&:hover': {
                    backgroundColor: isActive ? '#3D362E' : '#7C7368'
                  }
                }}
              />
            );
          })}
        </Box>
      </Container>

      {/* Viewport-relative fixed fullscreen overlay */}
      <Box
        ref={overlayRef}
        sx={{
          position: 'fixed', // Fixed to window screen viewport (100vw and 100vh)
          zIndex: 1500, // Display over headers and Lenis smooth scrolls
          backgroundColor: '#1E1A16',
          display: 'none',
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {zoomedImage && (
          <>
            <Box
              component="img"
              src={zoomedImage.src}
              alt={lang === 'ar' ? zoomedImage.titleAr : zoomedImage.titleEn}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            
            {/* Vignette shade */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                // backgroundColor: 'rgba(30, 26, 22, 0.3)',
                backgroundImage: 'linear-gradient(to bottom, rgba(30, 26, 22, 0.1) 0%, rgba(30, 26, 22, 0.7) 100%)',
                zIndex: 1
              }}
            />

            {/* Close button */}
            <IconButton
              onClick={handleCloseZoom}
              sx={{
                position: 'absolute',
                top: { xs: 16, md: 30 },
                right: lang === 'ar' ? 'auto' : { xs: 16, md: 30 },
                left: lang === 'ar' ? { xs: 16, md: 30 } : 'auto',
                color: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
                zIndex: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)'
                }
              }}
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>

            {/* Responsive Left Bottom Caption Details */}
            <Box
              ref={textOverlayRef}
              sx={{
                position: 'absolute',
                bottom: { xs: 24, md: 50 },
                left: lang === 'ar' ? 'auto' : { xs: 20, md: 50 },
                right: lang === 'ar' ? { xs: 20, md: 50 } : 'auto',
                color: '#FFFFFF',
                textAlign: lang === 'ar' ? 'right' : 'left',
                zIndex: 2,
                maxWidth: '650px',
                px: { xs: 2, md: 0 }
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"CS Brandis", serif',
                  fontSize: { xs: '1.4rem', sm: '2rem', md: '2.5rem' }, // Responsive font size
                  lineHeight: 1.2,
                  mb: 1.5,
                  textShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
              >
                {lang === 'ar' ? zoomedImage.titleAr : zoomedImage.titleEn}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Silka", sans-serif',
                  fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1.05rem' }, // Responsive font size
                  fontWeight: 300,
                  opacity: 0.9,
                  letterSpacing: '0.02em',
                  textShadow: '0 1px 4px rgba(0,0,0,0.2)'
                }}
              >
                {lang === 'ar' ? zoomedImage.subtitleAr : zoomedImage.subtitleEn}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}