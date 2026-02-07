import type { Block } from 'payload'

export const WorkShowcase: Block = {
  slug: 'workShowcase',
  interfaceName: 'WorkShowcaseBlock',
  fields: [
    {
      name: 'tagline',
      type: 'text',
    },
    {
      name: 'richHeadline',
      type: 'richText',
      label: 'Headline',
    },
    {
      name: 'richDescription',
      type: 'richText',
      label: 'Description',
    },
    {
      name: 'projects',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'result',
          type: 'text',
          required: true,
        },
        {
          name: 'summary',
          type: 'textarea',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Project Link',
        },
      ],
    },
  ],
  labels: {
    plural: 'Work Showcases',
    singular: 'Work Showcase',
  },
}
