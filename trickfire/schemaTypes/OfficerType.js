import {defineType, defineField, defineArrayMember} from 'sanity'

/**
 * Sanity schema for an officer.
 * @typedef {Object} Officer
 * @property {string} name - The name of the officer.
 * @property {image} [image] - Optional portrait of the officer.
 * @property {string[]} positions - Positions held by the person.
 * @property {string[]} categories - The tabs the person appears under on the About Us page.
 * @property {number} displayOrder - Position within the person's category.
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
      name: 'categories',
      title: 'Categories',
      description: 'Choose which tab(s) this person appears under on the About Us page. Select more than one if they hold roles in multiple categories.',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {
        list: [
          {title: 'Officers', value: 'officer'},
          {title: 'Discipline Leads', value: 'discipline'},
          {title: 'Team Leads', value: 'team'},
        ],
      },
      validation: (Rule) => Rule.required().min(1).unique().error('Choose at least one category'),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display order',
      description: 'Lower numbers appear first within the selected category, such as 1 for President.',
      type: 'number',
      validation: (Rule) =>
        Rule.required().integer().min(1).error('Display order must be a whole number of 1 or greater'),
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrder',
      by: [
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
      categories: 'categories',
      displayOrder: 'displayOrder',
      media: 'image',
    },
    prepare({title, positions, legacyPosition, categories, displayOrder, media}) {
      const categoryTitles = {
        officer: 'Officers',
        discipline: 'Discipline Leads',
        team: 'Team Leads',
      }
      const categoryList = categories?.length
        ? categories.map((category) => categoryTitles[category] || category).join(', ')
        : 'Uncategorized'
      const order = displayOrder ? `#${displayOrder}` : 'Unordered'
      const positionList = positions?.length ? positions.join(', ') : legacyPosition

      return {
        title,
        subtitle: `${categoryList} · ${order} · ${positionList || 'No position'}`,
        media,
      }
    },
  },
})
