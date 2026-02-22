import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

async function seedPosts() {
  console.log('Starting Posts seeding script...')

  // Initialize payload
  const payload = await getPayload({ config: configPromise })

  try {
    console.log('Clearing existing posts, as requested (everytime you seed some data are lost)...')
    await payload.delete({
      collection: 'posts',
      where: {
        id: { exists: true },
      },
    })
    console.log('Successfully cleared existing posts.')
  } catch (error) {
    console.error('Error clearing existing posts:', error)
  }

  // Find an existing media to use for testing if we want it, but not strictly required
  let mediaId: string | null = null
  try {
    const mediaRes = await payload.find({ collection: 'media', limit: 1 })
    if (mediaRes.docs.length > 0) {
      mediaId = mediaRes.docs[0].id
      console.log('Found media to use for seeded posts:', mediaId)
    }
  } catch (err) {
    // Media collection might not have docs, just ignore
  }

  // Dummy lexical rich text
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
              text: 'This is auto-generated content from the seed script to demonstrate the post layout.',
              version: 1,
            },
          ],
        },
      ],
    },
  }

  console.log('--- Creating New Posts ---')
  for (let i = 1; i <= 10; i++) {
    const layout = [
      {
        blockType: 'quote',
        quote: dummyRichText,
        author: 'Aureus Admin',
        role: 'Content Generator',
      },
      {
        blockType: 'alert',
        type: i % 2 === 0 ? 'expert' : 'info',
        title: "Conseil d'expert Aureus",
        content: dummyRichText,
      },
    ]

    // Append AuthorSection if we picked up a media ID
    if (mediaId && i % 3 === 0) {
      layout.push({
        blockType: 'authorSection',
        photo: mediaId,
        name: 'Équipe Aureus',
        role: "Créateurs d'expériences digitales",
        bio: dummyRichText,
        socialLinks: [{ platform: 'website', url: 'https://aureus.pro' }],
      })
    }

    try {
      await payload.create({
        collection: 'posts',
        data: {
          title: `Sample Seeded Post ${i}`,
          layout,
          meta: {
            title: `Sample Seeded Post ${i}`,
            description: 'This is an auto-generated post description for testing.',
          },
          _status: 'published',
        },
        context: { disableRevalidate: true },
      })
      console.log(`✅ Created Post: Sample Seeded Post ${i}`)
    } catch (e) {
      console.error(`❌ Failed to create Post ${i}:`, e)
    }
  }

  console.log('Finished seeding posts.')
  process.exit(0)
}

seedPosts().catch((e) => {
  console.error(e)
  process.exit(1)
})
