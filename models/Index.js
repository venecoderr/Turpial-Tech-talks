import { User } from './User.js'
import { Post } from './Post.js'
import { Comment } from './Comment.js'

User.hasMany(Post, { foreignKey: 'author_id'})
Post.belongsTo(User, { foreignKey: 'author_id' })

Comment.belongsTo(Post, { foreignKey: 'on_post' })
Post.hasMany(Comment, { foreignKey: 'on_post'})

User.hasMany(Comment, { foreignKey: 'author_id'})
Comment.belongsTo(User, { foreignKey: 'author_id' })

export { User, Post, Comment }
