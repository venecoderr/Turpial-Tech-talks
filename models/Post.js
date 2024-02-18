import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/connection.js'
import { User } from './User.js'
import moment from 'moment'

export class Post extends Model {

}

Post.init(
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'post',
  }
)

