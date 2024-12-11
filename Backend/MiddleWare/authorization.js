import jwt from "jsonwebtoken"

const ensureAuthorization = async(req,res,next)=>{ 
    const auth = req.headers['authorization']

    if(!auth){
        return res.status(403).json({
            status: false,
            message: "Not authorized JWT token is required"
        })
    }

    try{
        jwt.verify(auth, process.env.SECRET_KEY)
        console.log("Authorized")
    }catch(err){
        return res.status(403).json({
            status: false,
            message: "Not authorized JWT token is required"
        })
    }

    next()
}

export default ensureAuthorization