import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'localizedString', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title.en', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'localizedText', validation: (Rule) => Rule.required() }),
    defineField({ name: 'body', title: 'Article Body', type: 'localizedText', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'contentBlocks',
      title: 'Article Content Blocks',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'blogTextBlock',
          title: 'Text Block',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'localizedString' }),
            defineField({ name: 'text', title: 'Text', type: 'localizedText' }),
          ],
        },
        {
          type: 'object',
          name: 'blogImageBlock',
          title: 'Image Block',
          fields: [
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'imagePath', title: 'Fallback Image Path', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'localizedString' }),
          ],
        },
        {
          type: 'object',
          name: 'blogQuoteBlock',
          title: 'Editorial Note',
          fields: [
            defineField({ name: 'quote', title: 'Quote', type: 'localizedText' }),
          ],
        },
      ],
    }),
    defineField({ name: 'category', title: 'Category', type: 'localizedString' }),
    defineField({ name: 'readTime', title: 'Read Time Label', type: 'localizedString' }),
    defineField({ name: 'publishedAt', title: 'Published Date', type: 'datetime' }),
    defineField({ name: 'featured', title: 'Featured Post', type: 'boolean', initialValue: false }),
    defineField({ name: 'image', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'imagePath', title: 'Fallback Image Path', type: 'string', description: 'Used when no Sanity image is uploaded. Example: /images/luxury-entry.jpg' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'category.en',
      media: 'image',
    },
  },
});
