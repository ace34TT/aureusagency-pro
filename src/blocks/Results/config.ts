import type { Block } from 'payload'

export const Results: Block = {
  slug: 'results',
  interfaceName: 'ResultsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'The Results',
      required: true,
    },
    {
      name: 'kpis',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'stat',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'ex: +40%',
            description: 'Le chiffre clé percutant',
          },
        },
        {
          name: 'description',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'ex: de vitesse de chargement',
          },
        },
      ],
    },
  ],
}
