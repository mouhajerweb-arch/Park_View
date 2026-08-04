import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'faqSection',
  title: 'FAQ Section Header Config',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'anchor', title: 'Anchor Link ID', type: 'string' }),
    defineField({ name: 'title', title: 'FAQ Section Title', type: 'localizedString' }),
    defineField({ name: 'subtitle', title: 'FAQ Section Eyebrow Subtitle', type: 'localizedString' }),
  ],
});
