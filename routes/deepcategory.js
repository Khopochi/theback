import { Router } from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { addDeepcategory, deleteDeepcategory, getAllCatDeep, getAllDeepCategories, getCategoriesByTerm, getSingleDeepcategorYPage, getSingleDeepcategory, updateDeepcategory } from "../controllers/deepcategoty.js";



//route requests
const router = Router()

router.post("/addDeepcategory",  addDeepcategory)
router.put("/updateDeepcategory/:id",  updateDeepcategory)
router.delete("/deleteDeepcategory/:id",  deleteDeepcategory)
router.get("/getSingleDeepcategory/:id",  getSingleDeepcategory)
router.get("/", getAllDeepCategories)
router.get("/home", getAllCatDeep)
router.get("/search/:term", getCategoriesByTerm)
router.get("/page/:id", getSingleDeepcategorYPage)





export default router