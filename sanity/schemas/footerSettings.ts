import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'footerSettings',
  title: 'Footer Settings',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Footer Config Name', type: 'string', initialValue: 'Footer Settings', readOnly: true }),
    defineField({ name: 'copyrightText', title: 'Copyright Text', type: 'localizedString' }),
    defineField({ name: 'disclaimerText', title: 'Disclaimer Text', type: 'localizedText' }),
  ],
});
