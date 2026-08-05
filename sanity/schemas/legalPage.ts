import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'legalPage',
  title: 'Legal Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'localizedString' }),
    defineField({ name: 'intro', title: 'Intro Text', type: 'localizedText' }),
    defineField({ name: 'sidebarEyebrow', title: 'Sidebar Eyebrow', type: 'localizedString' }),
    defineField({ name: 'sidebarTitle', title: 'Sidebar Title', type: 'localizedText' }),
    defineField({ name: 'contactLead', title: 'Contact Lead Text', type: 'localizedText' }),
    defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string' }),
    defineField({ name: 'image', title: 'Image Section', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'imageStatement', title: 'Image Statement', type: 'localizedText' }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'legalSection',
          title: 'Legal Section',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'localizedString' }),
            defineField({ name: 'body', title: 'Body', type: 'localizedText' }),
          ],
          preview: {
            select: { title: 'heading.en', subtitle: 'body.en' },
          },
        },
      ],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title.en' },
  },
});
