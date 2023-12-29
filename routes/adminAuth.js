import express  from "express";
import { login, register } from "../controllers/adminAuth.js";



const router = express.Router()
///////router
    router.post("/register", register ) 
    router.post("/login", login) 
/////router
export default router