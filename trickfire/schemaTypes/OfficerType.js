import {defineType, defineField, defineArrayMember} from 'sanity'

/**
 * Sanity schema for an officer.
 * @typedef {Object} Officer
 * @property {string} name - The name of the officer.
 * @property {image} [image] - Optional portrait of the officer.
 * @property {string[]} positions - Positions held by the person.
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
      description: 'Optional. A placeholder will be shown when no portrait is provided.',
    }),
    defineField({
      name: 'positions',
      title: 'Positions',
      description: 'Add one or more positions in the order they should appear.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
          validation: (Rule) => Rule.required().error('Position cannot be empty'),
        }),
      ],
      validation: (Rule) => Rule.required().min(1).unique().error('Add at least one unique position'),
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
      positions: 'positions',
      legacyPosition: 'position',
      section: 'section',
      displayOrder: 'displayOrder',
      media: 'image',
    },
    prepare({title, positions, legacyPosition, section, displayOrder, media}) {
      const sectionTitle = section === 'leadership' ? 'Leadership' : 'Officers'
      const order = displayOrder ? `#${displayOrder}` : 'Unordered'
      const positionList = positions?.length ? positions.join(', ') : legacyPosition

      return {
        title,
        subtitle: `${sectionTitle} · ${order} · ${positionList || 'No position'}`,
        media,
      }
    },
  },
})
