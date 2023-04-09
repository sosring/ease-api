const express = require('express') 
const cors = require('cors')
require('dotenv').config()
const AppError = require('./utils/AppError')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(cookieParser())

const corsOption = {
  credentials: true,
  origin: 'http://localhost:3000'
}
app.use(cors(corsOption))

// Router
const productRouter = require('./routes/product.routes')
const userRouter = require('./routes/user.routes')
const globalErrorHandler = require('./controller/errorController')

// Handling unknow routes
app.use((req, res, next) => {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)
  next()
})

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})
app.use(globalErrorHandler)

module.exports = app
