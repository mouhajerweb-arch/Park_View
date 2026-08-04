import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'page',
  title: 'Standard Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Page Slug', type: 'slug', options: { source: 'title' } }),
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
        { type: 'natureSerenitySection' },
        { type: 'naturalHarmonySection' },
        { type: 'curatedLivingSection' },
        { type: 'locationSecuritySection' },
        { type: 'luxuryLivingSection' },
        { type: 'threeWaysSection' },
        { type: 'holisticLivingSection' },
        { type: 'faqSection' },
      ]
    })
  ],
});
