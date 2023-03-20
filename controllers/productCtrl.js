const Product = require('../models/product.model')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')

exports.createNewProduct = catchAsync(async(req, res, next) => {
  const product = await Product.create(req.body)

  res.status(201)
    .json({
      status: 'success',
      data: product
    })
})
