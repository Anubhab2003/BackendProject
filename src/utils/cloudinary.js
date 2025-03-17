import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Click 'View API Keys' above to copy your
    api_key:process.env.CLOUDINARY_API_KEY, // Click 'View API Keys' above to copy your API key
    api_secret:process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});
console.log(cloudinary.config.cloud_name);

const uploadOnCloudinary= async (localFilePath)=>{
    try{
        if(!localFilePath) return null;
        //upload the file on cloudinary
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //file has been uploaded
        console.log("File uploaded successfully",response.url);
        return response;
    }catch(error){
        fs.unlinkSync(localFilePath);//remove the locally saved temp file as the upload opearation got failed
        return null;
    }

}
export {uploadOnCloudinary}