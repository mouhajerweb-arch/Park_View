import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'gallerySection',
  title: 'Gallery Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'anchor', title: 'Anchor Link ID', type: 'string' }),
    defineField({ name: 'eyebrow', title: 'Eyebrow Text', type: 'localizedString' }),
    defineField({ name: 'title', title: 'Section Title', type: 'localizedString' }),
    defineField({ name: 'description', title: 'Description Text', type: 'localizedText' }),
    defineField({
      name: 'images',
      title: 'Gallery Carousel Images',
      description: 'Upload up to 20 images for the gallery carousel. Drag to reorder.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'galleryCarouselImage',
          title: 'Gallery Image',
          fields: [
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
            defineField({ name: 'title', title: 'Image Title', type: 'localizedString' }),
            defineField({ name: 'subtitle', title: 'Image Subtitle', type: 'localizedString' }),
          ],
          preview: {
            select: { title: 'title.en', media: 'image' },
          }
        }
      ],
      validation: (Rule) => Rule.max(20),
    }),
  ],
});
