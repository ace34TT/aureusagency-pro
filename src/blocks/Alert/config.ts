import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Alert: Block = {
  slug: 'alert',
  interfaceName: 'AlertBlock',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'info',
      options: [
        { label: 'Information (Info)', value: 'info' },
        { label: 'Warning / Attention', value: 'warning' },
        { label: 'Success (Succès)', value: 'success' },
        { label: "Expert Tips (Conseil d'expert)", value: 'expert' },
      ],
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title (optional)',
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      required: true,
    },
  ],
}
