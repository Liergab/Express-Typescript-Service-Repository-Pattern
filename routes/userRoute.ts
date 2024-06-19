import express from 'express'
import * as controller from '../controller/userController'
import { adminMiddleware, authMiddleware } from '../middleware/authMiddleware'

const userRouter = express.Router()

userRouter.get('/users',[authMiddleware,adminMiddleware], controller.getAllUsers)
userRouter.get('/user/:id', controller.getUserById)
userRouter.post('/users', controller.registerUser)
userRouter.get('/users/profile', [authMiddleware], controller.profile)
userRouter.post('/users/login', controller.login)
export default userRouter
