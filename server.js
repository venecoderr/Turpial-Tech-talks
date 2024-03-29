//Imports packages, models and routers
import express from 'express'
import session from 'express-session'
import SequelizeStoreConstructor from 'connect-session-sequelize'
import exphbs from 'express-handlebars'
import path from 'path'
import { routes } from './controllers/index.js'
import { sequelize } from './config/connection.js'

//Instances needed by server
const SequelizeStore = SequelizeStoreConstructor(session.Store)
const app = express()
const PORT = process.env.PORT || 3001
const hbs = exphbs.create()

//Session definition
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 600000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}

//Server set-up

app.use(session(sess))
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(express.static(process.cwd() + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)

//DB sincronization
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on localhost:${PORT} ${path.join(process.cwd() + '/public/')}`))
})
