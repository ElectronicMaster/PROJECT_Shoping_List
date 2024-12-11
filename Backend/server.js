import express from "express"
import dotenv from "dotenv"
import connecDB from "./Database/db.js"
import userRouter from "./Routes/userRoute.js" 
import productRouter from "./Routes/productRouter.js"
import cors from "cors"

dotenv.config()

const app = express()
connecDB()

app.use(cors())
app.use(express.json())
app.use("/user",userRouter)
app.use("/product",productRouter)

app.listen(process.env.PORT, 
    console.log("server started")
)