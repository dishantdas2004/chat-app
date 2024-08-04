import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "15d"
    })
    // This is how we create a token. It needs a payload and a secret key.
    
    // The server can transmit the JWT token to the browser via a cookie, and upon 
    // requesting the server-side interface, the browser automatically includes the JWT 
    // token in the cookie header.

    res.cookie("jwt", token, {
       maxAge: 15 * 24 * 60 * 60 * 1000, //millisecond
       httpOnly: true, // prevent XSS attacks or cross-site scripting attacks
       sameSite: "strict", //CSRF attacks or cross-site request forgery attacks 
       secure: process.env.NODE_ENV !== "development"
    })
}

export default generateTokenAndSetCookie