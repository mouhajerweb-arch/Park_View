'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Container, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Header from '../../../components/Header';
import FooterSection from '../../../components/FooterSection';
import { useLanguage } from '../../../context/LanguageContext';
import { client, optimizedImageUrl } from '../../../sanity/client';
import { fallbackBlogPage, fallbackBlogPosts } from '../../../content/blogContent';

const text = (value, lang, fallback = '') => value?.[lang] || value?.en || fallback;

const formatDate = (date, lang) => {
  if (!date) return '';
  return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-SY' : 'en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
};

const getImage = (source, width = 1600) => optimizedImageUrl(source, { width, quality: 84 });

export default function BlogPostPage() {
  const params = useParams();
  const { lang, navigateWithLoader, markHeroReady } = useLanguage();
  const slug = params?.slug;
  const fallbackPost = fallbackBlogPosts.find((post) => post.slug?.current === slug);
  const [pageData, setPageData] = useState(fallbackBlogPage);
  const [post, setPost] = useState(fallbackPost || null);
  const [relatedPosts, setRelatedPosts] = useState(
    fallbackBlogPosts.filter((item) => item.slug?.current !== slug).slice(0, 2)
  );

  useEffect(() => {
    let active = true;
    client
      .fetch(
        `{
          "post": *[_type == "blogPost" && slug.current == $slug][0] {
            ...,
            "imageUrl": image.asset->url,
            contentBlocks[] {
              ...,
              "imageUrl": image.asset->url
            }
          },
          "related": *[_type == "blogPost" && slug.current != $slug] | order(order asc, publishedAt desc)[0...2] {
            ...,
            "imageUrl": image.asset->url
          },
          "page": *[_type == "blogPage" && _id == "blogPage"][0] {
            ...
          }
        }`,
        { slug }
      )
      .then((data) => {
        if (!active) return;
        if (data?.page) setPageData({ ...fallbackBlogPage, ...data.page });
        if (data?.post) setPost(data.post);
        if (data?.related?.length) setRelatedPosts(data.related);
      })
      .catch((err) => console.warn('Error fetching blog post:', err));

    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    document.title = `${text(post.title, lang)} | Park View Yaafour`;
    const metaTag = document.querySelector('meta[name="description"]');
    if (metaTag) metaTag.setAttribute('content', text(post.excerpt, lang));
  }, [post, lang]);

  useEffect(() => {
    if (!post) {
      markHeroReady();
      return;
    }
    const imageUrl = getImage(post.image || post.imageUrl || post.imagePath, 2200);
    const image = new Image();
    image.onload = () => markHeroReady();
    image.onerror = () => markHeroReady();
    image.src = imageUrl;
  }, [post, markHeroReady]);

  const labels = pageData?.articleLabels || fallbackBlogPage.articleLabels;
  const backLabel = text(labels?.backToBlogs, lang, lang === 'ar' ? 'العودة إلى المدونة' : 'Back to blogs');
  const relatedTitle = text(labels?.relatedTitle, lang, lang === 'ar' ? 'مقالات ذات صلة' : 'More from the journal');
  const notFoundTitle = text(labels?.notFoundTitle, lang, lang === 'ar' ? 'المقال غير متوفر' : 'Article not found');

  if (!post) {
    return (
      <main dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ overflowX: 'hidden' }}>
        <Header />
        <Box sx={{ minHeight: '70vh', display: 'grid', placeItems: 'center', backgroundColor: '#F7F4EF', px: 3 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontFamily: '"CS Brandis", serif', fontSize: { xs: '2.3rem', md: '3.4rem' }, color: '#1E1A16', mb: 2 }}>
              {notFoundTitle}
            </Typography>
            <Button onClick={() => navigateWithLoader(`/blogs/${lang}`)} sx={{ color: '#7C7368', fontFamily: '"Guise", sans-serif' }}>
              {backLabel}
            </Button>
          </Box>
        </Box>
        <FooterSection showForm={false} />
      </main>
    );
  }

  const blocks = post.contentBlocks?.length
    ? post.contentBlocks
    : [{ _type: 'blogTextBlock', text: post.body }];

  return (
    <main dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ overflowX: 'hidden' }}>
      <Header />

      <Box
        component="section"
        sx={{
          position: 'relative',
          minHeight: { xs: '82vh', md: '96vh' },
          display: 'flex',
          alignItems: 'flex-end',
          backgroundColor: '#1E1A16',
          color: '#FFFFFF',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={getImage(post.image || post.imageUrl || post.imagePath, 2200)}
          alt={text(post.title, lang)}
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.78 }}
        />
        <Box sx={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to bottom, rgba(30,26,22,0.2), rgba(30,26,22,0.92))' }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pb: { xs: 7, md: 10 }, px: { xs: 3, md: 4 } }}>
          <Button
            onClick={() => navigateWithLoader(`/blogs/${lang}`)}
            startIcon={lang === 'ar' ? null : <ArrowBackIcon />}
            endIcon={lang === 'ar' ? <ArrowForwardIcon /> : null}
            sx={{ color: '#FFFFFF', fontFamily: '"Guise", sans-serif', mb: 4, px: 0 }}
          >
            {backLabel}
          </Button>
          {/* <Chip
            label={text(post.category, lang)}
            sx={{ borderRadius: 0, backgroundColor: '#C8BEB0', color: '#1E1A16', fontFamily: '"Guise", sans-serif', mb: 3 }}
          /> */}
          <Typography
            variant="h1"
            sx={{
              fontFamily: '"CS Brandis", serif',
              fontWeight: 300,
              fontSize: { xs: '3rem', sm: '4.2rem', md: '5.5rem' },
              lineHeight: 1.02,
              maxWidth: '980px',
              textAlign: lang === 'ar' ? 'right' : 'left',
            }}
          >
            {text(post.title, lang)}
          </Typography>
          <Typography sx={{ mt: 3, fontFamily: '"Guise", sans-serif', color: 'rgba(255,255,255,0.72)', fontSize: '0.82rem' }}>
            {formatDate(post.publishedAt, lang)} / {text(post.readTime, lang)}
          </Typography>
        </Container>
      </Box>

      <Box component="article" sx={{ backgroundColor: '#F7F4EF', color: '#1E1A16', py: { xs: 7, md: 11 } }}>
        <Container maxWidth="md">
          <Typography
            sx={{
              fontFamily: '"Silka", sans-serif',
              fontSize: { xs: '1.08rem', md: '1.28rem' },
              lineHeight: 1.9,
              color: '#5D554D',
              mb: { xs: 5, md: 7 },
              textAlign: lang === 'ar' ? 'right' : 'left',
            }}
          >
            {text(post.excerpt, lang)}
          </Typography>

          {blocks.map((block, index) => {
            if (block._type === 'blogImageBlock') {
              return (
                <Box key={block._key || index} sx={{ my: { xs: 5, md: 8 } }}>
                  <Box
                    component="img"
                    src={getImage(block.image || block.imageUrl || block.imagePath, 1500)}
                    alt={text(block.caption, lang, text(post.title, lang))}
                    sx={{ width: '100%', aspectRatio: { xs: '4 / 3', md: '16 / 9' }, objectFit: 'cover', display: 'block' }}
                  />
                  {text(block.caption, lang) && (
                    <Typography sx={{ mt: 1.5, fontFamily: '"Guise", sans-serif', color: '#7C7368', fontSize: '0.78rem', textAlign: lang === 'ar' ? 'right' : 'left' }}>
                      {text(block.caption, lang)}
                    </Typography>
                  )}
                </Box>
              );
            }

            if (block._type === 'blogQuoteBlock') {
              return (
                <Box key={block._key || index} sx={{ my: { xs: 5, md: 7 }, py: 4, borderTop: '1px solid rgba(124,115,104,0.35)', borderBottom: '1px solid rgba(124,115,104,0.35)' }}>
                  <Typography sx={{ fontFamily: '"CS Brandis", serif', fontSize: { xs: '1.8rem', md: '2.5rem' }, lineHeight: 1.22, color: '#3D362E', textAlign: 'center' }}>
                    {text(block.quote, lang)}
                  </Typography>
                </Box>
              );
            }

            return (
              <Box key={block._key || index} sx={{ mb: { xs: 4.5, md: 6 }, textAlign: lang === 'ar' ? 'right' : 'left' }}>
                {text(block.heading, lang) && (
                  <Typography sx={{ fontFamily: '"CS Brandis", serif', fontSize: { xs: '2rem', md: '2.7rem' }, lineHeight: 1.18, fontWeight: 300, mb: 2 }}>
                    {text(block.heading, lang)}
                  </Typography>
                )}
                <Typography sx={{ fontFamily: '"Silka", sans-serif', fontSize: { xs: '1rem', md: '1.08rem' }, lineHeight: 1.95, color: '#5D554D', whiteSpace: 'pre-line' }}>
                  {text(block.text, lang, text(post.body, lang))}
                </Typography>
              </Box>
            );
          })}
        </Container>
      </Box>

      {!!relatedPosts.length && (
        <Box component="section" sx={{ backgroundColor: '#FFFFFF', py: { xs: 7, md: 10 } }}>
          <Container maxWidth="lg">
            <Typography sx={{ fontFamily: '"CS Brandis", serif', fontSize: { xs: '2.2rem', md: '3.2rem' }, fontWeight: 300, mb: 4, textAlign: lang === 'ar' ? 'right' : 'left' }}>
              {relatedTitle}
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
              {relatedPosts.map((item) => (
                <Box
                  key={item._id}
                  onClick={() => navigateWithLoader(`/blogs/${item.slug?.current}/${lang}`)}
                  sx={{ cursor: 'pointer', display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '180px 1fr' }, gap: 2.5, alignItems: 'center', textAlign: lang === 'ar' ? 'right' : 'left' }}
                >
                  <Box component="img" src={getImage(item.image || item.imageUrl || item.imagePath, 700)} alt={text(item.title, lang)} sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover' }} />
                  <Box>
                    <Typography sx={{ fontFamily: '"Guise", sans-serif', color: '#7C7368', fontSize: '0.75rem', mb: 1 }}>
                      {text(item.category, lang)}
                    </Typography>
                    <Typography sx={{ fontFamily: '"CS Brandis", serif', fontSize: { xs: '1.5rem', md: '1.9rem' }, lineHeight: 1.16 }}>
                      {text(item.title, lang)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>
      )}

      <FooterSection showForm={false} />
    </main>
  );
}

