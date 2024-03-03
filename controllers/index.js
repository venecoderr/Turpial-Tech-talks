//Imports main routers
import { Router } from 'express'
import { homeRoutes } from './homeRoutes.js'
import { apiIndex } from './api/index.js'

//Router instance
export const routes = Router()

//Routing
routes.use('/', homeRoutes)
routes.use('/api', apiIndex)