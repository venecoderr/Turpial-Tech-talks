//Imports
import { Sequelize } from 'sequelize'
import 'dotenv/config'

//DB variable
let sequelize

//Selects DB connection based on Heroku or local use
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL)
} else {
  sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  }
)
}

//Exports DB instance
export { sequelize }