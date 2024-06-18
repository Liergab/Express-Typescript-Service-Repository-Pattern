import USER_MODEL,{User} from "../model/USER_MODEL";

class UserRepository {
    async findAll(): Promise<User[]> {
        return USER_MODEL.find().exec();
    }

    async findById(id: string): Promise<User | null> {
        return USER_MODEL.findById(id).exec();
    }

    async findByEmail(email: string): Promise<User | null> {
        return USER_MODEL.findOne({ email }).exec();
    }

    async register(user: Partial<User>): Promise<User> {
        return USER_MODEL.create(user);
    }

    async updateById(id: string, update: Partial<User>): Promise<User | null> {
        return USER_MODEL.findByIdAndUpdate(id, update, { new: true }).exec();
    }

    async deleteById(id: string): Promise<User | null> {
        return USER_MODEL.findByIdAndDelete(id).exec();
    }
}

export default new UserRepository();