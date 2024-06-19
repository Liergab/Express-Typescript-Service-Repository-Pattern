import bcrypt from 'bcryptjs'


export const hashPassword = async(password:string):Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    return hashPassword
}

export const comparedPassword = async(plain:string, hashPassword:string): Promise<boolean> => {
    return await bcrypt.compare(plain, hashPassword)
}