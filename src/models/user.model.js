import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true, // leading or trailing spaces are removed
      index: true, // Makes it searchable in Mongodb
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true, // leading or trailing spaces are removed
    },
    fullname: {
      type: String,
      required: true,
      trim: true, // leading or trailing spaces are removed
      index: true, // Makes it searchable in Mongodb
    },
    avatar: {
      type: String, // Cloudinary url
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true } // Correct placement of schema options
);

userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next()

    this.password= await bcrypt.hash(this.password,10)
    next()
})


userSchema.methods.isPasswordCorrect=async function (password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
    //sign methord generate token
     return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
     )
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
     )
}
const User = mongoose.model("User", userSchema);
export default User;
