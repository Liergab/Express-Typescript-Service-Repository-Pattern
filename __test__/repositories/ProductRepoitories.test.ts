import { Product } from '../../model/PRODUCT_MODEL';
import ProductRepository from '../../repositories/productRepository';
import mongoose from 'mongoose';

jest.mock('../../model/PRODUCT_MODEL', () => ({
    create: jest.fn(),
    find: jest.fn().mockReturnThis(),
    findById: jest.fn().mockReturnThis(),
    findByIdAndUpdate: jest.fn().mockReturnThis(),
    findByIdAndDelete: jest.fn().mockReturnThis(),
    exec: jest.fn(),
}));

const PRODUCT_MODEL = require('../../model/PRODUCT_MODEL');

describe('ProductRepository', () => {
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
    
            (PRODUCT_MODEL.find().exec as jest.Mock).mockResolvedValue(products);
            const result = await productRepository.getAllProduct();
            expect(PRODUCT_MODEL.find).toHaveBeenCalled();
            expect(result).toEqual(products);
        });
    });

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

            (PRODUCT_MODEL.findById().exec as jest.Mock).mockResolvedValue(product);

            const result = await productRepository.getProductById(product._id  as unknown as string);
            expect(PRODUCT_MODEL.findById).toHaveBeenCalledWith(product._id);
            expect(result).toEqual(product);
        });
    });

    describe('updateProduct', () => {
        it('should update a product', async () => {
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

            (PRODUCT_MODEL.findByIdAndUpdate().exec as jest.Mock).mockResolvedValue(product);
           
            const result = await productRepository.updateProduct(product._id  as unknown as string, updateData);
            expect(PRODUCT_MODEL.findByIdAndUpdate).toHaveBeenCalledWith(product._id, updateData, { new: true });
            expect(result).toEqual(product);
        });
    });

    describe('deleteProduct', () => {
        it('should deleteProduct', async () => {
            

          


            (PRODUCT_MODEL.findByIdAndDelete().exec as jest.Mock).mockResolvedValue(product);
           
            const result = await productRepository.deleteProduct(product._id  as unknown as string);
            expect(PRODUCT_MODEL.findByIdAndDelete).toHaveBeenCalledWith(product._id);
            expect(result).toEqual(product);
        });
    });


})