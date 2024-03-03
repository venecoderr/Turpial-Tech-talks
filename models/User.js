//Imports
import { DataTypes, Model } from 'sequelize'
import bcrypt from 'bcrypt'
import { sequelize } from '../config/connection.js'

//Model definition
export class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password)
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10)
        return newUserData
      },
      beforeUpdate: async (updatedUserData) => {
        if (updatedUserData.changed('password')) {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10)
        }
        return updatedUserData
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
)

