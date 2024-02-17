import { User } from './User.js'
import { Post } from './Post.js'
import { Comment } from './Comment.js'

User.hasMany(Post, { foreignKey: 'author_id', onUpdate: 'CASCADE'})
Post.belongsTo(User, { foreignKey: 'author_id', onUpdate: 'CASCADE'})

Comment.belongsTo(Post, { foreignKey: 'on_post', onUpdate: 'CASCADE'})
Post.hasMany(Comment, { foreignKey: 'on_post', onUpdate: 'CASCADE'})

User.hasMany(Comment, { foreignKey: 'author_id', onUpdate: 'CASCADE'})
Comment.belongsTo(User, { foreignKey: 'author_id', onUpdate: 'CASCADE'})

export { User, Post, Comment }
