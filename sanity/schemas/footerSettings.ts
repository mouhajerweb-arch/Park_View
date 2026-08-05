import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'footerSettings',
  title: 'Footer Settings',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Footer Config Name', type: 'string', initialValue: 'Footer Settings', readOnly: true }),
    
    // Column 1
    defineField({ name: 'col1Title', title: 'Column 1 Title', type: 'localizedString' }),
    defineField({ name: 'col1Text', title: 'Column 1 Text', type: 'localizedText' }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'platform', title: 'Platform', type: 'string', options: { list: ['facebook', 'twitter', 'instagram', 'whatsapp'] } }),
            defineField({ name: 'url', title: 'URL', type: 'string' }),
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' }
          }
        }
      ]
    }),

    // Column 2
    defineField({ name: 'col2Title', title: 'Column 2 Title', type: 'localizedString' }),
    defineField({ name: 'col2Text', title: 'Column 2 Text', type: 'localizedText' }),

    // Column 3
    defineField({ name: 'col3Title', title: 'Column 3 Title', type: 'localizedString' }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
    defineField({ name: 'whatsappNumber', title: 'WhatsApp Number', type: 'string' }),
    defineField({ name: 'email', title: 'Email Address', type: 'string' }),
    defineField({ name: 'address', title: 'Address Text', type: 'localizedString' }),
    defineField({ name: 'mapsUrl', title: 'Google Maps Link', type: 'string' }),

    // Bottom
    defineField({ name: 'copyrightText', title: 'Copyright Text Template', type: 'localizedString' }),
  ],
});
