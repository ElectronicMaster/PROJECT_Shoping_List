import User from "../Models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export  const signup = async(req,res) => {
    const value = req.body

    try{
        const user = await User.findOne({email: value.email})

        if(user){
            return res.status(409).json({
                status: false,
                message: "User already exist please try to LOGIN!!!"
            })
        }

        value.password = await bcrypt.hash(value.password,10)

        const newUserdetails = new User(value)
        await newUserdetails.save()

        res.status(200).json({
            status:true,
            message:"Data Added Successfully",
            data: newUserdetails
        })
    }catch(err){
        res.status(404).json({
            status:false,
            message:"Server Error",
            error: err
        })
    }
}

export const login = async(req,res) => {
    const value = req.body

    try{
        const user = await User.findOne({email: value.email})

        if(!user){
            return res.status(404).json({
                status: false,
                message: "User not found. If not an user please SIGN UP"
            })
        }
        
        const isPassword = await bcrypt.compare(value.password, user.password)

        if(!isPassword){
            return res.status(401).json({
                status: false,
                message: "Password is Incorrect"
            })
        }

        const JWTtoken = jwt.sign({name: user.name, email: user.email, _id: user._id},process.env.SECRET_KEY,{expiresIn: "24h"})

        res.status(200).json({
            status: true,
            message: "Logged IN success",
            JWTtoken,
            email: user.email,
            name: user.name,
            userID: user._id
        })
    }catch(err){
        res.status(500).json({
            status: false,
            message: "Internal Server Errror",
            error: err
        })
    }
}