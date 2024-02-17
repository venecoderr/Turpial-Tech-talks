import { seedUsers } from './user-seeds.js'
import { seedPosts } from './post-seeds.js'
import { seedComments } from './comment-seeds.js'

import { sequelize } from '../config/connection.js'

const seedAll = async () => {
  await sequelize.sync({ force: true })
  console.log('\n----- DATABASE SYNCED -----\n')
  await seedUsers()
  console.log('\n----- USERS SEEDED -----\n')

  await seedPosts()
  console.log('\n----- POST SEEDED -----\n')

  await seedComments()
  console.log('\n----- COMMENTS SEEDED -----\n')

  process.exit(0)
}

seedAll()
