import {asyncHandler} from './../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import User from "../models/user.model.js"
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser=asyncHandler(async(req,res)=>{
    //Get user details from frontend
    //Validation- not empty
    //check if user already exists: username,email
    //check for images, check for avatar
    //upload them to cloudinary, avatar
    //create user object -create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return response


    const {fullName,email,username,password}=req.body
    console.log(fullName)

    if(fullName===""||email===""||username===""||password===""){
        
        throw new ApiError(400,'Please fill all the fields')
    }

    const existedUser=User.findOne({
        $or:[{username}, {email}]
    })
    if(existedUser){
        throw new ApiError(409,'User already exists')
    }
    
    const avatarLocalPath=req.files?.avatar[0]?.path
    const coverImageLocalPath=req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400,'Please upload an avatar')
    }

    const avatar=await uploadOnCloudinary(avatarLocalPath)
    const coverImage=await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,'Please upload an avatar')
    }

    const user=await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",
        email,
        username:username.tolowerCase(),
        password
    })

    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )//Kya kya nahi chayhe usse likh

    if(!createdUser){
        throw new ApiError(500,'SORRY SOMETHING WENT WRONG ON OUR SIDE')
    }

    return res.status(201).json(
        new ApiResponse(200,{user:createdUser},'User registered successfully')
    )

})

export{
    registerUser
}
