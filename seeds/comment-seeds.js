import { Comment } from '../models/Comment.js'

const commentData = [
  {
    author_id: 3,
    text: 'But then how would we know where the line ends?',
    on_post: 1
  },
  {
    author_id: 4,
    text: 'Until you learn to use a framework...',
    on_post: 2
  },
  {
    author_id: 5,
    text: 'This is a big difference actually',
    on_post: 3
  },
  {
    author_id: 1,
    text: 'Number 5, Do not get stuck in the "same old way" to do things',
    on_post: 4
  },
  {
    author_id: 2,
    text: 'You got no secrets thats why xd',
    on_post: 5
  },
]

export const seedComments = () => Comment.bulkCreate(commentData)