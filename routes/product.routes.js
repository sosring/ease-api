const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl') 
const reviewRouter = require('./review.routes')

router.use('/:productId/reviews', reviewRouter)

router.post('/create', productCtrl.createNewProduct)

router.route('/')
  .get(productCtrl.getAllProducts)

router.route('/:id')
  .get(productCtrl.getProduct)
  .delete(productCtrl.deleteProduct)

module.exports = router
