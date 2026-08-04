import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'naturalHarmonySection',
  title: 'Natural Harmony Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'anchor', title: 'Anchor Link ID', type: 'string' }),
    defineField({ name: 'title', title: 'Section Title', type: 'localizedString' }),
    defineField({ name: 'paragraph', title: 'Description Paragraph', type: 'localizedText' }),
    defineField({
      name: 'bullets',
      title: 'Bullets List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'localizedString' }),
            defineField({
              name: 'icon',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Garden', value: 'garden' },
                  { title: 'Lake', value: 'lake' },
                  { title: 'Fitness', value: 'fitness' },
                  { title: 'Meditation', value: 'meditation' },
                  { title: 'Terrace', value: 'terrace' },
                  { title: 'Walking', value: 'walking' },
                ]
              }
            }),
          ]
        }
      ]
    }),
    defineField({ name: 'largeImage', title: 'Large Full-Bleed Image', type: 'image', options: { hotspot: true } }),
  ],
});
