import mongoose from 'mongoose'
import env      from '../util/validateEnv'

const db = async() => {
    try {
        const connectDB = await mongoose.connect(env.MONGO_DB_STRING)
        console.log(`connected:${connectDB.connection.host}/${connectDB.connection.name}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default db