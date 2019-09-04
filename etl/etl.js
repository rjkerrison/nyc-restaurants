const fs = require('fs')
const csv = require('fast-csv')

const MongoClient = require('mongodb').MongoClient
const uri = require('../config.json').ConnectionStrings.MongoDb
const mongoDbConfig = require('../config.json').MongoDb

function loadIntoMongoDb(err, db) {
  const collection = db.db(mongoDbConfig.Database).collection(mongoDbConfig.Collection)
  let count = 0

  function insertEachRow(row) {
    collection.insertOne(row, resolveError)
    count++
    if (count % 1000 == 0) {
      console.log(count)
    }
  }

  function complete() {
    console.log('complete', count)
    db.close()
  }

  forEachLineIn('./newyork-inspections.csv', insertEachRow, complete)
}

function forEachLineIn(csvFile, callback, completionCallback) {
  fs.createReadStream(csvFile)
    .pipe(csv.parse({ headers: true }))
    .on('data', callback)
    .on('finish', completionCallback)
}

function resolveError(err, res) {
  if (err) {
    console.log(err)
  }
}

if (module === require.main) {
  const client = new MongoClient(uri, { useNewUrlParser: true })
  client.connect(loadIntoMongoDb)
}
