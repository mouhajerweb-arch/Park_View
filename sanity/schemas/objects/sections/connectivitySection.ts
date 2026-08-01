import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'connectivitySection',
  title: 'Connectivity Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'anchor', title: 'Anchor Link ID', type: 'string' }),
    defineField({ name: 'eyebrow', title: 'Eyebrow Text', type: 'localizedString' }),
    defineField({ name: 'title', title: 'Section Title', type: 'localizedString' }),
    defineField({ name: 'description', title: 'Description Text', type: 'localizedText' }),
    defineField({ name: 'mapImage', title: 'Map Image', type: 'image', options: { hotspot: true } }),
  ],
});
