import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'amenitiesSection',
  title: 'Amenities Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'anchor', title: 'Anchor Link ID', type: 'string' }),
    defineField({ name: 'eyebrow', title: 'Eyebrow Text', type: 'localizedString' }),
    defineField({ name: 'title', title: 'Section Title', type: 'localizedString' }),
    defineField({ name: 'description', title: 'Description Text', type: 'localizedText' }),
    defineField({
      name: 'amenities',
      title: 'Amenities List',
      description: 'Add amenity items with icon images and bilingual names.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'amenityItem',
          title: 'Amenity',
          fields: [
            defineField({ name: 'name', title: 'Amenity Name', type: 'localizedString', validation: (Rule) => Rule.required() }),
            defineField({ name: 'icon', title: 'Icon Image (PNG)', type: 'image', description: 'Upload amenity icon (PNG with transparent background recommended).' }),
          ],
          preview: {
            select: { title: 'name.en', media: 'icon' },
          }
        }
      ],
      validation: (Rule) => Rule.max(20),
    }),
  ],
});
