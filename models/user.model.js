const { Schema, model } = require('mongoose')
const slugify = require('slugify')
const validator = require('validator')
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "Please give us your firstname!"],
    unique: true
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
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
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
  },
  passwordChangeAt: Date
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

UserSchema.methods.changePasswordAt = function (JWT_Timestamp) {
  if(this.passwordChangeAt) {
    const changeTimeStamp = parseInt(this.passwordChangeAt.getTime() / 1000, 10)
    console.log(changeTimeStamp)
    return JWT_Timestamp < changeTimeStamp
  }

  return false
}

module.exports = model('Users', UserSchema)
