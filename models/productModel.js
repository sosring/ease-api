const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, 'A product must have a title']
  },
  brand: {
    type: String,
    required: [true, 'A product must have a brand']
  },
  category: String,
  description: String,
  stock: {
    type: Number,
    required: [true, 'A product must have a stock']
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price']
  },
  gender: {
    type: String,
    required: [true, 'A product must have a gender']
  },
  sizes: [String],
  images: [String],
})

module.export = model('product', productSchema) 
