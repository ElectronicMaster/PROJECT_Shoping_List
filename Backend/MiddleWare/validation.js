import joi from "joi"

export const signupValidation = async(req,res,next) => {
    const userSchema = joi.object({
        name: joi.string().min(3).max(100).trim(),
        email: joi.string().email().trim(),
        password: joi.string().min(3).max(20).trim()
    })

    const {error} = userSchema.validate(req.body)

    if(error){
        console.log(error.details[0].message)
        return res.status(422).json({
            status: false,
            message: error.details[0].message
        })
    }

    next()
}

export const loginValidation = async(req,res,next) => {
    const loginSchema = joi.object({
        email: joi.string().email().trim(),
        password: joi.string().min(3).max(20).trim()
    })

    const {error} = loginSchema.validate(req.body)

    if(error){
        return res.status(422).send({
            status: false,
            message: error.details[0].message
        })
    }

    next()
}