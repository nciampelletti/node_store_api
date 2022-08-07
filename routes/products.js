import {
  getAllProducts,
  getAllProductsStatic,
} from "../controllers/products.js"

import express from "express"

const router = express.Router()

router.route("/").get(getAllProducts)
router.route("/static").get(getAllProductsStatic)

export default router
