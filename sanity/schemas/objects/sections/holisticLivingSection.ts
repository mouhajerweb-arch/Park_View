import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'holisticLivingSection',
  title: 'Holistic Living Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'anchor', title: 'Anchor Link ID', type: 'string' }),
    defineField({ name: 'title', title: 'Section Title', type: 'localizedString' }),
    defineField({ name: 'description', title: 'Section Description', type: 'localizedText' }),
    defineField({
      name: 'clusters',
      title: 'Clusters List',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'clusterItem',
          title: 'Cluster Item',
          fields: [
            defineField({ name: 'clusterId', title: 'Cluster ID (e.g. orchid, magnolia)', type: 'string' }),
            defineField({ name: 'clusterName', title: 'Cluster Name', type: 'localizedString' }),
            defineField({ name: 'desc', title: 'Description', type: 'localizedText' }),
            defineField({ name: 'interiorImage', title: 'Interior Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'flowerImage', title: 'Secondary Image', type: 'image', options: { hotspot: true } }),
          ]
        }
      ]
    })
  ],
});
