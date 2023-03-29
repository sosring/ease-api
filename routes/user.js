const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const authCtrl = require('../controllers/authCtrl')

router.post('/signup', authCtrl.signup)
router.post('/login', authCtrl.login)

router.route('/')
  .get(userCtrl.getAllUsers)

module.exports = router
