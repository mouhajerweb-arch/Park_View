'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { client, urlFor } from '../sanity/client';

gsap.registerPlugin(ScrollTrigger);

export default function NatureSerenitySection() {
  const { t, lang } = useLanguage();
  
  const sectionRef = useRef(null);
  const textColRef = useRef(null);
  const titleRef = useRef(null);
  const smallImgRef = useRef(null);
  const p1Ref = useRef(null);
  const p2Ref = useRef(null);
  
  const largeImgColRef = useRef(null);
  const largeImgRef = useRef(null);

  const [secData, setSecData] = useState(null);

  useEffect(() => {
    let active = true;
    client
      .fetch(`*[_type == "aboutPage" && _id == "aboutPage"][0].sections[_type == "natureSerenitySection"][0] {
        ...,
        "smallImageUrl": smallImage.asset->url,
        "largeImageUrl": largeImage.asset->url
      }`)
      .then((data) => {
        if (active && data) {
          setSecData(data);
        }
      })
      .catch((err) => console.warn('Error fetching nature serenity section:', err));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text column content staggered reveal
      gsap.fromTo(
        [titleRef.current, smallImgRef.current, p1Ref.current, p2Ref.current],
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

      // Large image column fade & subtle zoom scale reveal
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

  // Resolve dynamic values
  const displayTitle = secData?.title?.[lang] || secData?.title?.en || t.natureSerenity.title;
  const displayParagraph1 = secData?.paragraph1?.[lang] || secData?.paragraph1?.en || t.natureSerenity.paragraph1;
  const displayParagraph2 = secData?.paragraph2?.[lang] || secData?.paragraph2?.en || t.natureSerenity.paragraph2;
  
  const displaySmallImg = secData?.smallImageUrl || "/images/nature-table-placeholder.jpg";
  const displayLargeImg = secData?.largeImageUrl || "/images/nature-interior-placeholder.jpg";

  return (
    <Box
      id="nature-serenity"
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
      {/* Left Column: Text & Small Image */}
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
          {/* Heading */}
          <Typography
            ref={titleRef}
            variant="h2"
            sx={{
              fontFamily: '"CS Brandis", serif',
              fontWeight: 300,
              fontSize: { xs: '2rem', sm: '2.4rem', md: '2.8rem', lg: '3.2rem' },
              lineHeight: 1.15,
              color: '#3D362E',
              mb: 4,
              textAlign: 'start',
              width: '100%',
              letterSpacing: '-0.01em',
            }}
          >
            {displayTitle}
          </Typography>

          {/* Small Portrait Image */}
          <Box
            ref={smallImgRef}
            sx={{
              width: '180px',
              height: '240px',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 10px 25px rgba(43, 40, 37, 0.05)',
              mb: 4,
              mx: lang === 'ar' ? 'auto' : '0',
              marginLeft: lang === 'ar' ? 'auto' : '0',
              marginRight: lang === 'ar' ? 'auto' : '0',
            }}
          >
            <Box
              component="img"
              src={displaySmallImg}
              alt="Nature table vignette"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Box>

          {/* Paragraph 1 */}
          <Typography
            ref={p1Ref}
            variant="body1"
            sx={{
              fontFamily: '"Silka", sans-serif',
              fontWeight: 300,
              fontSize: { xs: '0.94rem', md: '1rem' },
              lineHeight: 1.85,
              color: '#6B6661',
              mb: 3,
              textAlign: 'start',
              width: '100%',
            }}
          >
            {displayParagraph1}
          </Typography>

          {/* Paragraph 2 */}
          <Typography
            ref={p2Ref}
            variant="body1"
            sx={{
              fontFamily: '"Silka", sans-serif',
              fontWeight: 300,
              fontSize: { xs: '0.94rem', md: '1rem' },
              lineHeight: 1.85,
              color: '#6B6661',
              textAlign: 'start',
              width: '100%',
            }}
          >
            {displayParagraph2}
          </Typography>
        </Box>
      </Box>

      {/* Right Column: Full-Bleed Image (No Padding, Occupies Exactly 50% screen width) */}
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
          alt="Shaped by Nature luxury interior rendering"
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
    </Box>
  );
}
