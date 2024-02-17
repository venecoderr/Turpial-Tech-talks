import { Post } from '../models/Post.js'

const postData = [
  {
    author_id: 1,
    title: 'No more semi-colons',
    text: 'This is obviously an invention of a fool and I refuse to use it',
  },
  {
    author_id: 2,
    title: 'On bootstraps superiority',
    text: 'This website is an example of how superior bootstrap is',
  },
  {
    author_id: 3,
    title: 'Main difference between Await and Then()',
    text: 'The main differcen between Await and Then() is that await halts all code from running but only the code inside of the then() statement awaits and the rest of the codes executes normally',
  },
  {
    author_id: 4,
    title: '4 ways to get better',
    text: '1. Think outside the box, 2. Think like a computer, 3. Use ALL the tools avaible to you, 4. ctrl C, ctrl V',
  },
  {
    author_id: 5,
    title: 'My coding secrets',
    text: 'What are you looking for here? They are secret I am not gonna share them with you',
  },
]

export const seedPosts = () => Post.bulkCreate(postData)
