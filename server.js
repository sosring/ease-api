const mongoose = require('mongoose')
require('dotenv').config()

const app = require('./app')
const PORT = process.env.PORT || 5000

let DB_URI = process.env.DB_URI
DB_URI = DB_URI.replace('<password>', process.env.DB_PASS)

mongoose.connect(DB_URI)
  .then(() => console.log('DB CONNECTED'))

app.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`)
})
