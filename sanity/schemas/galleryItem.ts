import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'galleryItem',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Image Title', type: 'localizedString', validation: (Rule) => Rule.required() }),
    defineField({ name: 'subtitle', title: 'Image Subtitle', type: 'localizedString' }),
    defineField({ name: 'image', title: 'Gallery Image File', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: {
      title: 'title.en',
      media: 'image',
    },
  },
});
