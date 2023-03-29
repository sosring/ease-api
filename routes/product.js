const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl') 

router.post('/create', productCtrl.createNewProduct)

router.route('/')
  .get(productCtrl.getAllProducts)

router.route('/:id')
  .get(productCtrl.getProduct)

module.exports = router
