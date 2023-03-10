const express = require('express')
const AppError = require('./utils/AppError')

const app = express()
app.use(express.json())

// routes
const userRouter = require('./routes/user')
app.use('/api/users', userRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404))
})

const globalErrorHandler = require('./controllers/errorCtrl')
app.use(globalErrorHandler)

module.exports = app
