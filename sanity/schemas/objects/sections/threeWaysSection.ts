import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'threeWaysSection',
  title: 'Three Ways / Phases Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'anchor', title: 'Anchor Link ID', type: 'string' }),
    defineField({ name: 'eyebrow', title: 'Eyebrow Text', type: 'localizedString' }),
    defineField({ name: 'title', title: 'Section Title', type: 'localizedString' }),
    defineField({ name: 'description', title: 'Section Description', type: 'localizedText' }),
    defineField({ name: 'largeImage', title: 'Large Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'phases',
      title: 'Phases Configurations',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'phaseItem',
          title: 'Phase Item',
          fields: [
            defineField({ name: 'phaseId', title: 'Phase ID (e.g. orchid, lavender, magnolia)', type: 'string' }),
            defineField({ name: 'phaseName', title: 'Phase Name', type: 'localizedString' }),
            defineField({ name: 'title', title: 'Title', type: 'localizedString' }),
            defineField({ name: 'progressLabel', title: 'Progress Label', type: 'localizedString' }),
            defineField({ name: 'desc', title: 'Description', type: 'localizedText' }),
            defineField({
              name: 'bullets',
              title: 'Bullets',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'label', title: 'Label', type: 'localizedString' })
                  ]
                }
              ]
            })
          ]
        }
      ]
    })
  ],
});
