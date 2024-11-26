import React from 'react'

import {
    Card,
    CardContent,
    
    CardFooter,
    
  } from "@/components/ui/card"
import { Button } from '../ui/button'
  
const AdminProductTile = ({productItem,setCurrentEditedId,handleDelete,setOpenCreateProductsDialog,setFormData}) => {
    
  return (
    <Card className='w-full max-w-sm mx-auto' >
        <div>
            <div className='relative'>
                <img
                src={productItem?.image}
                alt = {productItem?.title}
                className="w-full h-[300px] object-cover rounded-t-lg"
                ></img>
            </div>
        
  <CardContent>
    <h2 className="text-xl mt-2 font-bold mb-2">{productItem?.title}</h2>
    <div className='flex justify-between items-center mb-2'>
        <span className={`${productItem?.salePrice>0?'line-through':''}  text-lg font-semibold text-primary`}>${productItem?.price}</span>
     {
        productItem.salePrice>0?<span className="text-lg font-bold">${productItem?.salePrice}</span>:null
     }
        
    </div>

  </CardContent>
  <CardFooter className='flex justify-between items-center'>
    <Button onClick={()=>{
      console.log(productItem?._id)
      setOpenCreateProductsDialog(true);
      setCurrentEditedId(productItem?._id);
      console.log(productItem)
      setFormData(productItem)
    }} className="bg-blue-700 text-muted rounded-[8px] text-white px-4 py-3 hover:bg-blue-500 hover:text-muted-foreground">Edit</Button>
    <Button onClick={()=>{handleDelete(productItem._id)}}  className="bg-red-700 text-muted rounded-[8px] text-white px-4 py-3 hover:bg-red-500 hover:text-muted-foreground">Delete</Button>
  </CardFooter>
  </div>
</Card>

  )
}

export default AdminProductTile