import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const BlogList: Block = {
  slug: 'blogList',
  interfaceName: 'BlogListBlock',
  fields: [
    {
      name: 'title',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Title',
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Description',
    },
    {
      name: 'mode',
      type: 'select',
      defaultValue: 'latest',
      options: [
        {
          label: 'Latest Posts',
          value: 'latest',
        },
        {
          label: 'All Posts (Paginated)',
          value: 'all',
        },
      ],
      label: 'View Mode',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      label: 'Limits / Page Size',
      admin: {
        description: 'Number of posts to show (Latest mode) or per page (All mode)',
      },
    },
  ],
  labels: {
    plural: 'Blog Lists',
    singular: 'Blog List',
  },
}
