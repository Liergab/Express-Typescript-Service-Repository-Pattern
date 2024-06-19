import express from 'express'
import * as controller from '../controller/userController'
import { adminMiddleware, authMiddleware } from '../middleware/authMiddleware'

const userRouter = express.Router()

userRouter.get('/users',[authMiddleware,adminMiddleware], controller.getAllUsers)
userRouter.get('/user/:id',[authMiddleware], controller.getUserById)
userRouter.get('/users/profile', [authMiddleware], controller.profile)
userRouter.post('/users', controller.registerUser)
userRouter.post('/users/login', controller.login)
userRouter.delete('/users/:id',[authMiddleware], controller.deleteUser)
userRouter.put('/users/:id',[authMiddleware], controller.updateUser)


export default userRouter
