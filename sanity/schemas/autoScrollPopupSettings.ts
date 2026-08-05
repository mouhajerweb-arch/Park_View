import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'autoScrollPopupSettings',
  title: 'Auto Scroll Popup Settings',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Config Name', type: 'string', initialValue: 'Auto Scroll Popup Settings', readOnly: true }),
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'scrollThreshold', title: 'Scroll Trigger Threshold (px)', type: 'number', initialValue: 1400 }),
    defineField({ name: 'image', title: 'Popup Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'imagePath', title: 'Fallback Image Path', type: 'string', description: 'Used when no image asset is uploaded. Example: /images/interiors-terrace.jpg' }),
    defineField({ name: 'eyebrow', title: 'Eyebrow Text', type: 'localizedString' }),
    defineField({ name: 'headline', title: 'Headline', type: 'localizedString' }),
    defineField({ name: 'description', title: 'Description', type: 'localizedText' }),
    defineField({ name: 'buttonText', title: 'WhatsApp Button Text', type: 'localizedString' }),
    defineField({ name: 'whatsappNumber', title: 'WhatsApp Number (digits only, e.g. 963993306655)', type: 'string' }),
    defineField({ name: 'whatsappMessage', title: 'WhatsApp Prefilled Message', type: 'localizedText' }),
  ],
});
