import { defineType, defineField } from 'sanity';

const defaultDestinations = [
  {
    label: { en: 'to central Damascus & Umayyad Square', ar: 'إلى وسط دمشق وساحة الأمويين' },
    time: '15 minute',
    icon: 'monument',
  },
  {
    label: { en: 'to Shami Hospital', ar: 'إلى مشفى الشامي' },
    time: '15 minute',
    icon: 'hospital',
  },
  {
    label: { en: 'to Uptown', ar: 'إلى ابتاون' },
    time: '15 minute',
    icon: 'uptown',
  },
  {
    label: { en: 'to Sham City Center', ar: 'إلى شام سيتي سنتر' },
    time: '15 minute',
    icon: 'mall',
  },
  {
    label: { en: 'to Abbasiyyin International Stadium', ar: 'إلى ملعب العباسيين الدولي' },
    time: '25 minute',
    icon: 'stadium',
  },
  {
    label: { en: 'to Damascus International Airport', ar: 'إلى مطار دمشق الدولي' },
    time: '35 minute',
    icon: 'airport',
  },
];

export default defineType({
  name: 'connectivitySection',
  title: 'Connectivity Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'anchor', title: 'Anchor Link ID', type: 'string' }),
    defineField({ name: 'eyebrow', title: 'Eyebrow Text', type: 'localizedString' }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'localizedString',
      initialValue: {
        en: 'Heart of Connectivity.',
        ar: 'في قلب شبكة المواصلات.',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description Text',
      type: 'localizedText',
      initialValue: {
        en: 'Effortless Access to Damascus',
        ar: 'وصول سهل وسريع إلى دمشق',
      },
    }),
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
      initialValue: defaultDestinations,
      of: [
        {
          type: 'object',
          name: 'destinationItem',
          title: 'Destination Item',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'localizedString' }),
            defineField({ name: 'time', title: 'Travel Time (e.g. 20 mins)', type: 'string' }),
            defineField({ name: 'icon', title: 'Icon Key (e.g. monument, airport, hospital, mall)', type: 'string' }),
            defineField({
              name: 'iconImage',
              title: 'Upload Icon',
              type: 'image',
              description: 'Upload destination icon image.',
              options: { hotspot: false },
            }),
          ],
          preview: {
            select: {
              title: 'label.en',
              subtitle: 'time',
              media: 'iconImage',
            },
          },
        }
      ]
    })
  ],
});
