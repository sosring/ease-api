// Error handling for production 

const sendDevError = (err, res) => {

  res.status(err.statusCode)
    .json({
      status: err.status,
      message: err.message
    })
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if(process.env.NODE_ENV === 'development') {
    sendDevError(err, res)
  } 
  else if (process.env.NODE_ENV === 'production') {
  }
}
