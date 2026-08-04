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
    defineField({
      name: 'mapImage',
      title: 'Map Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'mapImageEn',
      title: 'Map Image (English) - Legacy',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'mapImageAr',
      title: 'Map Image (Arabic) - Legacy',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'destinations',
      title: 'Destinations List',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'destinationItem',
          title: 'Destination Item',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'localizedString' }),
            defineField({ name: 'time', title: 'Travel Time (e.g. 20 mins)', type: 'string' }),
            defineField({ name: 'icon', title: 'Icon Key (e.g. monument, airport, hospital, mall)', type: 'string' }),
          ]
        }
      ]
    })
  ],
});
