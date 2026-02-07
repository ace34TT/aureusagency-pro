import type { Block } from 'payload'

export const Process: Block = {
  slug: 'process',
  interfaceName: 'ProcessBlock',
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
      name: 'steps',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'copy',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Search (Diagnostic)', value: 'search' },
            { label: 'Layout (Structure)', value: 'layout' },
            { label: 'Paintbrush (Design)', value: 'paintbrush' },
            { label: 'Rocket (Launch)', value: 'rocket' },
          ],
          defaultValue: 'search',
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Processes',
    singular: 'Process',
  },
}
