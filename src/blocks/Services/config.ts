import type { Block } from 'payload'

export const Services: Block = {
  slug: 'services',
  interfaceName: 'ServicesBlock',
  fields: [
    {
      name: 'tagline',
      type: 'text',
    },
    {
      name: 'richHeadline', // Renamed from headline
      type: 'richText',
      label: 'Headline',
    },
    {
      name: 'richDescription', // Renamed from description
      type: 'richText',
      label: 'Description',
    },
    {
      name: 'services',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Services',
    singular: 'Service',
  },
}
