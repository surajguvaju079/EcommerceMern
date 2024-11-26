import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { Skeleton } from '../ui/skeleton';
const ProductImageUpload = ({imageFile,setImageFile,uploadedImageUrl,setUpLoadedImageUrl,isEditMode,imageLoadingState,setImageLoadingState}) => {
 

    console.log(isEditMode,"is Edit Mode")
    const inputRef = useRef(null);
    const handleImageFileChange =(e)=>{
        console.log(e.target.files)
        const selectedFile = e.target.files?.[0] || null;
        if(selectedFile)
             setImageFile(selectedFile);
    }
    const handleDragOver=(e)=>{
            e.preventDefault()
    }
    const handleDrop=(e)=>{
        console.log("drop is working")
        e.preventDefault()
        console.log(e.dataTransfer.files?.[0])
        const droppedFile = e.dataTransfer.files?.[0];
        if(droppedFile)
             setImageFile(droppedFile)

    }
    const uploadImageToCloudinary = async()=>{
        setImageLoadingState(true)
        console.log(imageLoadingState)
        const data = new FormData();
        data.append('my_file',imageFile)
        const response = await axios.post('http://localhost:8000/api/admin/products/upload-image',data)
        console.log(response.data,"response")
        if(response?.data?.success){ 
            setUpLoadedImageUrl(response.data.result.url)
            setImageLoadingState(false)}
        console.log(uploadedImageUrl);

    }
    useEffect(()=>{
            if (imageFile!==null) uploadImageToCloudinary()
    },[imageFile])
    const handleRemoveImage=(e)=>{
        setImageFile(null)
        console.log(inputRef)
        if(inputRef.current){
            inputRef.current.value = ''
        }

        console.log(imageFile)

    }
    return (
    
    <div className='w-full max-w-md mx-auto mt-4'>
        <Label className='text-lg font-semibold mb-2 block'>
            Upload Image

        </Label>
        <div onDragOver={handleDragOver} onDrop={handleDrop} className={`${isEditMode?'opacity-60':null}border-2 border-dashed rounded-lg p-4`}>
            <Input id='image-upload' 
            type='file' 
            className='hidden'
            ref={inputRef}
            disabled={isEditMode}
            onChange={handleImageFileChange}/>
            
                {
                    !imageFile?(
                    <Label htmlFor = 'image-upload' className={` ${isEditMode?'cursor-not-allowed':''}flex flex-col items-center justify-center h-32 cursor-pointer`}>
                        <UploadCloudIcon className='w-20 h-10 text-muted-foreground mb-2'/>
                        <span>Drag & drop or click to upload image</span>

                    </Label>):(
                    imageLoadingState?(
                        <Skeleton className='h-10 bg-gray-100 '/>)
                        :(
                    
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <FileIcon className='w-8 text-primary mr-2 h-8'/>
                        </div>
                        <p className='text-sm font-medium'>
                            {imageFile.name}
                        </p>
                        <Button variant='ghost' className='text-muted-foreground hover:text-foreground' onClick={handleRemoveImage} size='icon'>
                            <XIcon className='w-4 h-4'/>    
                            <span className='sr-only'>Remove File</span>
                        </Button>

                    </div>))
                }
        </div>
    </div>
  )
}

export default ProductImageUpload