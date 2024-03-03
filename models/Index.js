//Imports Models
import { User } from './User.js'
import { Post } from './Post.js'
import { Comment } from './Comment.js'

//Creates relations
User.hasMany(Post, { foreignKey: 'author_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
Post.belongsTo(User, { foreignKey: 'author_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'})

Comment.belongsTo(Post, { foreignKey: 'on_post', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
Post.hasMany(Comment, { foreignKey: 'on_post', onDelete: 'CASCADE', onUpdate: 'CASCADE'})

User.hasMany(Comment, { foreignKey: 'author_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
Comment.belongsTo(User, { foreignKey: 'author_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'})

//Exports models and relations
export { User, Post, Comment }
