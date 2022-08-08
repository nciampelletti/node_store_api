import Product from "../models/product.js"

export const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({})
  res.status(200).json({ products, nbHits: products.length })
}

export const getAllProducts = async (req, res) => {
  const products = await Product.find(req.query)
  res.status(200).json({ products, nbHits: products.length })
}
