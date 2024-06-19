import userRepository from "../../repositories/userRepository";
import { User } from "../../model/USER_MODEL";
import { userServices } from "../userServices";
import { comparedPassword, hashPassword } from "../../config/bcrypt";
import generateToken from "../../util/generateToken";



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

     async login(email: string, password: string): Promise<{ token: string, user: User }> {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isPasswordValid = await comparedPassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        const token = await generateToken(user.id)

        const { password: _, ...userWithoutPassword } = user.toObject();

        return {token, user:userWithoutPassword};
    }

    async updateUserById(id: string, update: Partial<User>): Promise<User| null> {
        
        if(update.password){
            update.password = await hashPassword(update.password)
        }
        return userRepository.updateById(id, update)
    }

    async deleteUserById(id: string): Promise< User | null> {
        return userRepository.deleteById(id)
    }
    
}

export default new userServicesImpl();