const User = require('../models/user.model')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find()

  res.status(201)
    .json({
      status: "success",
      users
    })
})
