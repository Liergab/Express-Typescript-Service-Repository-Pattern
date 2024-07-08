import mongoose from "mongoose";
import { Product } from "../../model/PRODUCT_MODEL";
import productRepository from "../../repositories/productRepository";
import productServicesImpl from "../../services/implementation/productServicesImpl";


jest.mock("../../repositories/productRepository");

describe('Product service Implementation', () => {

    type TestProduct = Pick<Product, '_id' | 'id' | 'product_name' | 'product_description' | 'product_price' | 'product_tag' | 'user' | 'createdAt' | 'updatedAt'>;

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createProduct', () => {
        it('Should create product', async() => {
            const productData: Partial<Product> = {
                product_name: 'Test Product',
                product_description: 'Test Description',
                product_price: 100,
                product_tag: ['Test Tag'],
            };
    
            const createdProduct: Product = {
                ...productData,
                _id: new mongoose.Types.ObjectId().toHexString(), 
                id: new mongoose.Types.ObjectId().toHexString(), 
                user: 'testUserId',
                createdAt: new Date(),
                updatedAt: new Date()
            } as Product;

            (productRepository.createProduct as jest.Mock).mockResolvedValue(createdProduct);

            const result = await productServicesImpl.createProduct(productData);

            expect(productRepository.createProduct).toHaveBeenCalledWith(productData);
            expect(result).toEqual(createdProduct);
        })
    })

    describe('getAllProduct', () => {
        it('Should getAllProduct', async() => {
            const products: TestProduct[] = [
                {
                    _id: new mongoose.Types.ObjectId().toHexString(),
                    id: new mongoose.Types.ObjectId().toHexString(), 
                    product_name: 'Product 1',
                    product_description: 'Description 1',
                    product_price: 100,
                    product_tag: ['Tag 1'],
                    user: 'user1',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    _id: new mongoose.Types.ObjectId().toHexString(),
                    id: new mongoose.Types.ObjectId().toHexString(), 
                    product_name: 'Product 2',
                    product_description: 'Description 2',
                    product_price: 200,
                    product_tag: ['Tag 2'],
                    user: 'user2',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ];

            
            (productRepository.getAllProduct as jest.Mock).mockResolvedValue(products);
            const result = await productServicesImpl.getAllProduct();
            expect(productRepository.getAllProduct).toHaveBeenCalled();
            expect(result).toEqual(products);
        })
    })
    describe('getProductById', () => {
        it('should get product by id', async () => {
            type TestProduct = Pick<Product, '_id' | 'product_name' | 'product_description' | 'product_price' | 'product_tag' | 'user' | 'createdAt' | 'updatedAt'>;
    
            const product: TestProduct = {
                _id: new mongoose.Types.ObjectId().toHexString(),
                product_name: 'Product 1',
                product_description: 'Description 1',
                product_price: 100,
                product_tag: ['Tag 1'],
                user: 'user1',
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            (productRepository.getProductById as jest.Mock).mockResolvedValue(product);
    
            const result = await productServicesImpl.getProductById(product._id as string);
    
            expect(productRepository.getProductById).toHaveBeenCalledWith(product._id);
            expect(result).toEqual(product);
        });
    });

    describe('updateProduct', () => {
        it('Should updateProduct', async() => {
            type TestProduct = Pick<Product, '_id' | 'product_name' | 'product_description' | 'product_price' | 'product_tag' | 'user' | 'createdAt' | 'updatedAt'>;

            const product: TestProduct = {
                _id: new mongoose.Types.ObjectId().toHexString(),
                product_name: 'Updated Product',
                product_description: 'Updated Description',
                product_price: 150,
                product_tag: ['Updated Tag'],
                user: 'user1',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const updateData: Partial<Product> = {
                product_name: 'Updated Product',
                product_description: 'Updated Description',
                product_price: 150,
                product_tag: ['Updated Tag'],
            };

            (productRepository.updateProduct as jest.Mock).mockResolvedValue(product);
           
            const result = await productServicesImpl.updateProduct(product._id  as unknown as string, updateData);
            expect(productRepository.updateProduct).toHaveBeenCalledWith(product._id, updateData);
            expect(result).toEqual(product);
        })
    })

    describe('deleteProduct', () => {
        it('Should deleteProduct', async() => {
            type TestProduct = Pick<Product, '_id' | 'product_name' | 'product_description' | 'product_price' | 'product_tag' | 'user' | 'createdAt' | 'updatedAt'>;

            const product: TestProduct = {
                _id: new mongoose.Types.ObjectId().toHexString(),
                product_name: 'Updated Product',
                product_description: 'Updated Description',
                product_price: 150,
                product_tag: ['Updated Tag'],
                user: 'user1',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            (productRepository.deleteProduct as jest.Mock).mockResolvedValue(product)
            const result = await productServicesImpl.deleteProduct(product._id as unknown as string)
            expect(productRepository.deleteProduct).toHaveBeenCalledWith(product._id)
            expect(result).toEqual(product);
        })
    })
})