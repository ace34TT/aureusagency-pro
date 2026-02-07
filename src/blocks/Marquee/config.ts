import type { Block } from 'payload'

export const MarqueeBlock: Block = {
  slug: 'marquee',
  interfaceName: 'MarqueeBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Items',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'speed',
      type: 'number',
      defaultValue: 50,
      label: 'Vitesse de défilement',
    },
  ],
}
