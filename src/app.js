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



export default app;