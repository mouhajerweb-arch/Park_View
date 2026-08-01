import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'developerProfileSection',
  title: 'Developer Profile / Biography Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'anchor', title: 'Anchor Link ID', type: 'string' }),
    defineField({ name: 'title', title: 'Developer Title', type: 'localizedString' }),
    defineField({ name: 'subtitle', title: 'Developer Subtitle', type: 'localizedString' }),
    defineField({ name: 'quote', title: 'Philosophy Quote', type: 'localizedText' }),
    defineField({ name: 'bio', title: 'Biography Text', type: 'localizedText' }),
    defineField({ name: 'profileImage', title: 'Developer Portrait Image', type: 'image', options: { hotspot: true } }),
  ],
});
