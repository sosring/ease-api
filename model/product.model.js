const mongoose = require('mongoose')
const variantSchema = require('./variants.model')
const slugify = require('slugify') 

// name / brand / description / category / gender / images / variants 
// ratingAverage / ratingQuantity
// thumbnail / summary / slug meddleware 
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name!'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'A product must have a brand!'],
    trim: true
  },
  description: {
    type: String,
    maxlength: [500, 'A product description must be below 300 letters'],
    required: [true, 'A product must have a description!'],
    trim: true
  },
  category: String,
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  images: {
    type: [String],
    required: [true, 'A product must have images!']
  },
  variants: {
    type: [variantSchema]
  },
  ratingAverage: {
    type: Number,
    default: 0,
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  thumbnail: String,
  summary: String,
  slug: String
})

productSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true }) 
  this.thumbnail = this.images[0]
  this.summary = this.description.slice(0, 150)
  
  next()
})

module.exports = mongoose.model('Product', productSchema)
