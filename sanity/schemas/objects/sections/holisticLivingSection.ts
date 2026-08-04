import { defineType, defineField } from 'sanity';

const tabFields = [
  defineField({ name: 'subtitle', title: 'Tab Subtitle', type: 'localizedString' }),
  defineField({ name: 'title', title: 'Tab Title', type: 'localizedString' }),
  defineField({ name: 'description', title: 'Tab Description', type: 'localizedText' }),
  defineField({ name: 'image1', title: 'Main Image (Exterior)', type: 'image', options: { hotspot: true } }),
  defineField({ name: 'image2', title: 'Secondary Image (e.g. Pool)', type: 'image', options: { hotspot: true } }),
  defineField({ name: 'image3', title: 'Tertiary Image (e.g. Garden)', type: 'image', options: { hotspot: true } }),
];

export default defineType({
  name: 'holisticLivingSection',
  title: 'Holistic Living / Cluster Details Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'anchor', title: 'Anchor Link ID', type: 'string' }),
    defineField({
      name: 'orchid',
      title: 'Orchid Tab Details',
      type: 'object',
      fields: tabFields
    }),
    defineField({
      name: 'magnolia',
      title: 'Magnolia Tab Details',
      type: 'object',
      fields: tabFields
    }),
  ],
});
