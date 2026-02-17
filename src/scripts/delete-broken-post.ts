console.log('Starting script...')
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import 'dotenv/config'

console.log('Imports done.')

async function deleteBrokenPost() {
  console.log('Validating env...')
  if (!process.env.DATABASE_URI) console.error('Missing DATABASE_URI')
  if (!process.env.PAYLOAD_SECRET) console.error('Missing PAYLOAD_SECRET')

  console.log('Initializing Payload...')
  const payload = await getPayload({ config: configPromise })
  console.log('Payload initialized.')

  console.log('--- FINDING BROKEN POST ---')

  const slug = 'pourquoi-larchitecture-headless-avec-payload-cms-est-lavenir-du-web'

  const posts = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (posts.docs.length === 0) {
    console.log(`Post with slug "${slug}" not found.`)
    process.exit(0)
  }

  const post = posts.docs[0]
  console.log(`Found post: "${post.title}" (ID: ${post.id})`)

  console.log('Deleting...')
  await payload.delete({
    collection: 'posts',
    id: post.id,
  })

  console.log('Successfully deleted the broken post.')
  process.exit(0)
}

deleteBrokenPost().catch((err) => {
  console.error(err)
  process.exit(1)
})
