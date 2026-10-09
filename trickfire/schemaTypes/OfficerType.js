import {defineType, defineField} from 'sanity'

/**
 * Sanity schema for an officer.
 * @typedef {Object} Officer
 * @property {string} name - The name of the officer.
 * @property {image} image - Portrait of the officer.
 * @property {string} position - Position of the officer.
 * @property {string} type - Type of the officer.
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
  ],
})
