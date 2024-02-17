import { User } from '../models/User.js'
import bcrypt from 'bcrypt'

const keyword = process.env.SEED_PASS
const hash = bcrypt.hashSync(keyword, 10)


const userData = [
  {
    username: 'Ceasar',
    email: 'jceasar@gmail.com',
    password: hash
  },
  {
    username: 'Hannibal',
    email: 'hbarca@gmail.com',
    password: hash
  },
  {
    username: 'Saladin',
    email: 'saladin@gmail.com',
    password: hash
  },
  {
    username: 'Wellington',
    email: 'rwellington@gmail.com',
    password: hash
  },
  {
    username: 'Napoleon',
    email: 'nbonaparte@gmail.com',
    password: hash
  },
]

export const seedUsers = () => User.bulkCreate(userData)
