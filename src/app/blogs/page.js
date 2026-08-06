'use client';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import SubpageHero from '../../components/SubpageHero';
import BlogsSection from '../../components/BlogsSection';
import FooterSection from '../../components/FooterSection';
import { useLanguage } from '../../context/LanguageContext';
import { client } from '../../sanity/client';
import { fallbackBlogPage, fallbackBlogPosts } from '../../content/blogContent';

export default function BlogsPage() {
  const { lang } = useLanguage();
  const [pageData, setPageData] = useState(fallbackBlogPage);
  const [posts, setPosts] = useState(fallbackBlogPosts);

  useEffect(() => {
    let active = true;

    client
      .fetch(`{
        "page": *[_type == "blogPage" && _id == "blogPage"][0] {
          ...,
          "heroCoverUrl": heroImage.asset->url
        },
        "posts": *[_type == "blogPost"] | order(order asc, publishedAt desc) {
          ...,
          "imageUrl": image.asset->url
        }
      }`)
      .then((data) => {
        if (!active) return;
        if (data?.page) setPageData({ ...fallbackBlogPage, ...data.page });
        if (data?.posts?.length) setPosts(data.posts);
      })
      .catch((err) => {
        console.warn('Error fetching blog content:', err);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const metaTitle = pageData?.seo?.metaTitle?.[lang] || pageData?.seo?.metaTitle?.en;
    const metaDesc = pageData?.seo?.metaDescription?.[lang] || pageData?.seo?.metaDescription?.en;
    if (metaTitle) document.title = metaTitle;
    if (metaDesc) {
      const metaTag = document.querySelector('meta[name="description"]');
      if (metaTag) metaTag.setAttribute('content', metaDesc);
    }
  }, [pageData, lang]);

  return (
    <main dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ overflowX: 'hidden' }}>
      <Header />
      <SubpageHero
        bgImage={pageData.heroCoverUrl || pageData.heroImagePath || fallbackBlogPage.heroImagePath}
        titleEn={pageData.heroTitle?.en || fallbackBlogPage.heroTitle.en}
        titleAr={pageData.heroTitle?.ar || fallbackBlogPage.heroTitle.ar}
        subtitleEn={pageData.heroSubtitle?.en || fallbackBlogPage.heroSubtitle.en}
        subtitleAr={pageData.heroSubtitle?.ar || fallbackBlogPage.heroSubtitle.ar}
      />
      <BlogsSection pageData={pageData} posts={posts} />
      <FooterSection showForm={false} />
    </main>
  );
}
