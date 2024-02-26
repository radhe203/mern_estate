import { configDotenv } from "dotenv";
import express  from "express"; 
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";
import listingRoutes from './routes/listing.routes.js'
import path from 'path'
configDotenv()

const __dirname = path.resolve()

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("connected to mongodb")
})
.catch((err)=>{
console.log(err)
})
const app = express();
app.use(cookieParser())


app.use(express.json())


app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/listing',listingRoutes)

app.use(express.static(path.join(__dirname,'client/dist')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client' ,'dist' ,'index.html'))
})
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




