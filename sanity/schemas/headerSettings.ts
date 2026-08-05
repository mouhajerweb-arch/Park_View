import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'headerSettings',
  title: 'Header Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Header Settings',
      readOnly: true,
    }),
    defineField({
      name: 'brandName',
      title: 'Brand Name Label',
      type: 'localizedString',
    }),
    defineField({
      name: 'logo',
      title: 'Header Logo',
      type: 'image',
    }),
    defineField({
      name: 'navItems',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'Navigation Item',
          fields: [
            { name: 'label', title: 'Bilingual Label', type: 'localizedString' },
            { name: 'path', title: 'Link Path or Anchor Link', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'registerButton',
      title: 'Register Button Configuration',
      type: 'object',
      fields: [
        { name: 'label', title: 'Bilingual Label', type: 'localizedString' },
        {
          name: 'styleOption',
          title: 'Button Styling Option',
          type: 'string',
          options: {
            list: [
              { title: 'Filled (Solid)', value: 'filled' },
              { title: 'Outlined (Bordered)', value: 'outlined' },
              { title: 'Text only', value: 'text' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'languageSwitch',
      title: 'Language Switcher Configuration',
      type: 'object',
      fields: [
        { name: 'showFlag', title: 'Show Flag Icon', type: 'boolean', initialValue: true },
        { name: 'englishFlag', title: 'English Flag SVG/Image', type: 'image' },
        { name: 'arabicFlag', title: 'Arabic Flag SVG/Image', type: 'image' },
      ],
    }),
  ],
});
