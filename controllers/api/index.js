import { Router } from 'express'
import { userRoutes } from './userRoutes.js'
import { projectRoutes } from './projectRoutes.js'
import { withAuth } from '../../utils/auth.js'

export const apiIndex = Router()

apiIndex.use('/users', userRoutes)
apiIndex.use('/projects', projectRoutes)
