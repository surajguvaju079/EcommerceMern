import { Products } from "../../model/products.js";

export const getAllShopProducts =async (req,res)=>{
    try {
        const {category=[],brand = [],sortBy='price-lowtohigh'} = req.query
        let filters = {};
        console.log(category,'category backend')
        if(category.length){
            filters.category = {$in:category.split(',')}
            console.log(filters.category,'filters category')
        }
        if(brand.length){
            filters.brand={$in: brand.split(',')}
        }
        console.log(filters,'filters')

        let sort = {}
        switch (sortBy) {
            case 'price-lowtohigh':
                sort.price = 1
                break;
            
            case 'price-hightolow':
                sort.price = -1
                break;

            case 'title-atoz':
                sort.title=1
                break;

            case 'title-ztoa':
                sort.title=-1;
                break;
            default:
                sort.price=1
                break;
        }


       const shopProducts = await Products.find(filters).sort(sort)
       console.log(shopProducts)
       res.status(201).json({
        success:true,
        message:"Products were fetched properly.",
        data:shopProducts
       })
    } catch (error) {
        res.status(401).json({
            sucess:false,
            message:'Some errors occured'
        })
    }

}

export const getProductDetails =async (req,res)=>{
    try {
        
        const {id} = req.params;
        const product = await Products.findById(id)
        if(!product)
            res.status(404).json({success:false,
        message:"Product was not found"})
        res.status(201).json({
            success:true,
            data:product
        })
    } catch (error) {
        res.status(401).json({
            success:false,
            message:'Some Error occured'
        })
        
    }
}