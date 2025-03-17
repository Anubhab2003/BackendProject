
// require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import connectDB from './db/index.js';
import app from './app.js' 

dotenv.config({
    path:'./env'
})


//WHEN ASYNC FUNCTION EXECUTES IT ALSO RETURNS A PROMISE
connectDB()
.then(()=>{
    app.listen(process.env.PORT ||8000,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGODB CONNECTION ERROR: ", err)
})






// const app = express()

// ;(async ()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error",()=>{console.log("Applications not able to talk to database")
//             throw error;
//         }
        
//     )
//     app.listen(process.env.PORT,()=>{
//         console.log(`Server is running on port ${process.env.PORT}`)
//     })
//     }catch(error){
//         console.error("Error: ", error)
//         throw error
//     }
// })()// semi colon for cleaning up the code