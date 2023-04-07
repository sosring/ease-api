const Product = require('../model/product.model') 
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const APIFeatures = require('../utils/APIFeatures')

const sendResponds = (res, data, statusCode) => {

  res.status(statusCode)
    .json({
      results: data.length,
      data
    })
}

exports.getAllProducts = catchAsync(async (req, res, next) => {

  let feature = new APIFeatures(Product.find(), req.query)
    .filter().sort().pagination().fieldsLimit()
    
  // Filter 
  
  const products = await feature.query 

  sendResponds(res, products, 200)
})

exports.getProduct = catchAsync(async (req, res, next) => {

  const product = await Product.findById(req.params.id)

  if(!product) {
    return next(new AppError('product does not exist!', 400))
  }

  sendResponds(res, product, 200)
})
