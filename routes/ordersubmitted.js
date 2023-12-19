import { Router } from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { addOrdersubmitted, getAllOrders, getOrder, getOrdersubmittedByOrderId, getSingleOrder, updateOrdersubmitted } from "../controllers/orderonsubmitted.js";


const router = Router()
router.post("/addOrdersubmitted", addOrdersubmitted)
router.put("/updateOrdersubmitted/:id", updateOrdersubmitted)
router.get("/getorder/:id", getOrder)
router.get("/getorders/", getAllOrders)
router.get("/getsingleorder/:id", getSingleOrder)
router.get("/getsinglebyorderid/:id", getOrdersubmittedByOrderId)



export default router