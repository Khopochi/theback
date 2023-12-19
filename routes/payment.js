import { Router } from "express";
import { addPayment, getAllPayments, getSinglePayment } from "../controllers/payment.js";
import { verifyAdmin } from "../utils/verifyToken.js";



const router = Router()
//routes
router.post("/addPayment", addPayment)
router.get("/getSinglePayment/:id", getSinglePayment)
router.get("/", verifyAdmin , getAllPayments)



export default router