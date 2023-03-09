const mongoose = require('mongoose')
require('dotenv').config()

const app = require('./app')
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.DB_URI)
  .then(() => console.log('DB CONNECTED'))

app.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`)
})
