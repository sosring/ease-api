const { query } = require("express")

class APIFeatures {
  constructor(query, queryString) {
    this.query = query,
    this.queryString = queryString
  }

  filter() {
    // exclude fields /page /sort /limit/ fields
    const queryObj = { ...this.queryString } 
    const exludedFields = ['page', 'limit', 'fields', 'sort']
    exludedFields.forEach(el => delete queryObj[el])

    // Regex filtering for /gte /lte /lt /gt
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

    this.query = this.query.find(JSON.parse(queryStr))
    return this
  }

  sort() {
    if(this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ')
      this.query.sort(sortBy)
    }
    return this
  }

  pagination() {
    const page = this.queryString.page || 1
    const limit = this.queryString.limit || 0
    const skip = (page - 1) * limit
    this.query.skip(skip).limit(limit)

    return this
  }

  fieldsLimit() {
    if(this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ')
      this.query.select(fields)
    }
    return this
  }
}

module.exports = APIFeatures
