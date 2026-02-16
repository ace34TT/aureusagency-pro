import type { Block } from 'payload'
import { HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

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
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3'] }),
        ],
      }),
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
