import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'string' }),
    defineField({ name: 'ar', title: 'Arabic', type: 'string' }),
  ],
});
