import { Product } from "../model/PRODUCT_MODEL";

export interface productServices {
    createProduct(product:Partial<Product>):Promise<Product>,
    getAllProduct():Promise<Product[]>,
    getProductById(id:string):Promise<Product | null>
    updateProduct(id:string, update:Partial<Product>):Promise<Product | null>
    deleteProduct(id:string):Promise<Product | null>
}