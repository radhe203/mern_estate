import { configDotenv } from "dotenv";
import express  from "express"; 
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"
configDotenv()

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("connected to mongodb")
})
.catch((err)=>{
console.log(err)
})


const app = express();

app.use(express.json())

app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error hello'
    return res.status(statusCode).json({
        sucess:false,
        statusCode,
        message,

    })
})



app.listen(3000,()=>{
    console.log('server is running on port 3000')
})




