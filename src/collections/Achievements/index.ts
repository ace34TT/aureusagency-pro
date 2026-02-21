import { CollectionConfig, slugField } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { Banner } from '@/blocks/Banner/config'
import { Code } from '@/blocks/Code/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { populateAuthors } from '../Posts/hooks/populateAuthors'
import { AchievementOverview } from '@/blocks/AchievementOverview/config'
import { ChallengeSolution } from '@/blocks/ChallengeSolution/config'
import { VisualShowcase } from '@/blocks/VisualShowcase/config'
import { Results } from '@/blocks/Results/config'
import { Testimonials } from '@/blocks/Testimonials/config'
import { FormBlock } from '@/blocks/Form/config'
import { revalidateDelete, revalidateAchievement } from './hooks/revalidateAchievement'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Achievements: CollectionConfig<'achievements'> = {
  slug: 'achievements',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    meta: {
      image: true,
      description: true,
    },
    heroImage: true,
    projectLink: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'achievements',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'achievements',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'projectLink',
              type: 'text',
              label: 'Project Link',
            },
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                Banner,
                Code,
                MediaBlock,
                AchievementOverview,
                ChallengeSolution,
                VisualShowcase,
                Results,
                Testimonials,
                FormBlock,
              ],
              required: true,
            },
          ],
          label: 'Content',
        },
        {
          fields: [
            {
              name: 'relatedAchievements',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'achievements',
            },
            {
              name: 'tags',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'tags',
            },
          ],
          label: 'Meta',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
    },
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateAchievement],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
