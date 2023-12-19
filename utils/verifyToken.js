import  Jwt  from "jsonwebtoken";


// Middleware to verify the presence and validity of an access token in the request cookies.
// If the token is missing or invalid, it responds with a 401 status and an error message.
// If the token is valid, it sets the user information in the request and passes control to the next middleware.
export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token
    if(!token){
        return res.status(401).json({ error: "No token" });
    }

    Jwt.verify(token,process.env.JWT, (err,user)=>{
        if(err) return res.status(401).json({ error: "Invalid token" });

        req.user = user
        next()
    })

}
// Middleware to verify if the user associated with the request has the same ID as specified in the request parameters
// or if the user is an admin. If not, it responds with a 403 status and an unauthorized error message.
// Utilizes the verifyToken middleware for token validation.
export const verifyUser = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json({ error: "Unauthorized" });
        }
    })
}
// Middleware to verify if the user associated with the request is an admin.
// If not, it responds with a 403 status and an unauthorized error message.
export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json({ error: "Unauthorized" });
        }
    })
}