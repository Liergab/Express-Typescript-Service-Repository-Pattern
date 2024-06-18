import userRepository from "../../repositories/userRepository";
import { User } from "../../model/USER_MODEL";
import { userServices } from "../userServices";
import { hashPassword } from "../../config/bcrypt";



class userServicesImpl implements userServices {

    async  getAllUsers(): Promise<User[]> {
        return userRepository.findAll();
    }

    async  getUserById(id: string): Promise<User | null> {
        return userRepository.findById(id);
    }

    async registerUser (user: Partial<User>): Promise<User>{
        
        const existingUser = await userRepository.findByEmail(user.email!);
        if (existingUser) {
            throw new Error('Email already in use');
        }
        user.password = await hashPassword(user.password!);
        return userRepository.register(user);
    };

    async updateUserById(id: string, update: Partial<User>): Promise<User| null> {
        return userRepository.updateById(id, update)
    }

    async deleteUserById(id: string): Promise< User | null> {
        return userRepository.deleteById(id)
    }
    
}

export default new userServicesImpl();