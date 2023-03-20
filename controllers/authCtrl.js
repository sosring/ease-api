const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')

const signToken = id => {
  return jwt.sign({id: id}, 
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  )
}

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  }) 

  const token = signToken(user._id) 

  res.status(201)
    .json({
      status: "success",
      user,
      token
    })
}) 

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  if(!email || !password) {
    next(new AppError('Please provide email and password', 404))
  }

  const user = await User.findOne({email: email}).select('+password')

  if(!user || !(await user.correctPassword(password, user.password))) {
    next(new AppError('Incorrect Email or Password', 404))
  }

  const token = signToken(user._id)

  res.status(201)
    .json({
      status: "success",
      token
    })
})

exports.protect = catchAsync(async (req, res, next) => {
  // Get the token and check if its there 
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1]
  }
  if(!token) {
    return next(new AppError('You are not loggin in! please log in to get access', 404))
  }

  // Validate the token 
  const decoded = jwt.verify(token, process.env.JWT_SECRET) 
  
  // Check if user still exists
  const currentUser = await User.findById(decoded.id)

  if(!currentUser) {
    return next(new AppError('The user no no longer exist!', 401))
  }

  // Check if user changed password after token was issued
  if(currentUser.changePasswordCheck(decoded.iat)) {
    return next(new AppError('User recently changed the password!', 401))
  }

  // Grant access
  req.user = currentUser
  next()
})

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)) {
      return next(new AppError('You do not have the permission to perform this action!', 403))
    }

    next()
  }
}
