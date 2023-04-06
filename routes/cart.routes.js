const router = require('express').Router()
const cartCtrl = require('../controllers/cartCtrl')
const authCtrl = require('../controllers/authCtrl') 

router.use(authCtrl.protect)
// This will pass req.user if there's one  

router.post('/create', cartCtrl.addToCart) 

router.get('/', cartCtrl.getCartByUser) 

module.exports = router
