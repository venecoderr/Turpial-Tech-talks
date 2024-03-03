//Imports
import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/connection.js'
import { User } from './User.js'
import { Post } from './Post.js'
import moment from 'moment'

//Model definition
export class Comment extends Model {

}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    on_post: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Post,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    getterMethods: {
      created_at: function() {
        return moment(this.getDataValue('created_at')).format('MMM Do, YYYY NN');
      },
      updated_at: function() {
        return moment(this.getDataValue('updated_at')).format('MMM Do, YYYY NN');
      },
    },
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
)

