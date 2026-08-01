import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'localizedString' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'localizedText' }),
    defineField({ name: 'shareImage', title: 'Share Image (OG Image)', type: 'image' }),
  ],
});
