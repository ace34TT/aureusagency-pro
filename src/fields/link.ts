import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

export type LinkAppearances = 'default' | 'outline'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const link: LinkType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      relationTo: ['pages', 'posts'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required: true,
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Label',
          required: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.outline]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: 'Choose how the link should be rendered.',
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    })
  }

  linkResult.fields.push({
    type: 'row',
    fields: [
      {
        name: 'enableIcon',
        type: 'checkbox',
        label: 'Add Icon',
        admin: {
          width: '20%',
          style: {
            alignSelf: 'flex-end',
          },
        },
      },
      {
        name: 'icon',
        type: 'select',
        label: 'Icon',
        admin: {
          width: '40%',
          condition: (_, siblingData) => siblingData?.enableIcon,
        },
        options: [
          { label: 'Arrow Right', value: 'arrowRight' },
          { label: 'Arrow Left', value: 'arrowLeft' },
          { label: 'Chevron Right', value: 'chevronRight' },
          { label: 'Chevron Left', value: 'chevronLeft' },
          { label: 'Plus', value: 'plus' },
          { label: 'External Link', value: 'externalLink' },
          { label: 'Download', value: 'download' },
          { label: 'Play', value: 'play' },
          { label: 'Info', value: 'info' },
          { label: 'Phone', value: 'phone' },
          { label: 'Calendar', value: 'calendar' },
        ],
      },
      {
        name: 'iconPosition',
        type: 'select',
        label: 'Position',
        defaultValue: 'right',
        admin: {
          width: '40%',
          condition: (_, siblingData) => siblingData?.enableIcon,
        },
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Right', value: 'right' },
        ],
      },
    ],
  })

  return deepMerge(linkResult, overrides)
}
