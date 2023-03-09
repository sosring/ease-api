const { Schema, model } = require('mongoose')
const slugify = require('slugify')
const validator = require('validator')
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "Please give us your firstname!"],
  },
  lastname: {
    type: String,
    required: [true, "Please give us your lastname!"],
  },
  slug: String,
  email: {
    type: String,
    required: [true, "Please provide us your email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email!"]
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  photo: {
    type: String
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function(el) {
        return el === this.password
      },
      message: "Passwords are not the same!"
    }
  }
})

UserSchema.pre('save', async function(next) {
  const fullname = `${this.firstname} ${this.lastname}` 
  this.slug = slugify(fullname, { lower: true })

  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined
  next()
})

UserSchema.methods.correctPassword = async function(userPassword, serverPassword) {
  return bcrypt.compare(userPassword, serverPassword)
}

module.exports = model('Users', UserSchema)
