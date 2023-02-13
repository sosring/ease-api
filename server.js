const mongoose = require('mongoose')
const app = require('./app')

// Accessing dotenv file
require('dotenv')
  .config({ path: './config.env' })

const PORT = process.env.PORT || 5000

const DB_URI = process.env.DB_URI.replace(
  '<password>',
  process.env.DB_PASS
)

mongoose.set('strictQuery', true)
mongoose.connect(DB_URI, { useNewUrlParser: true })
  .then(() => console.log('DB CONNECTED'))

app.listen(PORT , () => {
  console.log(`LISTENING TO PORT ${PORT}`)
})
