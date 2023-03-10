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
      user,
      token
    })
})
