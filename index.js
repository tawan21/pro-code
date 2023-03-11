require('dotenv').config()
const connectToMongo = require('./database/db');
const express = require('express')
const cors = require('cors')
connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/snippet', require('./routes/code'))

app.listen(port, () => {
  console.log(`backend listening at http://localhost:${port}`)
})