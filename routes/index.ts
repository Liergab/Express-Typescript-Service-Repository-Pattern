import express    from 'express'
import userRouter from './userRoute'

const rootRouter = express.Router()

rootRouter.use(userRouter)

export default rootRouter