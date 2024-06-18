import express    from 'express'
import env        from './util/validateEnv'
import db         from './config/db'
import rootRouter from './routes'
import { errorValidation } from './middleware/errorMiddleware'
import cookieParser from 'cookie-parser'
const app = express()
const PORT =  env.PORT  || 5001

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use('/v1/api/', rootRouter)
app.use(errorValidation)

app.listen(PORT, () => {
    console.log(`connected to: http://localhost:${PORT}`)
    db()
})

  