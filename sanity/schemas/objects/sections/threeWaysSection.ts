import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'threeWaysSection',
  title: 'Three Ways / Phases Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'anchor', title: 'Anchor Link ID', type: 'string' }),
    defineField({ name: 'title', title: 'Section Title', type: 'localizedString' }),
    defineField({ name: 'description', title: 'Section Description', type: 'localizedText' }),
    defineField({ name: 'largeImage', title: 'Large Cover Image', type: 'image', options: { hotspot: true } }),

    // Tab Phases details
    defineField({
      name: 'phases',
      title: 'Phases Configurations',
      type: 'object',
      fields: [
        defineField({ name: 'orchidTitle', title: 'Orchid Title', type: 'localizedString' }),
        defineField({ name: 'orchidDesc', title: 'Orchid Description', type: 'localizedText' }),
        defineField({ name: 'lavenderTitle', title: 'Lavender Title', type: 'localizedString' }),
        defineField({ name: 'lavenderDesc', title: 'Lavender Description', type: 'localizedText' }),
        defineField({ name: 'magnoliaTitle', title: 'Magnolia Title', type: 'localizedString' }),
        defineField({ name: 'magnoliaDesc', title: 'Magnolia Description', type: 'localizedText' }),
      ]
    })
  ],
});
