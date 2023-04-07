const mongoose = require('mongoose')
const app = require('./app')

//const DB = process.env.DB_URI.replace('<password>', process.env.DB_PASS)

mongoose.connect(process.env.DB_URI)
  .then(() => console.log('DB CONNECTED'))

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`LISTENING TO PORT ${PORT}`)
})
