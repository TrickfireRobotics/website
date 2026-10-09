import {defineType, defineField} from 'sanity'

/**
 * Sanity schema for an officer.
 * @typedef {Object} Officer
 * @property {string} name - The name of the officer.
 * @property {image} image - Portrait of the officer.
 * @property {string} position - Position of the officer.
 * @property {string} type - Type of the officer.
 * @property {string} section - Section where the person appears on the About Us page.
 * @property {number} displayOrder - Position within the person's section.
 */
export const officerType = defineType({
  name: 'officers',
  title: 'Officer',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().error('Name is required'),
    }),
    defineField({
      name: 'image',
      title: 'Portrait',
      type: 'image',
      options: {
        hotspot: true,
        crop: true,
      },
      validation: (Rule) => Rule.required().error('Portrait is required'),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      validation: (Rule) => Rule.required().error('Position is required'),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Officer', value: 'officer'},
          {title: 'Discipline Lead', value: 'discipline'},
          {title: 'Team Lead', value: 'team'},
          {title: 'Mission Director', value: 'mission'},
        ],
      },
    }),
    defineField({
      name: 'section',
      title: 'Section',
      description: 'Choose which section this person appears in on the About Us page.',
      type: 'string',
      options: {
        list: [
          {title: 'Officers', value: 'officers'},
          {title: 'Leadership', value: 'leadership'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required().error('Section is required'),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display order',
      description: 'Lower numbers appear first within the selected section, such as 1 for President.',
      type: 'number',
      validation: (Rule) =>
        Rule.required().integer().min(1).error('Display order must be a whole number of 1 or greater'),
    }),
  ],
  orderings: [
    {
      title: 'Section and display order',
      name: 'sectionAndDisplayOrder',
      by: [
        {field: 'section', direction: 'asc'},
        {field: 'displayOrder', direction: 'asc'},
        {field: 'name', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      position: 'position',
      section: 'section',
      displayOrder: 'displayOrder',
      media: 'image',
    },
    prepare({title, position, section, displayOrder, media}) {
      const sectionTitle = section === 'leadership' ? 'Leadership' : 'Officers'
      const order = displayOrder ? `#${displayOrder}` : 'Unordered'

      return {
        title,
        subtitle: `${sectionTitle} · ${order} · ${position}`,
        media,
      }
    },
  },
})
