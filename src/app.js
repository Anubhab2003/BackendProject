import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app=express();
//use methord is use in all middlewares configurations

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static('public'))
app.use(cookieParser())//to access and set cookies

//routes
import userRouter from './routes/user.routes.js'

//routes declaration
app.use("/api/v1/users",userRouter)//http://localhost:8000/api/v1/users/register

console.log(process.env.PORT,"SERVER PORT UP AND RUNNING");

export default app;