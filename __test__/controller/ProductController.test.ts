import { Response, Request, NextFunction } from "express";
import { AuthenticatedRequest } from "../../types/express";
import productServicesImpl from "../../services/implementation/productServicesImpl";
import { Product } from "../../model/PRODUCT_MODEL";
import mongoose from "mongoose";
import { createProduct, 
         getAllProduct, 
         getProductById, 
         updateProduct, 
         deleteProduct }  from '../../controller/productController';


jest.mock('../../services/implementation/productServicesImpl');
describe('Product Controller', () => {
    let req: AuthenticatedRequest
    let res: Partial<Response>
    let next: jest.MockedFunction<NextFunction>

    type TestProduct = Pick<Product, '_id' | 'id' | 'product_name' | 'product_description' | 'product_price' | 'product_tag' | 'user' | 'createdAt' | 'updatedAt'>;

    beforeEach(() => {
        req = {} as AuthenticatedRequest;
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    describe('createProduct', () => {
        it('Should create a new product', async() => {

            req.body = {
                product_name: 'Test Product',
                product_description: 'Test Description',
                product_price: 100,
                product_tag: ['Test Tag'],
            };

            
            req.user = {
                id: 'user123',
                email: 'example@example.com',
                isAdmin: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            } as AuthenticatedRequest['user'];

            const createdProduct = {
                _id: 'mockedProductId',
                ...req.body,
                user: req.user!.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            (productServicesImpl.createProduct as jest.Mock).mockResolvedValue(createdProduct);

            await createProduct(req, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'Product created', product: createdProduct });

        })


        it('should handle missing required fields', async () => {
            req.body = {};

            
            await createProduct(req, res as Response, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(next).toHaveBeenCalledWith(expect.objectContaining({
                message: 'All fields required!'
            }));
        });

        it('should handle other errors', async () => {
            (productServicesImpl.createProduct as jest.Mock).mockRejectedValue(new Error('Some unexpected error'));
            await createProduct(req, res as Response, next);
            expect(next).toHaveBeenCalledWith(expect.any(Error));
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    })

    describe('getAllProduct', () => {
        it('Should return all product', async() => {

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

            (productServicesImpl.getAllProduct as jest.Mock).mockResolvedValue(products);

            await getAllProduct(req as Request, res as Response, next)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(products);
        })

        it('should handle other errors', async () => {
            (productServicesImpl.getAllProduct as jest.Mock).mockRejectedValue(new Error('Some unexpected error'));
            await getAllProduct(req, res as Response, next);
            expect(next).toHaveBeenCalledWith(expect.any(Error));
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    })


    describe('getProductById', () => {

        it('Should return product by Id', async() => {
            type TestProduct = Pick<Product, '_id' | 'product_name' | 'product_description' | 'product_price' | 'product_tag' | 'user' | 'createdAt' | 'updatedAt'>;
            const id =  new mongoose.Types.ObjectId().toHexString();
            req.params = { id };
            const product: TestProduct = {
                _id: id,
                product_name: 'Product 1',
                product_description: 'Description 1',
                product_price: 100,
                product_tag: ['Tag 1'],
                user: 'user1',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            (productServicesImpl.getProductById as jest.Mock).mockResolvedValue(product);

            await getProductById(req, res as Response, next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(product);
        })

        it('should handle mInvalid Id', async () => {
            const id = 'invalidId';
            req.params = { id };
            await getProductById(req, res as Response, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(next).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Invalid Id'
            }));
        });

        it('should handle other errors', async () => {
            (productServicesImpl.getProductById as jest.Mock).mockRejectedValue(new Error('Some unexpected error'));
            await getProductById(req, res as Response, next);
            expect(next).toHaveBeenCalledWith(expect.any(Error));
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    })

    describe('deleteProduct', () => {
        it('Should delete product', async() => {
           
            const id = new mongoose.Types.ObjectId().toHexString();
            req.params = { id };
            

            (productServicesImpl.deleteProduct as jest.Mock).mockResolvedValue({ message: 'Product Deleted!' });
            await deleteProduct(req, res as Response, next)
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({message:"Product Deleted!"});
        })

        it('should return invalid Id', async() => {
            const id = "invalidId"
            req.params = {id}

            await deleteProduct(req, res as Response, next)
            expect(res.status).toHaveBeenCalledWith(400);
            expect(next).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Invalid Id'
            }));
        })
        it('should return invalid Id', async() => {
            const id = new mongoose.Types.ObjectId().toHexString();
            req.params={ id };

            (productServicesImpl.deleteProduct as jest.Mock).mockResolvedValue(null)
            await deleteProduct(req, res as Response, next)
            expect(res.status).toHaveBeenCalledWith(404);
            expect(next).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Product not found'
            }));
        })

        it('should handle other errors', async () => {
            (productServicesImpl.deleteProduct as jest.Mock).mockRejectedValue(new Error('Some unexpected error'));
            await deleteProduct(req, res as Response, next);
            expect(next).toHaveBeenCalledWith(expect.any(Error));
            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).not.toHaveBeenCalled();
        });
    })
})