const Cart = require('../models/cart.model')
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')

exports.addToCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.create({_id: req.user.id, cart: req.body })

  res.status(200)
   .json({
     status: true,
     cart
   })
})

exports.getCartByUser = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({_id: req.user.id })

  res.status(200)
   .json({
     status: true,
     cart
   })
})
