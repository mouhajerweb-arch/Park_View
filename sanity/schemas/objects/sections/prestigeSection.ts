import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'prestigeSection',
  title: 'Prestige Intro Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'anchor', title: 'Anchor Link ID', type: 'string' }),
    defineField({ name: 'title', title: 'Heading Title', type: 'localizedString' }),
    defineField({ name: 'body', title: 'Narrative Body Text', type: 'localizedText' }),
    defineField({ name: 'mainImage', title: 'Section Image', type: 'image', options: { hotspot: true } }),
  ],
});
