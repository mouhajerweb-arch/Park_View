import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'luxuryLivingSection',
  title: 'Luxury Living Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'anchor', title: 'Anchor Link ID', type: 'string' }),
    defineField({ name: 'title', title: 'Section Title', type: 'localizedString' }),
    defineField({ name: 'paragraph', title: 'Narrative Paragraph', type: 'localizedText' }),
    defineField({ name: 'largeImage', title: 'Large Cover Image', type: 'image', options: { hotspot: true } }),
    
    // Stats
    defineField({
      name: 'stats',
      title: 'Statistics List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Stat Value (e.g. 50K)', type: 'string' }),
            defineField({ name: 'label', title: 'Stat Label', type: 'localizedString' }),
          ]
        }
      ]
    })
  ],
});
