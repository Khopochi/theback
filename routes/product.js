import { Router } from "express";
import { addProduct, getAllProducts, getCategoriesWithProducts, getProductById, getProducts, getProductsByBarcode, getProductsByDeepCategoryId, getProductsShuffle, searchProducts, searchProductsCategory, searchProductsSub, updateProductById } from "../controllers/product.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import { getSearch, getSearchCat, getSearchItems, getSearchSub } from "../controllers/search.js";
import { Refresh } from "../controllers/refresh.js";

//route requests
const router = Router()

router.post("/addproduct", addProduct)
router.get("/", getAllProducts)
router.get("/getbydeeepid/:id", getProductsByDeepCategoryId)
router.get("/getsingleproduct/:id", getProductById)
router.get("/getproducts/", getProducts)
router.get("/search/:searchTerm", getSearchItems)
router.get("/barcode/:barcode", getProductsByBarcode)
router.put("/update/:id", updateProductById)
router.get("/searchproduct/:searchTerm", getSearch)
router.post("/refresh", Refresh)
router.get("/subcategories/:id", getSearchSub)
router.get("/categories/:id", getSearchCat)
router.get("/home", getCategoriesWithProducts)
router.get("/getshuffle", getProductsShuffle)
router.get("/searchproducts/:id/:searchterm", searchProducts)
router.get("/searchproductscategory/:id/:catid", searchProductsCategory)
router.get("/searchproductsub/:id/:catid", searchProductsSub)




export default router