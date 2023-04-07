const User = require('../model/user.model')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const APIFeatures = require('../utils/APIFeatures')

exports.signup = catchAsync(async (req, res, next) => {

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  })

  res.status(201)
    .json({
      newUser
    })
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

  // Send Token

  // Send responds
  res.status(200)
    .json({
      user
    })
})