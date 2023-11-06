const express = require('express')
const routes = require('./routes')
const moongose = require('mongoose')

require('dotenv').config()

const app = express()
const port = 9000
const host = process.env.HOST || 'localhost'

const dbURL = 'mongodb://127.0.0.1:27017/bookshelf'
moongose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.json())

routes(app)

module.exports = app

app.listen(port, host, () => {
  console.log(`Example app listening at http://${host}:${port}`)
})