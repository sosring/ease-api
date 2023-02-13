// Model 
const Product = require('../models/productModel.js')

exports.getAllProducts = async (req, res) => {

  const products = await Product.find()
  res.status(200)
    .json({
      status: 'success',
      results: products.length,
      data: products 
    })
}   

exports.getProduct = async (req, res) => {
  
  const product = await Product.find({_id: req.params.id})
  res.status(200)
    .json({
      status: 'success',
      data: product
    })
}

exports.addProduct = async (req, res) => {

  const products = await Product.create(req.body)
  res.status(201)
    .json({
      status: 'success',
      data: products 
    })
}
