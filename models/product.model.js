const { Schema, model } = require('mongoose')
const slugify = require('slugify')

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name!']
  },
  brand: {
    type: String,
    required: [true, 'A product must have a brand!']
  },
  description: {
    type: String,
    required: [true, 'A product must have a description!'],
    maxlength: [300, 'A product description must be under 300 letters!']
  },
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
  sizes: [{
    size: String,
    price: Number,
    stock: Number,
    Discount: {
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

  next()
})

module.exports = model('Product', ProductSchema)
