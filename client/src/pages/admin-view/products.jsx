import ProductImageUpload from '@/components/admin-view/image-upload'
import AdminProductTile from '@/components/admin-view/product-tile'
import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import {Sheet,SheetHeader, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { addNewProduct, deleteProduct, editProduct, getAllProducts } from '@/store/admin/products-slice/product-slice'
import { useEffect, useState } from 'react'
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const initialFormData={
  image:null,
  title:'',
  description:'',
  category:'',
  brand:'',
  price:'',
  salePrice:'',
  totalStock:''
}
const AdminProducts = () => {
  const [openCreateProductsDialog,setOpenCreateProductsDialog]=useState(false)
  const [formData,setFormData] = useState(initialFormData)
  const [imageFile,setImageFile] = useState(null)
  const [uploadedImageUrl,setUpLoadedImageUrl] = useState('')
  const [imageLoadingState,setImageLoadingState] = useState(false);
  const [currentEditedId,setCurrentEditedId] = useState(null)
  
  
 
 
  const dispatch = useDispatch()
  const {toast} = useToast()
  const { productList } = useSelector(state=>state.adminProducts)
  useEffect(()=>{
      dispatch(getAllProducts());
  },[dispatch])

  const onSubmit = (e)=>{
    e.preventDefault();
    console.log(isFormvalid())
    console.log(formData)
    currentEditedId!==null?
      dispatch(editProduct(
      {id:currentEditedId,formData}
    )).then((data)=>{
      console.log(data," edit")
      console.log(formData,":Edited form data")
      if(data?.payload?.success){
        dispatch(getAllProducts());
        setImageFile(null);
        setFormData(initialFormData);
        setOpenCreateProductsDialog(false);
        toast({
          title:"Products edited successfully"
        });  
      }
    }).catch(error=>console.log(error))
    :
    dispatch(addNewProduct({...formData,image:uploadedImageUrl})).then(data=>{
      console.log(data)
      if(data?.payload?.success){
      dispatch(getAllProducts());
      setImageFile(null);
      setFormData(initialFormData);
      setOpenCreateProductsDialog(false);
      toast({
        title:"Products added successfully"
      });
      
      }
    }).catch(error=>console.log(error))

  }
  const isFormvalid = ()=>{
    return Object.keys(formData).map((key)=>formData[key]!=='')
    .every((item)=>item)
  }
  const handleDelete = async (id)=>{
    console.log(id)
    dispatch(deleteProduct(id)).then((data)=>{console.log(data)
      if(data?.payload?.success)
         dispatch(getAllProducts());

      
    }).catch(error=>console.log(error))

  }
  console.log(productList)
  return (
    <Fragment>
      <div className="mb-5 flex justify-end w-full">
        <Button onClick={()=>setOpenCreateProductsDialog(true)} className="bg-green-900 hover:bg-blue-900  text-white px-4 py-3 rounded-[8px]">Add New Product</Button>
      </div> 
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
      {
        productList && productList.length>0?
        productList.map(productItem=><AdminProductTile
          key={productItem._id}
          setCurrentEditedId={setCurrentEditedId} 
          setFormData = {setFormData}
          setOpenCreateProductsDialog ={setOpenCreateProductsDialog}
          productItem={productItem}
          handleDelete = {handleDelete}/>)
          :null
          
          
      }
      
        </div>
        <Sheet open={openCreateProductsDialog}  
        onOpenChange={
          ()=>{
            setOpenCreateProductsDialog(false)
            setCurrentEditedId(null);
            setFormData(initialFormData)
          }
        }>
          <SheetContent side='right' className='overflow-auto  bg-white ' >
            <SheetHeader>
              <SheetTitle>
                <SheetDescription className="text-2xl underline">
                {currentEditedId!==null?'Edit Data':"Add Data"}
                </SheetDescription>
              </SheetTitle>
            </SheetHeader>
            <ProductImageUpload 
            imageFile={imageFile} 
            setImageFile={setImageFile}
             uploadedImageUrl={uploadedImageUrl}
             setImageLoadingState={setImageLoadingState}
             imageLoadingState = {imageLoadingState}
              setUpLoadedImageUrl={setUpLoadedImageUrl}
              isEditMode= {currentEditedId!==null}
              />
              
            <CommonForm
   
             onSubmit={onSubmit}
             formData={formData}
             setFormData={setFormData}
             buttonText={currentEditedId!==null?'Edit':"Add"}
             formControl={addProductFormElements}
             isBtnDisabled={!isFormvalid()}
            />
             
          </SheetContent>

        </Sheet>

      
    </Fragment>
  )
}

export default AdminProducts