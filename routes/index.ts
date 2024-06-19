import express       from 'express'
import userRouter    from './userRoute'
import productRouter from './productRoute'
const rootRouter = express.Router()

rootRouter.use(userRouter)
rootRouter.use(productRouter)

export default rootRouter