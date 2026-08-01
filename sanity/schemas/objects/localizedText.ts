import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'text', rows: 4 }),
    defineField({ name: 'ar', title: 'Arabic', type: 'text', rows: 4 }),
  ],
});
