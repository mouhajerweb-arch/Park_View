import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'curatedLivingSection',
  title: 'Curated Living Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'anchor', title: 'Anchor Link ID', type: 'string' }),
    defineField({ name: 'title', title: 'Section Title', type: 'localizedString' }),
    defineField({ name: 'paragraph1', title: 'Paragraph 1', type: 'localizedText' }),
    defineField({ name: 'paragraph2', title: 'Paragraph 2', type: 'localizedText' }),
    defineField({ name: 'largeImage', title: 'Large Full-Bleed Image', type: 'image', options: { hotspot: true } }),
  ],
});
