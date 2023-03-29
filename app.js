const express = require('express')
const AppError = require('./utils/AppError')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

// routes
const userRouter = require('./routes/user')
const productRouter = require('./routes/product') 
const cartRouter = require('./routes/cart')

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404))
})

const globalErrorHandler = require('./controllers/errorCtrl')
app.use(globalErrorHandler)

module.exports = app
