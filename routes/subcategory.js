import { Router } from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { addSubcategory, deleteSubcategory, getAllSubCategories, getAllSubDeep, getSingleSubcategory, getSpecificCategory, updateSubcategory } from "../controllers/subcategory.js";



//route requests
const router = Router()

router.post("/addSubcategory",  addSubcategory)
router.put("/updateSubcategory/:id",  updateSubcategory)
router.delete("/deleteSubcategory/:id",  deleteSubcategory)
router.get("/getSingleSubcategory/:id",  getSingleSubcategory)
router.get("/" , getAllSubCategories)
router.get("/home" , getAllSubDeep)
router.get("/specific/:id", getSpecificCategory)





export default router