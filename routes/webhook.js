import { Router } from "express";
import { getWebHook, getWebHookAirtel } from "../controllers/webhook.js";




const router = Router()
router.post("/standard", getWebHook)
router.post("/airtel", getWebHookAirtel)




export default router