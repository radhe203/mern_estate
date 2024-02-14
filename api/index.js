import { configDotenv } from "dotenv";
import express  from "express"; 
import mongoose from "mongoose";
import userRouter from "./routes/user.routes.js"
configDotenv()

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("connected to mongodb")
})
.catch((err)=>{
console.log(err)
})




const app = express();

app.use(userRouter)


app.listen(3000,()=>{
    console.log('server is running on port 3000')
})

