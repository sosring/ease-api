const router = require('express').Router()
const productController = require('../controller/productController')

router.route('/')
  .get(productController.getAllProducts)

router.route('/:id')
  .get(productController.getProduct)

module.exports = router
