# New York Restaurants

This project uses the [publicly available New York restaurant inspection data][nyc-restaurants-csv] to provide a queryable API for finding restaurants matching given criteria.

A version of this is deployed at [new-york-restaurants.appspot.com][production-url].

## `GET /search`

The sole endpoint of the API accepts the parameters:

* `cuisine`: the cuisine description of the restaurant, for example `'Thai'` or `'Italian'`
* `grade`: the restaurant must have met a specific inspection grade, for example `'A'`.
* `min_grade`: the restaurant must have met _at least_ the inspection grade, for example `'B'` would return restaurants with a `'B'` _or_ `'A'` grade.
* `limit`: limits the number of results. If unspecified, defaults to `10`, maximum of `50`, minimum of `1`.
* `skip`: allows skipping results. Useful for pagination. Defaults to `0`.

### Example

```
curl -s "http://new-york-restaurants.appspot.com/search?cuisine=Italian&min_grade=A&limit=5"
```

## Dependencies

If you want to run this locally, note that you will need to provide `ConnectionStrings.MongoDb` in `./config.json`.

```
{
  "ConnectionStrings": {
    "MongoDb": ""
  },
  "MongoDb": {
    "Database": "inspection",
    "Collection": "newyorkcity"
  }
}
```

### Extract, Transform and Load

Once you've setup your MongoDb configuration, you can populate your database by running `etl/run_etl.js`.

Note that this will download the [New York restaurant inspection data][nyc-restaurants-csv] and then insert rows into your MongoDb.

[nyc-restaurants-csv]: https://data.cityofnewyork.us/api/views/43nn-pn8j/rows.csv?accessType=DOWNLOAD "City of New York Restaurant Inspections (~158MB)"
[production-url]: http://new-york-restaurants.appspot.com "New York Restaurants API"
