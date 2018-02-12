const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/', function (req, res) {
  console.log(res);
  res.send('Got a POST request')
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
