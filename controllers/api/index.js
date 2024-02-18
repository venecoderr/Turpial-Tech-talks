import { Router } from 'express'
import { userRoutes } from './userRoutes.js'
import { postRoutes } from './postRoutes.js'
import { commentRoutes } from './commentRoutes.js'
import { withAuth } from '../../utils/auth.js'

export const apiIndex = Router()

apiIndex.use('/users', userRoutes)
apiIndex.use('/posts', postRoutes)
apiIndex.use('/comments', commentRoutes)
