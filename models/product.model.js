const { Schema, model } = require('mongoose')
const slugify = require('slugify')

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name!'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'A product must have a brand!']
  },
  description: {
    type: String,
    required: [true, 'A product must have a description!'],
    maxlength: [500, 'A product description must be under 300 letters!'],
    trim: true
  },
  summary: String,
  category: {
    type: String,
    required: [true, 'A product must have a category!'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: 'Gender is either male or female'
    }
  },
  images: {
    type: [String],
    required: [true, 'A product must have an image!']
  },
  variants: [{
    size: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    stock: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      default: null 
    }
  }],
  slug: String,
  thumbnail: String 
})

ProductSchema.pre('save', function(next){
  this.slug = slugify(this.name, { lower: true }) 
  this.thumbnail = this.images[0]
  this.summary = `${this.description.slice(0, 150)}...` 

  next()
})

module.exports = model('Product', ProductSchema)
