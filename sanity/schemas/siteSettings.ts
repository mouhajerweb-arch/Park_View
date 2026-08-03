import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Site Title Config Name', type: 'string', initialValue: 'Site Settings', readOnly: true }),
    defineField({ name: 'siteName', title: 'Site Name', type: 'localizedString', description: 'Browser tab title prefix' }),
    defineField({ name: 'logo', title: 'Site Logo', type: 'image' }),
    defineField({ name: 'favicon', title: 'Favicon Icon', type: 'image', description: 'Upload a favicon (.png or .ico format recommended)' }),
    defineField({ name: 'contactPhone', title: 'Contact Phone Number', type: 'string' }),
    defineField({ name: 'whatsappNumber', title: 'WhatsApp Number (no spaces, e.g. 963997711226)', type: 'string' }),
    defineField({ name: 'defaultSeo', title: 'Default SEO Metadata', type: 'seo' }),
  ],
});
