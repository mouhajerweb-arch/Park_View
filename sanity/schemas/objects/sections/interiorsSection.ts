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
      name: 'tabs',
      title: 'Interior Tabs',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'interiorTab',
          title: 'Interior Tab',
          fields: [
            defineField({ name: 'tabId', title: 'Tab ID (e.g. dining, bedroom, bathroom)', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'tabName', title: 'Tab Label', type: 'localizedString', validation: (Rule) => Rule.required() }),
            defineField({ name: 'tabDescription', title: 'Tab Description', type: 'localizedText' }),
            defineField({
              name: 'images',
              title: 'Tab Images',
              description: 'Upload one or more images for this tab. Some tabs like Bathroom may have 2 images (e.g. closet + bathroom).',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
                    defineField({ name: 'alt', title: 'Alt Text', type: 'localizedString' }),
                    defineField({ name: 'layout', title: 'Grid Width', type: 'string', options: { list: [{ title: 'Full Width', value: 'full' }, { title: 'One Third (4/12)', value: 'oneThird' }, { title: 'Two Thirds (8/12)', value: 'twoThirds' }, { title: 'Half (6/12)', value: 'half' }] }, initialValue: 'full' }),
                  ],
                  preview: {
                    select: { title: 'alt.en', media: 'image' },
                  }
                }
              ],
              validation: (Rule) => Rule.max(6),
            }),
          ],
          preview: {
            select: { title: 'tabName.en', subtitle: 'tabId' },
          }
        }
      ],
      validation: (Rule) => Rule.max(10),
    }),
    defineField({
      name: 'slides',
      title: 'Interior Images Slideshow (Legacy)',
      description: 'Legacy slideshow field. Use the Tabs array above instead for per-tab images.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'image', title: 'Image File', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'caption', title: 'Caption Text', type: 'localizedString' }),
          ]
        }
      ],
      hidden: true,
    })
  ],
});
