const express = require('express')

const app = express()
app.use(express.json())

// routes
const userRouter = require('./routes/user')
app.use('/api/users', userRouter)

module.exports = app
