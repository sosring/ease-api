const express = require('express')
const app = express()
 
// Middleware
app.use(express.json())

// Routes
const productRouter = require('./routes/product') 
app.use('/api/products', productRouter)

module.exports = app
