const User = require('../models/user.model')

exports.getAllUsers = async (req, res) => {
  try {
  const user = await User.find()

  res.status(201)
    .json({
      status: "success",
      user
    })
  }
  catch (err) {

    res.status(404)
      .json({
        status: "fail",
        message: err.message 
      })
  }
} 
