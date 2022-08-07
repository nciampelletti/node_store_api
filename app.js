import dotenv from "dotenv"
dotenv.config()

//async errors

import express from "express"
const app = express()

import connectDB from "./db/connect.js"
import productRoute from "./routes/products.js"
import { errorHandlerMiddleware } from "./middleware/error-handler.js"
import { notFound } from "./middleware/not-found.js"

app.use(express.json())

//routes
app.get("/", (req, res) => {
  res.send("<h1>Store API</h1><a href='/api/v1/products'>products route</a>")
})

app.use("/api/v1/products", productRoute)

//products route

app.use(errorHandlerMiddleware)
app.use(notFound)

const port = process.env.PORT || 4444
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
)

const start = async () => {
  try {
    await connectDB(DB)

    app.listen(port, () => {
      console.log("server is running on port: " + port)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
