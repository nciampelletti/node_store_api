import Product from "../models/product.js"

export const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort("name")

  res.status(200).json({ products, nbHits: products.length })
}

export const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query
  const queryObject = {}

  if (featured) {
    queryObject.featured = featured === "true" ? true : false
  }

  if (company) {
    queryObject.company = company
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" }
  }

  ///products?numericFilters=price>30,rating>=4
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      "<": "$lt",
      ">=": "$gte",
      "<=": "$lte",
    }
    const regEx = /\b(>|<|>=|<=)\b/g
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    )
    //price-$gt-30,rating-$gte-4

    const options = ["price", "rating"]
    filters = filters.split(",").forEach((element) => {
      const [field, operator, value] = element.split("-")

      if (options.includes(field)) {
        queryObject[field] = {
          [operator]: Number(value),
        }
      }
    })

    console.log(queryObject)
  }

  let result = Product.find(queryObject)

  //sorting
  ///products?sort=name,_id
  if (sort) {
    result = result.sort(sort.split(",").join(" "))
  } else {
    result = result.sort("createdAt")
  }

  //filtering
  ///products?fields=name,_id
  if (fields) {
    const fieldList = fields.split(",").join(" ")
    result = result.select(fieldList)
  } else {
    result = result.select("-__v") //exclude __v
  }

  //pagination
  ///products?page=2&limit=7
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)
  //we have 23 products
  //4 pages by 7 items
  //7 7 7 2

  const products = await result

  res.status(200).json({ products, nbHits: products.length })
}
