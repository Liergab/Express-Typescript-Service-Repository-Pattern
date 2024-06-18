import { Request } from 'express';
import { User } from '../model/USER_MODEL';
export interface AuthenticatedRequest extends Request {
    user?: Omit<User, 'password'> | null;
}