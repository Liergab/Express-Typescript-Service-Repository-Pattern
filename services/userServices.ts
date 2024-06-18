import { User } from "../model/USER_MODEL";

export interface userServices {
    getAllUsers():Promise<User[]>,
    getUserById(id:string):Promise<User | null>,
    registerUser(user:Partial<User>):Promise<User>,
    updateUserById(id:string, update:Partial<User>):Promise<User | null>,
    deleteUserById(id:string):Promise<User | null>
}