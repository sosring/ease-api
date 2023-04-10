const router = require('express').Router()
const authController = require('../controller/authController')
const userController = require('../controller/userController')

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.get('/me', 
  authController.protect,
  userController.getMe, 
  userController.getUser)

router.use(authController.protect, 
   authController.restrictTo('admin'))

router.route('/')
  .get(userController.getAllUsers)

router.route('/:id')
  .get(userController.getUser)

module.exports = router
