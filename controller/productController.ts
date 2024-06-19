import {Request, Response, NextFunction} from 'express'
import { AuthenticatedRequest } from '../types/express'
import productServicesImpl from '../services/implementation/productServicesImpl'
import mongoose from 'mongoose'

export const createProduct = async(req:AuthenticatedRequest, res:Response, next:NextFunction) => {
    try {
        const{ product_name,  product_description, product_price, product_tag} = req.body

        if(!product_name || !product_description || !product_price || !product_tag){
            res.status(400)
            throw new Error('All fields required!')
        }

        const productData = {
            ...req.body,
            user:req.user?.id
        }

        const product = await productServicesImpl.createProduct(productData)

        res.status(201).json({message:'Product created', product})
        
    } catch (error) {
        next(error)
    }
}

export const getAllProduct = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const product = await productServicesImpl.getAllProduct();

        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
}

export const getProductById = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const{id} = req.params
        if (!mongoose.isValidObjectId(id)) {
            res.status(400)
            throw new Error('Invalid Id')
        }
        const product = await productServicesImpl.getProductById(id)
        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
}


export const deleteProduct = async(req:AuthenticatedRequest, res:Response, next:NextFunction) => {
    try {
        const{id} = req.params
        if (!mongoose.isValidObjectId(id)) {
            res.status(400)
            throw new Error('Invalid Id')
        }
        const product = await productServicesImpl.deleteProduct(id)
        if(product){
            res.status(200).json({message:'Product Deleted!'})
        }else{
            res.status(404)
            throw new Error('Id not found')
        }
       
    } catch (error) {
        next(error)
    }
}


export const updateProduct = async(req:AuthenticatedRequest, res:Response, next:NextFunction) => {
    try {
        const {id} = req.params
        if (!mongoose.isValidObjectId(id)) {
            res.status(400)
            throw new Error('Invalid Id')
        }
        const findProduct = await productServicesImpl.getProductById(id)
        

        if(req.user?.id !== findProduct?.user.toString()){
            res.status(403)
            throw new Error('You dont have permission to update this product!')
        }
        const product = await productServicesImpl.updateProduct(id, req.body)

        res.status(200).json({message:'Product updated!', product})
    } catch (error) {
        next(error)
    }
}