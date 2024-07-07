import { Product } from '../../model/PRODUCT_MODEL';
import ProductRepository from '../../repositories/productRepository';
import mongoose from 'mongoose';

jest.mock('../../model/PRODUCT_MODEL', () => ({
    create: jest.fn(),
    find: jest.fn().mockReturnThis(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    exec: jest.fn(),
}));

const PRODUCT_MODEL = require('../../model/PRODUCT_MODEL');

describe('ProductRepository', () => {
    let productRepository: typeof ProductRepository;

    beforeEach(() => {
        productRepository = ProductRepository;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createProduct', () => {
        it('should create a new product', async () => {
            const productData: Partial<Product> = {
                product_name: 'Test Product', // Provide a default value for product_name
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
    
            (PRODUCT_MODEL.create as jest.Mock).mockResolvedValue(createdProduct);
    
            const result = await productRepository.createProduct(productData);
    
            expect(PRODUCT_MODEL.create).toHaveBeenCalledWith(productData);
            expect(result).toEqual(createdProduct);
        });
    });

    describe('getAllProduct', () => {
        it('should get all products', async () => {
            type TestProduct = Pick<Product, '_id' | 'id' | 'product_name' | 'product_description' | 'product_price' | 'product_tag' | 'user' | 'createdAt' | 'updatedAt'>;


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
    
            // Mock the return value of PRODUCT_MODEL.find
            (PRODUCT_MODEL.find().exec as jest.Mock).mockResolvedValue(products);
    
            // Call the getAllProduct method
            const result = await productRepository.getAllProduct();
    
            // Assert that PRODUCT_MODEL.find was called
            expect(PRODUCT_MODEL.find).toHaveBeenCalled();
    
            // Assert that the result matches the mocked products
            expect(result).toEqual(products);
        });
    });
})