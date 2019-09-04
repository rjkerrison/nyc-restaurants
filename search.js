const MongoClient = require('mongodb').MongoClient
const uri = require('./config.json').ConnectionStrings.MongoDb

function mongodbQuery(db, query, successCallback, errorCallback) {
  const collection = db.db('inspection').collection('newyorkcity')
  const request = mapToRequest(query)
  console.log('query', request)

  const result = collection.find(request).batchSize(50)

  result.map(mapToResponse).toArray((err, res) => {
    if (err) {
      console.log(err)
      errorCallback('Internal Error x02 Occurred')
    }
    else {
      successCallback(res)
    }

    db.close()
  })
}

function search(req, res) {
  const client = new MongoClient(uri, { useNewUrlParser: true })
  client.connect((err, db) => {
    if (err) {
      console.log(err)
      res.status(501).send('Internal Error x01 Occurred')
      return
    }

    mongodbQuery(
      db,
      req.query,
      (result) => res.status(200).send(result),
      (error) => res.status(501).send(error))
  })
}

function mapToRequest(query) {
  const request = {}

  if (query.cuisine) {
    request['CUISINE DESCRIPTION'] = query.cuisine
  }

  if (query.grade) {
    request['GRADE'] = query.grade
  }

  return request
}

function mapToResponse(row) {
  return {
    name: row['DBA'],
    address: `${row['BUILDING']} ${row['STREET']}`,
    zipcode: row['ZIPCODE'],
    cuisine: row['CUISINE DESCRIPTION'],
    grade: row['GRADE']
  }
}

module.exports = search
