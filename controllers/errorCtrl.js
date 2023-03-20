const AppError = require('../utils/AppError')

const handleCastErrorDB = (err, res) => {
  const message = `Invalid ${err.path}: ${err.value}`
  return new AppError(message, 400)
}

const handleDuplicationFieldsDB = (err, res) => {
  const message = `Duplicate field value, Please use another value!`
  return new AppError(message, 400)
}

const handleValidationErrorDB = (err, res) => {
  return new AppError('Invalid input data', 400)
}

const sendErrorDev = (err, res) => {
  res.status(err.statusCode)
    .json({
      status: err.status,
      message: err.message
    })
}

const sendErrorProd = (err, res) => {
  if(err.isOperational) {
    res.status(err.statusCode)
      .json({
        status: err.status,
        message: err.message
      })
  } else {
    console.log('ERROR', err)

    res.status(500)
      .json({
        status: 'error',
        message: 'Something went wrong!'
      })
  }
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 404
  err.status = err.status || 'error'

  if(process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res)
  }
  else if (process.env.NODE_ENV === 'production') {

    let error = {...err}
    if(error.name === 'CastError') error = handleCastErrorDB(error) 
    if(error.code === 11000) error = handleDuplicationFieldsDB(error)
    if(error.name === 'ValidationError') error = handleValidationErrorDB(error)

    sendErrorProd(error, res)
  }

  next()
}
