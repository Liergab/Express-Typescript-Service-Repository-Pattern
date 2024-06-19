import env from '../util/validateEnv';
import USER_MODEL from "../model/USER_MODEL";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from "../types/express";

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        let token = req.cookies.jwt;

        if (token) {
            try {
                const decode = jwt.verify(token, env.SECRET_KEY) as JwtPayload & { id: string };
                console.log('Decoded JWT:', decode); 
    
                const user = await USER_MODEL.findById(decode.id).select('-password');
                
                if (!user) {
                    res.status(401);
                    throw new Error('User not found');
                }
                req.user = user;
                next();
            } catch (error) {
                console.error('JWT Verification Error:', error);
                res.status(401).json({ message: 'Not Authorized, Invalid Token' });
            }
        } else {
            res.status(401).json({ message: 'Not Authorized, No token' });
        }
        
    } catch (error) {
        next(error)
    }
   
};

export const adminMiddleware = async(req:AuthenticatedRequest, res:Response, next:NextFunction) => {
    try {
        if(req.user?.isAdmin === true){
            next()
        }else{
            res.status(401)
            throw new Error('Not Authorized, Not Admin');
        }
    } catch (error) {
        next(error)
    }
}
