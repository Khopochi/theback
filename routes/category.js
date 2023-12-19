import { Router } from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import { addCategory, deleteCategory, getAllCategories, getSingleCategory, updateCategory } from "../controllers/category.js";


//route requests
const router = Router()

router.post("/addCategory", addCategory)
router.put("/updateCategory/:id",  updateCategory)
router.delete("/deleteCategory/:id",  deleteCategory)
router.get("/getSingleCategory/:id",  getSingleCategory)
router.get("/", getAllCategories)





export default router