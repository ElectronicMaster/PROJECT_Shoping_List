import Joi from "joi"

export const addProductSchema = (req,res,next) => {
    const productSchema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        userID: Joi.string().required()
    })

    const {error} = productSchema.validate(req.body)

    if(error){
        return res.status(422).json({
            status: false,
            message: "Please provide all the requirement"
        })
    }

    next()
}