import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'interiorsSection',
  title: 'Interiors Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'anchor', title: 'Anchor Link ID', type: 'string' }),
    defineField({ name: 'eyebrow', title: 'Eyebrow Text', type: 'localizedString' }),
    defineField({ name: 'title', title: 'Section Title', type: 'localizedString' }),
    defineField({ name: 'description', title: 'Description Text', type: 'localizedText' }),
    defineField({
      name: 'slides',
      title: 'Interior Images Slideshow',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'image', title: 'Image File', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'caption', title: 'Caption Text', type: 'localizedString' }),
          ]
        }
      ]
    })
  ],
});
