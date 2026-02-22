import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

async function publishAchievements() {
  console.log('Publishing all draft achievements...')
  const payload = await getPayload({ config: configPromise })

  const achievements = await payload.find({
    collection: 'achievements',
    draft: true,
    overrideAccess: true,
    limit: 100,
  })

  let count = 0
  for (const ach of achievements.docs) {
    if (ach._status !== 'published') {
      try {
        await payload.update({
          collection: 'achievements',
          id: ach.id,
          data: {
            _status: 'published',
          },
          overrideAccess: true,
        })
        console.log(`✅ Published achievement: ${ach.title} (slug: ${ach.slug})`)
        count++
      } catch (err) {
        console.error(`❌ Failed to publish ${ach.title}:`, err)
      }
    } else {
      console.log(`⚡ Already published: ${ach.title} (slug: ${ach.slug})`)
    }
  }

  console.log(`Finished publishing ${count} achievements.`)
  process.exit(0)
}

publishAchievements().catch((e) => {
  console.error(e)
  process.exit(1)
})
