import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'locationPage',
  title: 'Location Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', initialValue: 'Location Page', readOnly: true }),
    defineField({ name: 'seo', title: 'SEO Settings', type: 'seo' }),
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
