import type { Block } from 'payload'

export const VisualShowcase: Block = {
  slug: 'visualShowcase',
  interfaceName: 'VisualShowcaseBlock',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'images',
      options: [
        { label: 'Image Gallery (High Res)', value: 'images' },
        { label: 'Three.js / WebGL Interaction', value: 'threejs' },
      ],
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      admin: {
        condition: (_, siblingData) => siblingData.type === 'images',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'threejsUrl',
      type: 'text',
      label: 'Three.js component/model path or URL',
      admin: {
        condition: (_, siblingData) => siblingData.type === 'threejs',
      },
    },
  ],
}
