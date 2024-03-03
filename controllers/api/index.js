//Imports API routers and utilities
import { Router } from 'express'
import { userRoutes } from './userRoutes.js'
import { postRoutes } from './postRoutes.js'
import { commentRoutes } from './commentRoutes.js'
import { withAuth } from '../../utils/auth.js'

//Router instance
export const apiIndex = Router()

//Routing
apiIndex.use('/users', userRoutes)
apiIndex.use('/posts', postRoutes)
apiIndex.use('/comments', withAuth, commentRoutes)