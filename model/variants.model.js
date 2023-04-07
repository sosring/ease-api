const mongoose = require('mongoose')

const variantSchema = new mongoose.Schema({
  size: {
    type: String,
    require: [true, 'A variant must have a size']
  },
  price: {
    type: Number,
    require: [true, 'A variant must have a price']
  },
  stock: {
    type: Number,
    require: [true, 'A variant must have a stock']
  },
  discount: {
    type: Number,
    default: null
  }
})

module.exports = variantSchema
