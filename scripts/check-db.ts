import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

async function checkDB() {
  const payload = await getPayload({ config: configPromise })

  const achievements = await payload.find({ collection: 'achievements', depth: 0 })
  console.log(`Achievements count: ${achievements.docs.length}`)

  for (const ach of achievements.docs) {
    console.log(`- ${ach.title}: layout length = ${ach.layout?.length || 0}`)
    if (ach.layout && ach.layout.length > 0) {
      console.log(`  Blocks: ${ach.layout.map((b) => b.blockType).join(', ')}`)
    }
  }

  process.exit(0)
}

checkDB()
