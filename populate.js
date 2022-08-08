import dotenv from "dotenv"
dotenv.config()
import connectDB from "./db/connect.js"
import Product from "./models/product.js"

const port = process.env.PORT || 4444
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
)

import { products } from "./products.js"

const start = async () => {
  try {
    await connectDB(DB)
    await Product.deleteMany()
    await Product.create(products)

    console.log("done!")
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
