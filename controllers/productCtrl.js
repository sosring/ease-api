const Product = require('../models/product.model')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const productModel = require('../models/product.model')
const APIFeatures = require('../utils/ApiFeatures')
const { query } = require('express')

exports.createNewProduct = catchAsync(async(req, res, next) => {
  const product = await Product.create(req.body)

  res.status(201)
    .json({
      status: 'success',
      data: product
    })
})

exports.getAllProducts = catchAsync(async (req, res, next) => {

  const features = new APIFeatures(Product.find(), req.query)
  features.filter().sort().field_limiting().pagination()

  const products = await features.query
  console.log(features.query)

  res.status(200)
    .json({
      status: 'success',
      results: products.length,
      data: products
    })
})

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if(!product) {
    return next(new AppError("Product doesn't exist!", 404))
  }

  res.status(200)
    .json({
      status: 'success',
      data: product
    })
})
