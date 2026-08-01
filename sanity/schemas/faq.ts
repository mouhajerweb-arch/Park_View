import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'localizedString', validation: (Rule) => Rule.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'localizedText', validation: (Rule) => Rule.required() }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: {
      title: 'question.en',
      subtitle: 'question.ar',
    },
  },
});
