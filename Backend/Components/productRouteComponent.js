import Product from "../Models/product.js"
import mongoose from "mongoose"

export const displayProducts = async(req,res) => {
    const {userID} = req.query
    
    if(!userID){
        res.status(422).json({
            status: true,
            message: "UserID not Found",
        })
    }

    if(!mongoose.Types.ObjectId.isValid(userID)){
        res.status(422).json({
            status: true,
            message: "UserID not Found",
        })
    }

    try{
        const products = await Product.find({userID: userID})

        if(!products.length){
            return res.status(404).json({
                status: false,
                message: "No Products Found"
            })
        }

        res.status(200).json({
            status: true,
            message: "Products found successfully",
            data: products
        })
    }catch(err){
        res.status(500).json({
            status: false,
            message: "fetching data SERVER ERROR"
        })
    }
}

export const searchProduct =  async(req,res) => {
    const {name} = req.params
    const {userID} = req.body

    try{
        if(!userID){
            res.status(422).json({
                status: false,
                message: "UserID not found"
            })
        }

        const product = await Product.find({
            name: {
                $regex: `^${name}`,
                $options: 'i'
            },
            userID: userID
        })

        if(product){
            res.status(200).json({
                status: true,
                message: "Data found",
                data: product
            })
        }else{
            res.status(404).json({
                status: false,
                messsage: "Data Not Found"
            })
        }
    }catch(err){
        res.status(500).json({
            status: false,
            messsage: "Internal Server Error",
            error: err
        })
    }
}

export const addNewProduct = async(req,res) => {
    const value = req.body

    try{
        const newProduct = new Product(value)
        const product = await newProduct.save()

        res.status(200).json({
            status: true,
            message: "Product Saved successfully",
            productDetails: product
        })
    }catch(err){
        res.status(500).json({
            status: false,
            message: "Internal Server ERROR",
            error: err
        })
    }
}

export const updateProduct = async(req,res) => {
    const {id} = req.params
    const updateProductDetails = req.body

    console.log(updateProductDetails.name)

    if(!updateProductDetails.name && !updateProductDetails.price && !updateProductDetails.image && !updateProductDetails.link){
        return res.status(422).json({
            status: false,
            message: "Please Provide any field to be updated"
        })
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            status: false,
            message: "Bad request wrong ID"
        })
    }

    try{
        const details = await Product.findByIdAndUpdate(id,updateProductDetails,{new: true})

        if(!details){
            return res.status(404).json({
                status: false,
                message: "Product Not Found (or) Deleted",
                error: "Product not found for update"
            })
        }

        res.status(200).json({
            status: true,
            message: "Product Details updated",
            updatedDetails: details
        })
    }catch(err){
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: err
        })
    }
}

export const deleteProduct = async(req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            status: false,
            message: "Bad Request ID not found"
        })
    }
    
    try{
        const deletedProduct = await Product.findByIdAndDelete(id)

        if(!deletedProduct){
            return res.status(404).json({
                status: false,
                message: "Error Data not Found (or) Deleted already",
                error: "Could not find data"
            })
        }

        res.status(200).json({
            status: true,
            message: "Product Succesfully deleted",
            data: deletedProduct
        })
    }catch(err){
        res.status(500).json({
            status: false,
            message: "Server Side ERROR try again"
        })
    }
}