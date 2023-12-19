import express  from "express";
import { login, register } from "../controllers/userAuth.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import { addItem, countItemsInCart, deleteUser, getAllUsers, getCartDetails, getSingleUser, getUserCart, removeCartFromUser, updateUser } from "../controllers/user.js";




const router = express.Router()
///////router
    router.post("/register", register )
    router.post("/login", login) 
    router.put("/updateUser/:id", updateUser)
    router.delete("/deleteUser/:id", verifyAdmin, deleteUser)
    router.get("/getSingleUser/:id", getSingleUser)
    router.get("/", verifyAdmin, getAllUsers)
    router.post("/addtocart/:id", addItem)
    router.get("/getcartdetails/:id", getCartDetails)
    router.get("/countitems/:id", countItemsInCart)
    router.put("/removeitem/:userId/:cartId", removeCartFromUser)
    router.get("/usercarts/:userId", getUserCart)
/////router
export default router