const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

const signToken = id => {
  return jwt.sign({id: id}, 
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  )
}

exports.signup = async (req, res) => {
  try {
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
  }
  catch (err) {

    res.status(404)
      .json({
        status: "fail",
        message: err.message 
      })
  }
} 

exports.login = async (req, res) => {
  try {
  const { email, password } = req.body

  if(!email || !password) {
    throw Error('Please provide email and password')
  }

  const user = await User.findOne({email: email}).select('+password')

  if(!user || !(await user.correctPassword(password, user.password))) {
    throw Error('Incorrect Email or Password')
  }

  const token = signToken(user._id)

  res.status(201)
    .json({
      status: "success",
      user,
      token
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
