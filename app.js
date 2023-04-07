const express = require('express') 
const cors = require('cors')
require('dotenv').config()
const AppError = require('./utils/AppError')

const app = express()

app.use(express.json())
app.use(cors())

// Router
const productRouter = require('./routes/product.routes')
const userRouter = require('./routes/user.routes')
const globalErrorHandler = require('./controller/errorController')

// Handling unknow routes
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})
app.use(globalErrorHandler)

module.exports = app
