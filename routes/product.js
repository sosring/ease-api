const Router = require('express').Router()
const productCtrl = require('../controllers/productCtrl') 

Router.post('/create', productCtrl.createNewProduct)

Router.route('/')
  .get(productCtrl.getAllProducts)

Router.route('/:id')
  .get(productCtrl.getProduct)

module.exports = Router
