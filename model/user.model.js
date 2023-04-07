const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

// name / email / password / passwordConfirm / isActive
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name!']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email!'],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email!']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Please provide your password!'],
    minLength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password!'],
    validate: {
      validator: function(el) {
        console.log(el === this.password)
        return el === this.password 
      },
      message: 'Password are not the same!'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  passwordChangeAt: Date
})

userSchema.pre('save', async function(next) {
  // Encrypt user password 
  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined
  next()
})

userSchema.pre('save', async function(next) {
  // Check if password is not modified 
  if(!this.isModified('password') || this.isNew) return next()

  this.passwordChangeAt = Date.now() - 1000
  next()
})

userSchema.pre(/^find/, function(next) {
  // This Middleware checks if the user is active
  this.find({ isActive: { $ne: false }})
  next()
})

userSchema.methods.comparePassword = async function(clientPass, serverPass) {
  return await bcrypt.compare(clientPass, serverPass)
}

/*
userSchema.methods.checkPasswordChange = async function(JWT_Timestamp) {
  if(this.passwordChangeAt) {
    const changedTimestamp = parseInt(this.passwordChangeAt)

    return JWT_Timestamp < changedTimestamp 
  }

  return false
}
*/

module.exports = mongoose.model('User', userSchema)
