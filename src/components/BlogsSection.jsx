'use client';
import React from 'react';
import { Box, Container, Typography, Grid, Chip, Button } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useLanguage } from '../context/LanguageContext';
import { optimizedImageUrl } from '../sanity/client';

const text = (value, lang, fallback = '') => value?.[lang] || value?.en || fallback;
const postHref = (post, lang) => `/blogs/${post.slug?.current}/${lang}`;

const formatDate = (date, lang) => {
  if (!date) return '';
  return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-SY' : 'en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
};

export default function BlogsSection({ pageData, posts }) {
  const { lang, navigateWithLoader } = useLanguage();
  const featured = posts.find((post) => post.featured) || posts[0];
  const remaining = posts.filter((post) => post._id !== featured?._id);
  const readArticleLabel = text(pageData?.articleLabels?.readArticle, lang, lang === 'ar' ? 'اقرأ المقال' : 'Read article');
  const openPost = (post) => {
    if (!post?.slug?.current) return;
    navigateWithLoader(postHref(post, lang));
  };

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: '#F7F4EF',
        color: '#1E1A16',
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '0.85fr 1.15fr' },
            gap: { xs: 4, md: 8 },
            alignItems: 'end',
            mb: { xs: 6, md: 9 },
          }}
        >
          <Box sx={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
            <Typography
              sx={{
                fontFamily: '"Guise", sans-serif',
                fontSize: '0.78rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#7C7368',
                mb: 2,
              }}
            >
              {text(pageData?.introEyebrow, lang)}
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"CS Brandis", serif',
                fontSize: { xs: '2.35rem', sm: '3rem', md: '4rem' },
                fontWeight: 300,
                lineHeight: 1.08,
              }}
            >
              {text(pageData?.introTitle, lang)}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: '"Silka", sans-serif',
              fontSize: { xs: '0.98rem', md: '1.05rem' },
              lineHeight: 1.85,
              color: '#5D554D',
              maxWidth: '620px',
              textAlign: lang === 'ar' ? 'right' : 'left',
              justifySelf: lang === 'ar' ? 'start' : 'end',
            }}
          >
            {text(pageData?.introText, lang)}
          </Typography>
        </Box>

        {featured && (
          <Box
            component="article"
            onClick={() => openPost(featured)}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
              minHeight: { md: 520 },
              backgroundColor: '#1E1A16',
              color: '#FFFFFF',
              mb: { xs: 5, md: 7 },
              cursor: 'pointer',
              transition: 'transform 0.35s ease',
              '&:hover': { transform: { md: 'translateY(-4px)' } },
            }}
          >
            <Box
              component="img"
              src={optimizedImageUrl(featured.image || featured.imageUrl || featured.imagePath, { width: 1400, quality: 84 })}
              alt={text(featured.title, lang)}
              sx={{
                width: '100%',
                height: { xs: 330, md: '100%' },
                minHeight: { md: 520 },
                objectFit: 'cover',
              }}
            />
            <Box
              sx={{
                p: { xs: 3, sm: 5, md: 6 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: lang === 'ar' ? 'right' : 'left',
              }}
            >
              <Box>
                <Chip
                  label={text(featured.category, lang)}
                  sx={{
                    borderRadius: 0,
                    backgroundColor: '#C8BEB0',
                    color: '#1E1A16',
                    fontFamily: '"Guise", sans-serif',
                    mb: 3,
                  }}
                />
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"CS Brandis", serif',
                    fontSize: { xs: '2rem', md: '3.2rem' },
                    fontWeight: 300,
                    lineHeight: 1.12,
                    mb: 2.5,
                  }}
                >
                  {text(featured.title, lang)}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Silka", sans-serif',
                    color: 'rgba(255,255,255,0.78)',
                    fontSize: { xs: '0.95rem', md: '1rem' },
                    lineHeight: 1.85,
                  }}
                >
                  {text(featured.excerpt, lang)}
                </Typography>
              </Box>
              <Box sx={{ mt: 5 }}>
                <Typography
                  sx={{
                    fontFamily: '"Guise", sans-serif',
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.62)',
                    mb: 2,
                  }}
                >
                  {formatDate(featured.publishedAt, lang)} / {text(featured.readTime, lang)}
                </Typography>
                <Button
                  href={postHref(featured, lang)}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    openPost(featured);
                  }}
                  endIcon={lang === 'ar' ? null : <ArrowOutwardIcon />}
                  startIcon={lang === 'ar' ? <ArrowOutwardIcon /> : null}
                  sx={{
                    color: '#FFFFFF',
                    borderBottom: '1px solid rgba(255,255,255,0.45)',
                    borderRadius: 0,
                    px: 0,
                    fontFamily: '"Guise", sans-serif',
                  }}
                >
                  {readArticleLabel}
                </Button>
              </Box>
            </Box>
          </Box>
        )}

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {remaining.map((post) => (
            <Grid item xs={12} md={4} key={post._id}>
              <Box
                component="article"
                onClick={() => openPost(post)}
                sx={{
                  height: '100%',
                  textAlign: lang === 'ar' ? 'right' : 'left',
                  cursor: 'pointer',
                  '&:hover img': { transform: 'scale(1.035)' },
                  '&:hover .blog-title': { color: '#7C7368' },
                }}
              >
                <Box sx={{ overflow: 'hidden', mb: 2.5 }}>
                <Box
                  component="img"
                  src={optimizedImageUrl(post.image || post.imageUrl || post.imagePath, { width: 900, quality: 82 })}
                  alt={text(post.title, lang)}
                  sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: lang === 'ar' ? 'flex-end' : 'flex-start',
                    gap: 1,
                    color: '#7C7368',
                    mb: 1.5,
                  }}
                >
                  <CalendarTodayIcon sx={{ fontSize: 15 }} />
                  <Typography sx={{ fontFamily: '"Guise", sans-serif', fontSize: '0.72rem' }}>
                    {formatDate(post.publishedAt, lang)} / {text(post.readTime, lang)}
                  </Typography>
                </Box>
                <Typography
                  className="blog-title"
                  variant="h4"
                  sx={{
                    fontFamily: '"CS Brandis", serif',
                    fontSize: { xs: '1.7rem', md: '2rem' },
                    fontWeight: 300,
                    lineHeight: 1.16,
                    mb: 1.5,
                    transition: 'color 0.25s ease',
                  }}
                >
                  {text(post.title, lang)}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Silka", sans-serif',
                    color: '#5D554D',
                    lineHeight: 1.75,
                    fontSize: '0.92rem',
                  }}
                >
                  {text(post.excerpt, lang)}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

