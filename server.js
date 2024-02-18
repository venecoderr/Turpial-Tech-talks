import express from 'express'
import session from 'express-session'
import SequelizeStoreConstructor from 'connect-session-sequelize'
import exphbs from 'express-handlebars'
import path from 'path'
import { routes } from './controllers/index.js'
import { sequelize } from './config/connection.js'

const SequelizeStore = SequelizeStoreConstructor(session.Store)
const app = express()
const PORT = process.env.PORT || 3001
const hbs = exphbs.create()

const sess = {
  secret: 'Super secret secret',
  cookie: {
    // maxAge: 1600000,
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

app.use(session(sess))

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(express.static(process.cwd() + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routes)

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on localhost:${PORT} ${path.join(process.cwd() + '/public/')}`))
})
