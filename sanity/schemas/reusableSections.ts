import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'reusableSections',
  title: 'Centralized Sections',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Centralized Sections', readOnly: true }),
    defineField({ name: 'prestigeSection', title: 'About Section', type: 'prestigeSection' }),
    defineField({ name: 'developerProfileSection', title: 'Developer Profile Section', type: 'developerProfileSection' }),
    defineField({ name: 'connectivitySection', title: 'Connectivity Section', type: 'connectivitySection' }),
    defineField({ name: 'residencesSection', title: 'Residences Section', type: 'residencesSection' }),
    defineField({ name: 'interiorsSection', title: 'Interiors Section', type: 'interiorsSection' }),
    defineField({ name: 'gallerySection', title: 'Gallery Section', type: 'gallerySection' }),
    defineField({ name: 'amenitiesSection', title: 'Amenities Section', type: 'amenitiesSection' }),
    defineField({ name: 'contactFormSection', title: 'Contact Form Section', type: 'contactFormSection' }),
  ],
});
