import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'anchor', title: 'Anchor Link ID', type: 'string' }),
    defineField({ name: 'logo', title: 'Hero Brand Logo', type: 'image' }),
    defineField({ name: 'soonText', title: 'Soon / Coming Soon Text', type: 'localizedString' }),
    defineField({
      name: 'countdownTarget',
      title: 'Countdown Target Date (e.g. 2027-06-30T11:13:00+02:00)',
      type: 'string',
      initialValue: '2027-06-30T11:13:00+02:00',
    }),
    defineField({ name: 'daysLabel', title: 'Days Unit Label', type: 'localizedString' }),
    defineField({ name: 'hoursLabel', title: 'Hours Unit Label', type: 'localizedString' }),
    defineField({ name: 'minutesLabel', title: 'Minutes Unit Label', type: 'localizedString' }),
    defineField({ name: 'secondsLabel', title: 'Seconds Unit Label', type: 'localizedString' }),
    defineField({
      name: 'backgroundType',
      title: 'Background Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
      },
      initialValue: 'image',
    }),
    defineField({ name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'backgroundVideo',
      title: 'Background Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'backgroundVideoUrl',
      title: 'Or External Background Video URL',
      type: 'string',
    }),
  ],
});
