class APIFeatures {

  constructor(query, queryString) {
    this.query = query,
    this.queryString = queryString
  }

  filter () {
    const queryObj = {...this.queryString} 
    const excludedFields = ['page', 'limit', 'fields', 'sort', 'name'] 
    excludedFields.forEach(el => delete queryObj[el])

    // Advance filtering
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    
    this.query = this.query.find(JSON.parse(queryStr))
    
    return this
  }

  sort () {
    if(this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ')
      this.query = this.query.sort(sortBy)
    }
    return this
  }

  field_limiting () {
    if(this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ')
      this.query = this.query.select(fields)
    }
    return this
  }

  pagination () {
    const page = this.queryString.page || 1
    const limit = this.queryString.limit || 0
    const skip = (page - 1) * limit
    this.query = this.query.skip(skip).limit(limit)

    return this
  }
}

module.exports = APIFeatures
