import express from "express"
import { login, signup } from "../Components/userRouteComponent.js"
import { loginValidation, signupValidation } from "../MiddleWare/validation.js"


const router = express.Router()
router.use(express.json())

router.post("/signup",signupValidation,signup)
router.post("/login",loginValidation,login)

export default router