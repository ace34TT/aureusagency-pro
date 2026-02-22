import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'
import 'dotenv/config'

async function populateDB() {
  console.log('Starting DB population script...')

  // Initialize payload
  const payload = await getPayload({ config: configPromise })

  // Find an existing media to use for testing
  let mediaId: string | null = null
  try {
    const mediaRes = await payload.find({ collection: 'media', limit: 1 })
    if (mediaRes.docs.length > 0) {
      mediaId = mediaRes.docs[0].id
      console.log('Found media to use:', mediaId)
    } else {
      console.warn(
        'No media found in the database. Media-related fields may not be populated correctly.',
      )
    }
  } catch (err) {
    console.error('Error fetching media:', err)
  }

  // Dummy lexical rich text to fulfill required richText fields
  const dummyRichText = {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Ceci est un contenu généré automatiquement pour démontrer la structure du nouveau composant.',
              version: 1,
            },
          ],
        },
      ],
    },
  }

  // --- POPULATE POSTS ---
  console.log('--- Updating Posts ---')
  const posts = await payload.find({ collection: 'posts', limit: 50, depth: 0 })
  for (const post of posts.docs) {
    // Avoid re-populating if we already added a quote block
    if (post.layout?.some((b) => b.blockType === 'quote')) {
      console.log(`Skipping Post "${post.title}" - Already populated.`)
      continue
    }

    const updatedLayout = [...(post.layout || [])]

    // Append Quote
    updatedLayout.push({
      blockType: 'quote',
      quote: dummyRichText,
      author: 'Aureus Admin',
      role: 'Expert SEO',
    })

    // Append Alert
    updatedLayout.push({
      blockType: 'alert',
      type: 'expert',
      title: "Conseil d'expert Aureus",
      content: dummyRichText,
    })

    // Append AuthorSection
    if (mediaId) {
      updatedLayout.push({
        blockType: 'authorSection',
        photo: mediaId,
        name: 'Équipe Aureus',
        role: "Créateurs d'expériences digitales",
        bio: dummyRichText,
        socialLinks: [{ platform: 'website', url: 'https://aureus.pro' }],
      })
    }

    try {
      await payload.update({
        collection: 'posts',
        id: post.id,
        data: { layout: updatedLayout },
        context: { disableRevalidate: true },
      })
      console.log(`✅ Updated Post: ${post.title}`)
    } catch (e) {
      console.error(`❌ Failed to update Post: ${post.title}`, e)
    }
  }

  // --- POPULATE ACHIEVEMENTS ---
  console.log('--- Updating Achievements ---')
  const achievements = await payload.find({ collection: 'achievements', limit: 50, depth: 0 })

  if (achievements.docs.length === 0) {
    console.log('No achievements found! Creating two demo achievements...')

    for (let i = 1; i <= 2; i++) {
      const demoLayout: any[] = []
      if (mediaId) {
        demoLayout.push({
          blockType: 'achievementOverview',
          clientLogo: mediaId,
          year: `202${i}`,
          role: 'Conception Globale',
          industry: i === 1 ? 'E-commerce' : 'SaaS',
          stack: 'Next.js, Payload CMS, Tailwind',
        })
      }

      demoLayout.push({
        blockType: 'challengeSolution',
        challengeTitle: 'Le Challenge',
        challenge: dummyRichText,
        solutionTitle: 'Notre Solution',
        solution: dummyRichText,
      })

      if (mediaId) {
        demoLayout.push({
          blockType: 'visualShowcase',
          type: 'images',
          images: [{ image: mediaId, caption: 'Aperçu du projet' }],
        })
      }

      demoLayout.push({
        blockType: 'results',
        title: "L'Impact",
        kpis: [
          { stat: '+50%', description: 'de Taux de Conversion' },
          { stat: 'X3', description: 'Trafic Organique' },
        ],
      })

      try {
        await payload.create({
          collection: 'achievements',
          data: {
            title: `Demo Achievement ${i}`,
            layout: demoLayout,
            heroImage: mediaId ? mediaId : undefined,
            meta: { title: `Demo ${i}`, description: 'Demo desc' },
            _status: 'published',
          },
          context: { disableRevalidate: true },
        })
        console.log(`✅ Created Demo Achievement ${i}`)
      } catch (e) {
        console.log(`❌ Failed to create Demo Achievement ${i}`, e)
      }
    }
  } else {
    for (const ach of achievements.docs) {
      if (ach.layout?.some((b) => b.blockType === 'achievementOverview')) {
        console.log(`Skipping Achievement "${ach.title}" - Already populated.`)
        continue
      }

      const updatedLayout = Array.isArray(ach.layout) ? [...ach.layout] : []
      console.log(`Current layout for ${ach.title}:`, updatedLayout.length, 'blocks')

      if (mediaId) {
        updatedLayout.push({
          blockType: 'achievementOverview',
          clientLogo: mediaId,
          year: '2024',
          role: 'Conception Globale',
          industry: 'Innovation Tech',
          stack: 'Next.js, Payload CMS, Tailwind',
        })
      }

      updatedLayout.push({
        blockType: 'challengeSolution',
        challengeTitle: 'Le Challenge',
        challenge: dummyRichText,
        solutionTitle: 'Notre Solution',
        solution: dummyRichText,
      })

      if (mediaId) {
        updatedLayout.push({
          blockType: 'visualShowcase',
          type: 'images',
          images: [{ image: mediaId, caption: 'Aperçu du projet' }],
        })
      }

      updatedLayout.push({
        blockType: 'results',
        title: "L'Impact",
        kpis: [
          { stat: '+50%', description: 'de Taux de Conversion' },
          { stat: 'X3', description: 'Trafic Organique' },
        ],
      })

      try {
        await payload.update({
          collection: 'achievements',
          id: ach.id,
          data: { layout: updatedLayout },
          context: { disableRevalidate: true },
        })
        console.log(`✅ Updated Achievement: ${ach.title}`)
      } catch (e) {
        console.error(`❌ Failed to update Achievement: ${ach.title}`, e)
      }
    }
  }

  console.log('Population script finished.')
  process.exit(0)
}

populateDB().catch((e) => {
  console.error(e)
  process.exit(1)
})
