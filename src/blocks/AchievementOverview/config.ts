import type { Block } from 'payload'

export const AchievementOverview: Block = {
  slug: 'achievementOverview',
  interfaceName: 'AchievementOverviewBlock',
  fields: [
    {
      name: 'clientLogo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Logo du client pour affichage dans la section aperçu.',
      },
    },
    {
      name: 'year',
      type: 'text',
      required: true,
      label: 'Year (Année)',
      admin: {
        placeholder: 'ex: 2024',
      },
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Role (Rôle)',
      admin: {
        placeholder: 'ex: Fullstack Development, UI/UX Design',
      },
    },
    {
      name: 'industry',
      type: 'text',
      required: true,
      label: "Industry (Secteur d'activité)",
      admin: {
        placeholder: 'ex: E-commerce, SaaS, Fintech',
      },
    },
    {
      name: 'stack',
      type: 'text',
      required: true,
      label: 'Tech Stack',
      admin: {
        placeholder: 'ex: Next.js, Payload CMS, Three.js',
      },
    },
  ],
}
