import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

// iZByS4oNLQrvGK2b

const connecDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected")
    }catch(err){
        console.log("DB_CONNECTION_ERROR :: ", err)
    }
}

export default connecDB