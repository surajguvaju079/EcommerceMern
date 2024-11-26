import mongoose from "mongoose";
const productsSchema = new mongoose.Schema({
    image:String,
    title:String,
    description:String,
    category:String,
    brand:String,
    price:Number,
    salePrice:Number,
    totalStock:Number
},{
    timestamps:true
})

export const Products = mongoose.model("Product",productsSchema)