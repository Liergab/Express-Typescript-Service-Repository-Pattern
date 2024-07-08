// import { Request, Response, NextFunction } from 'express';
// import { AuthenticatedRequest } from '../types/express';
// import productServicesImpl from '../services/implementation/productServicesImpl';
// import mongoose from 'mongoose';
// import {
//     createProduct,
//     getAllProduct,
//     getProductById,
//     deleteProduct,
//     updateProduct,
// } from '../controllers/productController';

// // Mock productServicesImpl
// jest.mock('../services/implementation/productServicesImpl');

// describe('Product Controller Tests', () => {
//     let req: AuthenticatedRequest | Request;
//     let res: Partial<Response>;
//     let next: jest.MockedFunction<NextFunction>;

//     beforeEach(() => {
//         req = {} as AuthenticatedRequest;
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//         next = jest.fn();
//     });

//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     describe('createProduct', () => {
//         it('should create a new product', async () => {
//             // Mock request data
//             req.body = {
//                 product_name: 'Test Product',
//                 product_description: 'Test Description',
//                 product_price: 100,
//                 product_tag: ['Test Tag'],
//             };
//             req.user = { id: 'user123' };

//             // Mock product creation response
//             const createdProduct = {
//                 _id: 'mockedProductId',
//                 ...req.body,
//                 user: req.user.id,
//                 createdAt: new Date(),
//                 updatedAt: new Date(),
//             };
//             (productServicesImpl.createProduct as jest.Mock).mockResolvedValue(createdProduct);

//             // Call controller function
//             await createProduct(req, res as Response, next);

//             // Assertions
//             expect(res.status).toHaveBeenCalledWith(201);
//             expect(res.json).toHaveBeenCalledWith({ message: 'Product created', product: createdProduct });
//         });

//         it('should handle missing required fields', async () => {
//             // Mock request data with missing fields
//             req.body = {};

//             // Call controller function
//             await createProduct(req, res as Response, next);

//             // Assertions
//             expect(res.status).toHaveBeenCalledWith(400);
//             expect(res.json).toHaveBeenCalledWith({ message: 'All fields required!' });
//         });
//     });

//     describe('getAllProduct', () => {
//         it('should get all products', async () => {
//             // Mock getAllProduct response
//             const products = [{ _id: '1', product_name: 'Product 1' }, { _id: '2', product_name: 'Product 2' }];
//             (productServicesImpl.getAllProduct as jest.Mock).mockResolvedValue(products);

//             // Call controller function
//             await getAllProduct(req as Request, res as Response, next);

//             // Assertions
//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.json).toHaveBeenCalledWith(products);
//         });

//         it('should handle errors in getAllProduct', async () => {
//             // Mock error scenario
//             const errorMessage = 'Database Error';
//             (productServicesImpl.getAllProduct as jest.Mock).mockRejectedValue(new Error(errorMessage));

//             // Call controller function
//             await getAllProduct(req as Request, res as Response, next);

//             // Assertions
//             expect(next).toHaveBeenCalledWith(new Error(errorMessage));
//         });
//     });

//     describe('getProductById', () => {
//         it('should get product by id', async () => {
//             const id = 'mockedProductId';
//             req.params = { id };

//             // Mock getProductById response
//             const product = { _id: id, product_name: 'Test Product' };
//             (productServicesImpl.getProductById as jest.Mock).mockResolvedValue(product);

//             // Call controller function
//             await getProductById(req as Request, res as Response, next);

//             // Assertions
//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.json).toHaveBeenCalledWith(product);
//         });

//         it('should handle invalid id', async () => {
//             const id = 'invalidId';
//             req.params = { id };

//             // Call controller function
//             await getProductById(req as Request, res as Response, next);

//             // Assertions
//             expect(res.status).toHaveBeenCalledWith(400);
//             expect(res.json).toHaveBeenCalledWith({ message: 'Invalid Id' });
//         });

//         it('should handle errors in getProductById', async () => {
//             const id = 'mockedProductId';
//             req.params = { id };

//             // Mock error scenario
//             const errorMessage = 'Database Error';
//             (productServicesImpl.getProductById as jest.Mock).mockRejectedValue(new Error(errorMessage));

//             // Call controller function
//             await getProductById(req as Request, res as Response, next);

//             // Assertions
//             expect(next).toHaveBeenCalledWith(new Error(errorMessage));
//         });
//     });

//     describe('deleteProduct', () => {
//         it('should delete product by id', async () => {
//             const id = 'mockedProductId';
//             req.params = { id };

//             // Mock deleteProduct response
//             (productServicesImpl.deleteProduct as jest.Mock).mockResolvedValue({ message: 'Product Deleted!' });

//             // Call controller function
//             await deleteProduct(req as AuthenticatedRequest, res as Response, next);

//             // Assertions
//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.json).toHaveBeenCalledWith({ message: 'Product Deleted!' });
//         });

//         it('should handle invalid id', async () => {
//             const id = 'invalidId';
//             req.params = { id };

//             // Call controller function
//             await deleteProduct(req as AuthenticatedRequest, res as Response, next);

//             // Assertions
//             expect(res.status).toHaveBeenCalledWith(400);
//             expect(res.json).toHaveBeenCalledWith({ message: 'Invalid Id' });
//         });

//         it('should handle product not found', async () => {
//             const id = 'nonExistingId';
//             req.params = { id };

//             // Mock deleteProduct response
//             (productServicesImpl.deleteProduct as jest.Mock).mockResolvedValue(null);

//             // Call controller function
//             await deleteProduct(req as AuthenticatedRequest, res as Response, next);

//             // Assertions
//             expect(res.status).toHaveBeenCalledWith(404);
//             expect(res.json).toHaveBeenCalledWith({ message: 'Id not found' });
//         });

//         it('should handle errors in deleteProduct', async () => {
//             const id = 'mockedProductId';
//             req.params = { id };

//             // Mock error scenario
//             const errorMessage = 'Database Error';
//             (productServicesImpl.deleteProduct as jest.Mock).mockRejectedValue(new Error(errorMessage));

//             // Call controller function
//             await deleteProduct(req as AuthenticatedRequest, res as Response, next);

//             // Assertions
//             expect(next).toHaveBeenCalledWith(new Error(errorMessage));
//         });
//     });

//     describe('updateProduct', () => {
//         it('should update product by id', async () => {
//             const id = 'mockedProductId';
//             req.params = { id };
//             req.user = { id: 'user123' };

//             // Mock getProductById response
//             const existingProduct = { _id: id, user: 'user123' };
//             (productServicesImpl.getProductById as jest.Mock).mockResolvedValue(existingProduct);

//             // Mock updateProduct response
//             const updatedProduct = { ...existingProduct, product_name: 'Updated Product' };
//             (productServicesImpl.updateProduct as jest.Mock).mockResolvedValue(updatedProduct);

//             // Call controller function
//             await updateProduct(req as AuthenticatedRequest, res as Response, next);

//             // Assertions
//             expect(res.status).toHaveBeenCalledWith(200);
//             expect(res.json).toHaveBeenCalledWith({ message: 'Product updated!', product: updatedProduct });
//         });

//         it('should handle invalid id', async () => {
//             const id = 'invalidId';
//             req.params = { id };

//             // Call controller function
//             await updateProduct(req as AuthenticatedRequest, res as Response, next);

//             // Assertions
//             expect(res.status).toHaveBeenCalledWith(400);
//             expect(res.json).toHaveBeenCalledWith({ message: 'Invalid Id' });
//         });

//         it('should handle permission denied', async () => {
//             const id = 'mockedProductId';
//             req.params = { id };
//             req.user = { id: 'user123' };

//             // Mock getProductById response with different user id
//             const existingProduct = { _id: id, user: 'differentUserId' };
//             (productServicesImpl.getProductById as jest.Mock).mockResolvedValue(existingProduct);

//             // Call controller function
//             await updateProduct(req as AuthenticatedRequest, res as Response, next);

//             // Assertions
//             expect(res.status).toHaveBeenCalledWith(403);
//             expect(res.json).toHaveBeenCalledWith({ message: 'You dont have permission to update this product!' });
//         });

//         it('should handle errors in updateProduct', async () => {
//             const id = 'mockedProductId';
//             req.params = { id };

//             // Mock getProductById response
//             const existingProduct = { _id: id, user: 'user123' };
//             (productServicesImpl.getProductById as jest.Mock).mockResolvedValue(existingProduct);

//             // Mock error scenario
//             const errorMessage = 'Database Error';
//             (productServicesImpl.updateProduct as jest
