import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'locationSecuritySection',
  title: 'Location Security Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'anchor', title: 'Anchor Link ID', type: 'string' }),
    defineField({ name: 'title', title: 'Section Title', type: 'localizedString' }),
    
    // Row 1
    defineField({ name: 'row1Title', title: 'Row 1 Title', type: 'localizedString' }),
    defineField({ name: 'row1Desc', title: 'Row 1 Description', type: 'localizedText' }),
    defineField({ name: 'row1Image', title: 'Row 1 Image', type: 'image', options: { hotspot: true } }),

    // Row 2
    defineField({ name: 'row2Title', title: 'Row 2 Title', type: 'localizedString' }),
    defineField({ name: 'row2Desc', title: 'Row 2 Description', type: 'localizedText' }),
    defineField({ name: 'row2Image', title: 'Row 2 Image', type: 'image', options: { hotspot: true } }),
  ],
});
