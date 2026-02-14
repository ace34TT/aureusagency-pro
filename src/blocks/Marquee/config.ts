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
      name: 'padding',
      type: 'radio',
      label: 'Espacement (Padding)',
      defaultValue: 'both',
      options: [
        { label: 'Haut', value: 'top' },
        { label: 'Bas', value: 'bottom' },
        { label: 'Les deux', value: 'both' },
      ],
      admin: {
        layout: 'horizontal',
      },
    },
  ],
}
