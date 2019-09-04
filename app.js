const express = require('express')
const search = require('./search')

const app = express()

app.get('/', (req, res) => {
  res.status(200).send('New York Restaurants')
})

app.get('/search', (req, res) => search(req, res))

if (module === require.main) {
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port
    console.log(`App listening on port ${port}`)
  })
}

module.exports = app
