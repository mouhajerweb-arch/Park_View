import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'blogPage',
  title: 'Blogs Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', initialValue: 'Blogs Page', readOnly: true }),
    defineField({ name: 'seo', title: 'SEO Settings', type: 'seo' }),
    defineField({ name: 'heroTitle', title: 'Hero Banner Title', type: 'localizedString' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Banner Subtitle', type: 'localizedString' }),
    defineField({ name: 'heroImage', title: 'Hero Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroImagePath', title: 'Fallback Hero Image Path', type: 'string' }),
    defineField({ name: 'introEyebrow', title: 'Intro Eyebrow', type: 'localizedString' }),
    defineField({ name: 'introTitle', title: 'Intro Title', type: 'localizedString' }),
    defineField({ name: 'introText', title: 'Intro Text', type: 'localizedText' }),
    defineField({
      name: 'articleLabels',
      title: 'Article Page Labels',
      type: 'object',
      fields: [
        defineField({ name: 'readArticle', title: 'Read Article Button', type: 'localizedString' }),
        defineField({ name: 'backToBlogs', title: 'Back to Blogs Label', type: 'localizedString' }),
        defineField({ name: 'relatedTitle', title: 'Related Posts Title', type: 'localizedString' }),
        defineField({ name: 'notFoundTitle', title: 'Not Found Title', type: 'localizedString' }),
      ],
    }),
  ],
});
