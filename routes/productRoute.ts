import express from 'express'
import  * as controller from '../controller/productController'
import { authMiddleware } from '../middleware/authMiddleware'

const productRouter = express.Router()

productRouter.post('/product', authMiddleware, controller.createProduct )
productRouter.get('/product', controller.getAllProduct)
productRouter.get('/product/:id', controller.getProductById)
productRouter.delete('/product/:id',[authMiddleware], controller.deleteProduct)
productRouter.put('/product/:id',[authMiddleware], controller.updateProduct)

export default productRouter