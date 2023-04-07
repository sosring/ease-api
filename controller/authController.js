const User = require('../model/user.model')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const APIFeatures = require('../utils/APIFeatures')
const jwt = require('jsonwebtoken')

const signToken = id => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  })
}

const createAndSendToken  = (user, statusCode, res) => {

  const token = signToken(user._id)
  const cookieOption = {
    expires: new Date(Date.now() * process.env.JWT_COOKIE_EXPIRES),
    httpOnly: true
  }
  // If production set secure true
  if(process.env.NODE_ENV === 'production') cookieOption.secure = true
  res.cookie('jwt', token, cookieOption)

  user.password = undefined

  res.status(statusCode)
    .json({
      user,
      token
    })
}

exports.signup = catchAsync(async (req, res, next) => {

  // Create a user if it meets the credentials 
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  })

  createAndSendToken(newUser, 200, res)
}) 

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body
  // Check if req.body has password & email 
  if(!email || !password) {
    return next(new AppError('Please provide your email and password!', 404))
  }

  // Check if the user exist ? send Error 
  const user = await User.findOne({email: email}).select('+password')

  console.log(await user.comparePassword(password, user.password))
  if(!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 404))
  }

 createAndSendToken(user, 200, res)
})

exports.protect = catchAsync(async (req, res, next) => {
  // Check if theres Headers.authorization token & startsWith 'Bearer' 
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if(!token) {
    return next(new AppError('You are not logged in! Please log in to get access.'))
  }
  // Decode and validate token
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  console.log(decoded)
  
  // Check if the user still exist 
  const currentUser = await User.findById(decoded.id)    
  if(!currentUser) {
    return next('User no longer exist!', 404)
  }

  // Check if user has chaged the password 
  // Model methods checkPasswordChange   

  // Send req.user = currentUser 
  req.user = currentUser
  next()
})

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403))
    }
    next()
  }
}

// Update password
// Reset Password
// Forgot password