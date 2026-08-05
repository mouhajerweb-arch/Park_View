import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'contactFormSection',
  title: 'Contact Form Section',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'anchor', title: 'Anchor Link ID', type: 'string' }),

    // Left column: Contact info
    defineField({ name: 'eyebrow', title: 'Eyebrow Text (e.g. Get in Touch)', type: 'localizedString' }),
    defineField({ name: 'title', title: 'Section Title', type: 'localizedString' }),
    defineField({ name: 'description', title: 'Section Description', type: 'localizedText' }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
    defineField({ name: 'email', title: 'Email Address', type: 'string' }),
    defineField({ name: 'address', title: 'Address', type: 'localizedString' }),
    defineField({ name: 'whatsappNumber', title: 'WhatsApp Number (digits only, e.g. 963993306655)', type: 'string' }),
    defineField({ name: 'mapEmbedUrl', title: 'Google Maps Embed URL', type: 'url', validation: (Rule) => Rule.uri({ allowRelative: false, scheme: ['https'] }) }),
    defineField({ name: 'mapLatitude', title: 'Map Latitude', type: 'number' }),
    defineField({ name: 'mapLongitude', title: 'Map Longitude', type: 'number' }),

    // Right column: Form
    defineField({ name: 'formEyebrow', title: 'Form Eyebrow Text (e.g. Register Interest)', type: 'localizedString' }),
    defineField({ name: 'formTitle', title: 'Form Title', type: 'localizedString' }),
    defineField({ name: 'formDescription', title: 'Form Description', type: 'localizedText' }),
    defineField({ name: 'submitButtonText', title: 'Submit Button Label', type: 'localizedString' }),

    // Form field labels
    defineField({
      name: 'formLabels',
      title: 'Form Field Labels',
      type: 'object',
      fields: [
        defineField({ name: 'firstName', title: 'First Name Label', type: 'localizedString' }),
        defineField({ name: 'lastName', title: 'Last Name Label', type: 'localizedString' }),
        defineField({ name: 'email', title: 'Email Label', type: 'localizedString' }),
        defineField({ name: 'phone', title: 'Phone Label', type: 'localizedString' }),
        defineField({ name: 'remarks', title: 'Remarks Label', type: 'localizedString' }),
      ]
    }),

    // Success / Error messages
    defineField({ name: 'successMessage', title: 'Success Message', type: 'localizedString' }),
    defineField({ name: 'errorMessage', title: 'Validation Error Message', type: 'localizedString' }),
  ],
});
