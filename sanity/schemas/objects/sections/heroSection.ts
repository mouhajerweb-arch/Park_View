import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'anchor', title: 'Anchor Link ID', type: 'string' }),
    defineField({ name: 'eyebrow', title: 'Eyebrow Text', type: 'localizedString' }),
    defineField({ name: 'title', title: 'Main Title', type: 'localizedString' }),
    defineField({ name: 'subtitle', title: 'Subtitle Text', type: 'localizedString' }),
    defineField({ name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'cta',
      title: 'Call to Action Button',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Label', type: 'localizedString' }),
        defineField({ name: 'link', title: 'Link (URL or anchor)', type: 'string' }),
      ]
    })
  ],
});
