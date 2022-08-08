import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name must be required"],
  },
  price: {
    type: Number,
    required: [true, "product price must be required"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "bayside", "sandy", "eq3"],
      message: "{VALUE} is not supported",
    },
  },
})

export default mongoose.model("Product", productSchema)
