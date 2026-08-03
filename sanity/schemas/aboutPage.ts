import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', initialValue: 'About Page', readOnly: true }),
    defineField({ name: 'seo', title: 'SEO Settings', type: 'seo' }),
    
    // Subpage Hero Configuration
    defineField({ name: 'heroTitle', title: 'Hero Banner Title', type: 'localizedString' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Banner Subtitle', type: 'localizedString' }),
    defineField({ name: 'heroImage', title: 'Hero Cover Image', type: 'image', options: { hotspot: true } }),

    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'prestigeSection' },
        { type: 'developerProfileSection' },
        { type: 'connectivitySection' },
        { type: 'residencesSection' },
        { type: 'floorPlansSection' },
        { type: 'interiorsSection' },
        { type: 'gallerySection' },
        { type: 'amenitiesSection' },
        { type: 'contactFormSection' },
      ]
    })
  ],
});
