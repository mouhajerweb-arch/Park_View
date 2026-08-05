'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Grid2 as Grid, Typography } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './Header';
import FooterSection from './FooterSection';
import { useLanguage } from '../context/LanguageContext';
import { client, optimizedImageUrl } from '../sanity/client';

gsap.registerPlugin(ScrollTrigger);

export default function LegalPage({ documentId, fallback }) {
  const { lang, markHeroReady } = useLanguage();
  const [pageData, setPageData] = useState(null);
  const introRef = useRef(null);
  const listRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    let active = true;
    client
      .fetch(`*[_type == "legalPage" && _id == $documentId][0] {
        ...,
        "imageUrl": image.asset->url
      }`, { documentId })
      .then((data) => {
        if (active) setPageData(data || {});
      })
      .catch((err) => {
        console.warn('Error fetching legal page:', err);
        if (active) setPageData({});
      });
    return () => {
      active = false;
    };
  }, [documentId]);

  const data = pageData || fallback;
  const title = data?.title?.[lang] || data?.title?.en || fallback.title.en;
  const intro = data?.intro?.[lang] || data?.intro?.en || fallback.intro.en;
  const sidebarEyebrow = data?.sidebarEyebrow?.[lang] || data?.sidebarEyebrow?.en || fallback.sidebarEyebrow.en;
  const sidebarTitle = data?.sidebarTitle?.[lang] || data?.sidebarTitle?.en || fallback.sidebarTitle.en;
  const contactLead = data?.contactLead?.[lang] || data?.contactLead?.en || fallback.contactLead.en;
  const contactEmail = data?.contactEmail || fallback.contactEmail;
  const imageStatement = data?.imageStatement?.[lang] || data?.imageStatement?.en || fallback.imageStatement.en;
  const imageUrl = optimizedImageUrl(data?.imageUrl, { width: 1800, quality: 84 }) || fallback.imageUrl;
  const sections = data?.sections?.length ? data.sections : fallback.sections;

  useEffect(() => {
    if (pageData === null) return;
    if (!imageUrl) {
      markHeroReady();
      return;
    }

    const image = new Image();
    image.onload = () => markHeroReady();
    image.onerror = () => markHeroReady();
    image.src = imageUrl;
  }, [imageUrl, markHeroReady, pageData]);

  useEffect(() => {
    document.title = `${title} | Park View Yaafour`;
    const metaTag = document.querySelector('meta[name="description"]');
    const metaDescription = data?.seo?.metaDescription?.[lang] || data?.seo?.metaDescription?.en || intro;
    if (metaTag) metaTag.setAttribute('content', metaDescription);
  }, [data, intro, lang, title]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(introRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' });
      gsap.to(imageRef.current, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
      gsap.fromTo(
        listRef.current?.children || [],
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 78%' },
        }
      );
    });
    return () => ctx.revert();
  }, [documentId]);

  return (
    <main dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ overflowX: 'hidden', backgroundColor: '#F6F2EC' }}>
      <Header />

      <Box sx={{ pt: { xs: 16, md: 20 }, pb: { xs: 7, md: 10 }, backgroundColor: '#F6F2EC' }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 6, md: 10, lg: 12 } }}>
          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="end">
            <Grid size={{ xs: 12, md: 7 }}>
              <Box ref={introRef}>
                <Typography
                  sx={{
                    fontFamily: '"Silka", sans-serif',
                    fontSize: '0.78rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#8E857B',
                    mb: 2.5,
                  }}
                >
                  Park View Yaafour
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    fontFamily: '"CS Brandis", serif',
                    fontWeight: 400,
                    fontSize: { xs: '2.9rem', sm: '4.6rem', md: '5.8rem' },
                    lineHeight: 0.98,
                    color: '#2B2825',
                    mb: 3,
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Silka", sans-serif',
                    fontWeight: 300,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    lineHeight: 1.85,
                    color: '#6B6661',
                    maxWidth: 760,
                  }}
                >
                  {intro}
                </Typography>
              </Box>
            </Grid>
            {/* <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ height: { xs: 260, md: 390 }, overflow: 'hidden', position: 'relative' }}>
                <Box
                  ref={imageRef}
                  sx={{
                    position: 'absolute',
                    inset: '-10% 0',
                    backgroundImage: `linear-gradient(rgba(31, 42, 34, 0.18), rgba(31, 42, 34, 0.34)), url('${imageUrl}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: 'scale(1.08)',
                  }}
                />
              </Box>
            </Grid> */}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 8, md: 11 }, backgroundColor: '#FAF7F3' }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 6, md: 10, lg: 12 } }}>
          <Grid container spacing={{ xs: 5, md: 8 }} alignItems="flex-start">
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ position: { md: 'sticky' }, top: { md: 110 } }}>
                <Typography sx={{ fontFamily: '"Silka", sans-serif', fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8E857B', mb: 2 }}>
                  {sidebarEyebrow}
                </Typography>
                <Typography sx={{ fontFamily: '"CS Brandis", serif', fontSize: { xs: '2rem', md: '2.8rem' }, lineHeight: 1.08, color: '#2B2825', mb: 3 }}>
                  {sidebarTitle}
                </Typography>
                <Typography sx={{ fontFamily: '"Silka", sans-serif', fontSize: '0.95rem', lineHeight: 1.8, color: '#6B6661' }}>
                  {contactLead}{' '}
                  <Box component="a" href={`mailto:${contactEmail}`} sx={{ color: '#2B2825', textDecoration: 'none', borderBottom: '1px solid #2B2825' }}>
                    {contactEmail}
                  </Box>
                  .
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Box ref={listRef}>
                {sections.map((item, index) => {
                  const heading = item.heading?.[lang] || item.heading?.en || '';
                  const body = item.body?.[lang] || item.body?.en || '';
                  return (
                    <Box key={item._key || heading || index} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '72px 1fr' }, gap: { xs: 1.5, sm: 3 }, py: { xs: 3, md: 3.6 }, borderTop: '1px solid rgba(43, 40, 37, 0.12)' }}>
                      <Typography sx={{ fontFamily: '"Silka", sans-serif', fontSize: '0.8rem', letterSpacing: '0.14em', color: '#8E857B', pt: 0.4 }}>
                        {String(index + 1).padStart(2, '0')}
                      </Typography>
                      <Box>
                        <Typography sx={{ fontFamily: '"CS Brandis", serif', fontSize: { xs: '1.35rem', md: '1.65rem' }, lineHeight: 1.2, color: '#2B2825', mb: 1.2 }}>
                          {heading}
                        </Typography>
                        <Typography sx={{ fontFamily: '"Silka", sans-serif', fontWeight: 300, fontSize: { xs: '0.94rem', md: '1rem' }, lineHeight: 1.85, color: '#6B6661', whiteSpace: 'pre-line' }}>
                          {body}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ minHeight: { xs: 330, md: 460 }, backgroundImage: `linear-gradient(rgba(31, 42, 34, 0.58), rgba(31, 42, 34, 0.58)), url('${imageUrl}')`, backgroundSize: 'cover', backgroundAttachment: { xs: 'scroll', md: 'fixed' }, backgroundPosition: 'center', display: 'flex', alignItems: 'center' }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 6, md: 10, lg: 12 } }}>
          <Typography sx={{ fontFamily: '"CS Brandis", serif', fontSize: { xs: '2rem', md: '3.8rem' }, lineHeight: 1.05, color: '#FAF7F3', maxWidth: 760 }}>
            {imageStatement}
          </Typography>
        </Container>
      </Box>

      <FooterSection />
    </main>
  );
}
