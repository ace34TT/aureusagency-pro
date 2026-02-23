import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'type',
    type: 'select',
    defaultValue: 'text',
    options: [
      {
        label: 'Text',
        value: 'text',
      },
      {
        label: 'Image',
        value: 'image',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
    admin: {
      condition: (_, siblingData) => siblingData.type === 'text',
    },
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    admin: {
      condition: (_, siblingData) => siblingData.type === 'image',
    },
  },
  {
    name: 'enableLink',
    type: 'checkbox',
    admin: {
      condition: (_, siblingData) => siblingData.type === 'text',
    },
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink) && siblingData.type === 'text'
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'oneColumn',
      options: [
        { label: 'One Column', value: 'oneColumn' },
        { label: 'Two Columns', value: 'twoColumns' },
      ],
    },
    {
      name: 'columnOne',
      type: 'group',
      fields: columnFields,
    },
    {
      name: 'columnTwo',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData.layout === 'twoColumns',
      },
      fields: columnFields,
    },
  ],
}
