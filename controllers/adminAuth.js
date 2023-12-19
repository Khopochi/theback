import Admin from "../models/Admin.js";
import Jwt  from "jsonwebtoken";
import bcrypt from "bcryptjs"




//function to register admin
export const register = async (req,res) => {
    try{
        //encrypt our passwords
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);


        //create new user
        const newUser = new Admin({
            username:req.body.username,
            email:req.body.email,
            password:hash

        })
        const myUser = await newUser.save()
         //jwt tokens and alike
         const token = Jwt.sign({id:myUser._id, isAdmin:myUser.isAdmin}, process.env.JWT)

         //filtering out other parameters
         const {password, isAdmin, ...otherDetails} = myUser._doc;
         res.
         cookie("access_token", token, {
             httpOnly:true,
         }).status(200).json({...otherDetails})
    }catch(err){
        res.status(200).json({error: "Operation Failed", errorDetails: err})

    }
}

//login usre starts here
export const login = async (req,res) => {
    try{
        const user = await Admin.findOne({username:req.body.username})
        if(!user){
            res.status(200).json({ error: "No user" })
        }
        
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect){
            return res.status(200).json({ error: "Wrong Password" })
        }  

        //jwt tokens and alike
        const token = Jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT)

        //filtering out other parameters
        const {password, isAdmin, ...otherDetails} = user._doc;

        res.
        cookie("access_token", token, {
            httpOnly:true,
        }).status(200).json({...otherDetails})
    }catch(err){
        res.status(200).json({error: "Operation Failed"})
    }
}
//loginuser ends here
