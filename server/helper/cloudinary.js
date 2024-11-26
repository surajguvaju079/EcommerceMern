import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer'
cloudinary.config({ 
    cloud_name: 'dww9yifvf', 
    api_key: '496897283263598', 
    api_secret: 'fLM-5NZaKXURI8YQy7mg-6WX9vE' // Click 'View API Keys' above to copy your API secret
});

const storage = new multer.memoryStorage();

export const imageUploadUtil= async(file)=>
{
 const   result = await cloudinary.uploader.upload(file,{
        resource_type:"auto"})

        return result
}
export const upload = multer({storage});

// const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });