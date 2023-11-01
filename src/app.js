const express = require('express')
const routes = require('./routes')

const app = express()
const port = 9000

app.use(express.json())

routes(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})