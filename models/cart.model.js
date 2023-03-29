const { Schema, model } = require('mongoose')

const CartSchema = new Schema({
  _id: String,
  cart: [
    {
      _id: String,
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
      },
      slug: String,
      thumbnail: String 
    }
  ]
})

module.exports = model('Cart', CartSchema)
