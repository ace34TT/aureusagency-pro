import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ChallengeSolution: Block = {
  slug: 'challengeSolution',
  interfaceName: 'ChallengeSolutionBlock',
  fields: [
    {
      name: 'challengeTitle',
      type: 'text',
      defaultValue: 'The Challenge',
      required: true,
    },
    {
      name: 'challenge',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      required: true,
    },
    {
      name: 'solutionTitle',
      type: 'text',
      defaultValue: 'The Solution',
      required: true,
    },
    {
      name: 'solution',
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
