import { InferSchemaType, Schema, model, Document  } from "mongoose"
import { boolean } from "zod"

const userSchema = new Schema({

    email:{
        type     : String,
        required : true,
        unique   : true,
        match    : [/.+\@.+\..+/, 'Please fill a valid email address']
    },

    password:{
        type     : String,
        required : true
    },
    isAdmin:{
        type     :Boolean,
        default  :false
    }

},{timestamps:true})

export interface User extends Document {
    id: string;
    email: string;
    password: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export default model<User>('users', userSchema)