import express from "express"
import { addNewProduct, deleteProduct, displayProducts, searchProduct, updateProduct } from "../Components/productRouteComponent.js"
import { addProductSchema } from "../MiddleWare/productValidation.js"
import ensureAuthorization from "../MiddleWare/authorization.js"
import Product from "../Models/product.js"

const router = express.Router()

router.use(express.json())
router.use(ensureAuthorization)

router.get("/",displayProducts)
router.post("/:name",searchProduct)
router.post("/",addNewProduct)
router.put("/:id",updateProduct)
router.delete("/:id",deleteProduct)

export default router