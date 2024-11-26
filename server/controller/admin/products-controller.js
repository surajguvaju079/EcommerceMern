import { imageUploadUtil } from "../../helper/cloudinary.js";
import { Products } from "../../model/products.js";


export const handleImageUpload = async (req,res)=>{

    try {
        
        const b64 = Buffer.from(req.file.buffer).toString('base64')
        const url = 'data:'+req.file.mimetype +';base64,'+b64;
        const result = await imageUploadUtil(url);
        res.json({
            success:true,
            result
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"error occured"
        })
        
    }
}

export const addProduct = async(req,res)=>{
    try {
        const {image,title,description,category,brand,price,salePrice,totalStock}=req.body
       const productExist =await Products.findOne({image});
       if(productExist) 
        return res.status(401).json({success:false,message:"Products already exists"})
       const newProduct = new Products({image,title,description,category,brand,price,salePrice,totalStock})
        await newProduct.save()
        res.status(201).json({success:true,message:"Product was added successfully",data:newProduct})

    
    } catch (error) {
        console.log(error)
        res.status(401).json({success:false,
            message:"Some error occured"
        })
        
    }
}
export const fetchAllProducts = async(req,res)=>{
    try {
        const listAllProducts = await Products.find({})
        res.status(201).json({success:true,message:"Datas successfully fetched",data:listAllProducts})
    } catch (error) {
        console.log(error)
        res.status(401).json({success:false,
            message:"Some error occured"
        })
        
    }
}
export const editProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        console.log('Edited id:',id)
        const{image,title,description,category,brand,price,salePrice,totalStock} = req.body
        console.log(req.body)
        const findProduct = await Products.findById(id)
        if(!findProduct)
            return res.status(404).json({
        success:false,
    message:'Product Not found'})
    
    findProduct.image = image || findProduct.image
    findProduct.title = title || findProduct.title
    findProduct.brand = brand || findProduct.brand
    findProduct.category = category || findProduct.category
    findProduct.description = description || findProduct.description
    findProduct.price =price===''?0: price || findProduct.price
    findProduct.salePrice =salePrice===''?0: salePrice || findProduct.salePrice
    findProduct.totalStock = totalStock || findProduct.totalStock
    console.log(findProduct)
    await findProduct.save();
    return res.status(200).json({
        success:true,
        data:findProduct
    })
    } catch (error) {
        console.log(error)
        res.status(401).json({success:false,
            message:"Some error occured"
        })
        
    }
}
export const deleteProduct = async(req,res)=>{
    try {
        const {id} = req.params
        console.log("server product delete id:",id)
        const product = await Products.findByIdAndDelete(id);
        if(!product)
            return res.status(404).json({success:false,
        message:"product not found"})

        return res.status(200).json({
            success:true,
            data:product
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({success:false,
            message:"Some error occured"
        })
        
    }
}