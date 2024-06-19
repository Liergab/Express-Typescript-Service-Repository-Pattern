import { Product } from "../../model/PRODUCT_MODEL";
import productRepository from "../../repositories/productRepository";
import { productServices } from "../productServices";

class productServicesImpl implements productServices{

    async createProduct(product: Partial<Product>): Promise<Product> {
        return productRepository.createProduct(product)
    }

    async getAllProduct(): Promise<Product[]> {
        return productRepository.getAllProduct()
    }

    async getProductById(id: string): Promise<Product | null> {
        return productRepository.getProductById(id)
    }

    async updateProduct(id: string, update: Partial<Product>): Promise<Product | null> {
        return productRepository.updateProduct(id, update);
    }

    async deleteProduct(id: string): Promise<Product | null> {
        return productRepository.deleteProduct(id)
    }
}

export default new productServicesImpl()