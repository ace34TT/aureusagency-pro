import type { Block } from 'payload'
import { HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
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
      name: 'testimonials',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
        },
        {
          name: 'authorName',
          type: 'text',
          required: true,
        },
        {
          name: 'authorRole',
          type: 'text',
          required: true,
        },
        {
          name: 'authorImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
  labels: {
    plural: 'Testimonials',
    singular: 'Testimonial',
  },
}
