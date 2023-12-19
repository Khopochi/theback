import { Router } from "express";
import { addLocation, getAllLocations, updateLocation } from "../controllers/shipping.js";



const router = Router()

router.post("/", addLocation)
router.put("update/:id", updateLocation)
router.get("/", getAllLocations)


export default router