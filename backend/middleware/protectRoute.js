import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'


const protectRoute = async(req, res, next) => {
    try {
        const token = req.cookies.jwt
        
        if(!token) {
            return res.status(401).json({error: "Unauthorised- No token provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // jwt.verify(token, secretOrPublicKey, [options, callback])
        // (Asynchronous) If a callback is supplied, function acts asynchronously. The 
        // callback is called with the decoded payload if the signature is valid and 
        // optional expiration, audience, or issuer are valid. If not, it will be called 
        // with the error.
        // (Synchronous) If a callback is not supplied, function acts synchronously. 
        // Returns the payload decoded if the signature is valid and optional 
        // expiration, audience, or issuer are valid. If not, it will throw the error.

        if (!decoded) {
            return res.status(401).json({error: "Unauthorised- Invalid token"})
        }

        const user = await User.findById(decoded.userId).select("-password") 
        //-password removes the password

        if(!user) {
            return res.status(404).json({error: "User not found"})
        }

        req.user = user
        // now in req field we have user that is the user in the database
        // currently authenticated user

        next()
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

export default protectRoute