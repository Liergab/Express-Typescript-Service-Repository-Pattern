import mongoose, { Document, Schema, model } from "mongoose";


const productSchema = new Schema({
    product_name:{

        type      :String,
        required  :true

    },
    product_description:{

        type     :String,
        required :true

    },
    product_price:{

        type     :Number,
        required :true

    },
    product_tag:{

        type     :[String] ,
        default  :[]

    },
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
},{timestamps:true})

export interface Product extends Document {
    id                   : string;
    product_name         : string;
    product_description  : string;
    product_price        : number;
    product_tag          : string[];
    user                 : string;
    createdAt            : Date;
    updatedAt            : Date;
}

export default model<Product>('products', productSchema)