import PRODUCT_MODEL, { Product } from "../model/PRODUCT_MODEL";

class ProductRepository {
    
    async createProduct(product:Partial<Product>):Promise<Product>{
        return PRODUCT_MODEL.create(product)
    }

    async getAllProduct():Promise<Product[]>{
        return PRODUCT_MODEL.find().exec()
    }

    async getProductById(id:string):Promise<Product | null> {
        return PRODUCT_MODEL.findById(id).exec()
    }

    async updateProduct(id: string, update: Partial<Product>): Promise<Product | null> {
        return PRODUCT_MODEL.findByIdAndUpdate(id, update, { new: true }).exec();
    }

    async deleteProduct(id:string):Promise<Product | null>{
        return PRODUCT_MODEL.findByIdAndDelete(id).exec()
    }
}

export default new ProductRepository()