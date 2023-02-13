const express = require('express')
const router = express.Router()

const { getAllProducts, getProduct,
   addProduct, deleteProduct } = require('../controllers/productCtrl') 

router.route('')
  .get(getAllProducts)
  .post(addProduct)
  .delete(deleteProduct)

router.route('/:id')
  .get(getProduct)

module.exports = router
