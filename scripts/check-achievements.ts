import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

async function checkAchievements() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'achievements',
    draft: true,
    overrideAccess: true,
    limit: 10,
  })

  console.log('Achievements:')
  result.docs.forEach((doc) => {
    console.log(
      `- ID: ${doc.id}, Title: "${doc.title}", Slug: "${doc.slug}", Status: "${doc._status}"`,
    )
  })

  process.exit(0)
}

checkAchievements()
