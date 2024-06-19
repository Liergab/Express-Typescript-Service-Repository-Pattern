import {NextFunction, Request, Response} from 'express'
import userServiceImpl from '../services/implementation/userServiceImpl'
import mongoose from 'mongoose'
import generateToken from '../util/generateToken'
import { AuthenticatedRequest } from '../types/express'


export const getAllUsers = async(req:Request, res:Response, next:NextFunction)=> {
    try {
        const users = await userServiceImpl.getAllUsers()
        res.status(200).json(users)
    } catch (error) {
       next(error)
    }
}

export const getUserById = async(req:AuthenticatedRequest,res:Response, next:NextFunction) => {
    try {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) {
             res.status(400)
             throw new Error('Invalid Id')
        }
        if(id !== req.user?.id){
            res.status(401)
            throw new Error('You dont have permission to fetch this user details')
        }
       const user = await userServiceImpl.getUserById(id) 
       
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404)
            throw new Error('User not found')
        }
    } catch (error) {
        next(error)
    }
}

export const registerUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const{email, password, password_confirmation} = req.body
        if(!email ||!password || !password_confirmation){
            res.status(400)
            throw new Error('Email and Password Required!')
        }
        if(password !== password_confirmation){
            res.status(409)
            throw new Error('Password, Password confirmation does not match!')
        }
        const user = await userServiceImpl.registerUser(req.body)
        const token = await generateToken(user.id);
        res.cookie('jwt',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', 
            sameSite: 'none',
            maxAge: 30 * 24 * 60 * 60 * 1000, 
          })
        res.status(201).json({message:'Successfully Registered!'});
    } catch (error:any) {
        if (error.message === 'Email already in use') {
            res.status(409); 
        } 
        next(error);
    }
}

export const login = async(req:AuthenticatedRequest, res:Response, next:NextFunction)=> {
    try {
        const{email, password} = req.body

        if(!email || !password){
            res.status(400)
            throw new Error('All fields required!')
        }

        const {token, user} = await userServiceImpl.login(email,password)
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', 
            sameSite: 'none',
            maxAge: 30 * 24 * 60 * 60 * 1000, 
        })
        res.status(200).json({token, message:'Login Successfully!', data:user})

    } catch (error:any) {

        if(error.message === 'Invalid email or password'){
            res.status(401)
        }
        next(error)
    }
}

export const profile = async (req: AuthenticatedRequest, res: Response) => {
   res.json(req.user)
};

export const deleteUser = async(req:AuthenticatedRequest, res:Response, next:NextFunction) => {
    try {
        const {id} = req.params
        if (!mongoose.isValidObjectId(id)) {
            res.status(400)
            throw new Error('Invalid Id')
       }

       if(req.user?.isAdmin === true){
            await userServiceImpl.deleteUserById(id)
            res.status(200).json({message:`You deleted the account id ${id}`})
       }

       if(req.user?.id === id){
        await userServiceImpl.deleteUserById(id)
        res.status(200).json({message:'Your Acount is deleted!'})
       }

       res.status(401)
       throw new Error('You dont have permission to delete this account')
       
    } catch (error) {
        next(error)
    }
}


export const updateUser = async(req:AuthenticatedRequest, res:Response, next:NextFunction) => {
    try {
        const {id} = req.params
        const {email , password, password_confirmation} = req.body

        if(!password || !password_confirmation){
            res.status(400)
            throw new Error('password and  password_confirmation needed when updating account!')
        }
        if(password !== password_confirmation){
            res.status(400)
            throw new Error('Password, Password_confirmation does not match!')
        }
        

        if(req.user?.id !== id){
            res.status(401)
            throw new Error('You dont have permission to update this account')
        }

        const user = await userServiceImpl.updateUserById(id, req.body)
        res.status(200).json({message:'User account updated', user});
    } catch (error) {
        next(error)
    }
}