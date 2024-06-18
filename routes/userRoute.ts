import express from 'express'
import * as controller from '../controller/userController'
import { authMiddleware } from '../middleware/authMiddleware'

const userRouter = express.Router()

userRouter.get('/users', controller.getAllUsers)
userRouter.get('/users/:id', controller.getUserById)
userRouter.post('/users', controller.registerUser)
userRouter.get('/profile', authMiddleware, controller.profile)
export default userRouter
