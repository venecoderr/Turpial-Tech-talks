import { Router } from 'express'
import { homeRoutes } from './homeRoutes.js'
import { apiIndex } from './api/index.js'
import { withAuth } from '../utils/auth.js'

export const routes = Router()

routes.use('/', homeRoutes)
routes.use('/api', apiIndex)

