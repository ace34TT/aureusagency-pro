import type { GlobalConfig } from 'payload'

export const Global: GlobalConfig = {
  slug: 'global',
  access: {
    read: () => true,
  },
  fields: [
    // Groupe de contact (Email, Phone, Address)
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'address',
          type: 'textarea',
        },
      ],
    },
    // Tableau des réseaux sociaux (comme dans Strapi)
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Réseaux Sociaux',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'WhatsApp', value: 'whatsapp' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Lien du profil',
          required: true,
        },
      ],
      admin: {
        initCollapsed: true, // Garde l'interface propre
        components: {
          // Si tu as créé un RowLabel, c'est ici qu'il brille
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
}
