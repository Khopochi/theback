import { Router } from "express";
import { TransactionAIRTEL, TransactionSTD, checkBalanceAirtel } from "../controllers/transaction.js";




const router = Router()
//routing
router.post("/stdbank", TransactionSTD)
router.post("/airtel", TransactionAIRTEL)
router.get("/airtel/checkbalance", checkBalanceAirtel)






export default router