import jwt from 'jsonwebtoken'
import env from '../util/validateEnv'

const generateToken = async(id:string):Promise<string> => {
 return jwt.sign({id}, env.SECRET_KEY,{expiresIn:'5d'})
}

export default generateToken