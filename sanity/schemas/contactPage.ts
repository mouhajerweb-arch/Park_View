import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', initialValue: 'Contact Page', readOnly: true }),
    defineField({ name: 'seo', title: 'SEO Settings', type: 'seo' }),

    // Subpage Hero Configuration
    defineField({ name: 'heroTitle', title: 'Hero Banner Title', type: 'localizedString' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Banner Subtitle', type: 'localizedString' }),
    defineField({ name: 'heroImage', title: 'Hero Cover Image', type: 'image', options: { hotspot: true } }),

    defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string' }),
    defineField({ name: 'contactPhone', title: 'Contact Phone Number', type: 'string' }),
    defineField({ name: 'address', title: 'Physical Address', type: 'localizedString' }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        { type: 'faqSection' },
        { type: 'contactFormSection' },
        { type: 'amenitiesSection' },
      ]
    })
  ],
});
