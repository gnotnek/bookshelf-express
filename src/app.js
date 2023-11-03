const express = require('express')
const routes = require('./routes')
const moongose = require('mongoose')

const app = express()
const port = 9000

const dbURL = 'mongodb://127.0.0.1:27017/bookshelf'
moongose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.json())

routes(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})