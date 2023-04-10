const User = require('../model/user.model')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const APIFeatures = require('../utils/APIFeatures')

exports.getAllUsers = catchAsync(async (req, res, next) => {

  const users = await User.find() 

  res.status(200)
    .json({
      results: users.length,
      users
    })
})

exports.getUser = catchAsync(async (req, res, next) => {

  const user = await User.findById(req.params.id)

  if(!user) {
    return next(new AppError('No user found', 404))
  }

  res.status(200)
    .json({
      user
    })
})

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user._id

  next()
}) 
