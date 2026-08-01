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
      name: 'bullets',
      title: 'Amenities Bullet List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Amenity Label', type: 'localizedString' }),
            defineField({ name: 'icon', title: 'Icon Identifier Name', type: 'string' }),
          ]
        }
      ]
    })
  ],
});
