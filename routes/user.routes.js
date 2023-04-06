const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const authCtrl = require('../controllers/authCtrl')

router.post('/signup', authCtrl.signup)
router.post('/login', authCtrl.login)

router.route('/')
  .get(userCtrl.getAllUsers)

router.get('/:id', userCtrl.getUser)

// Route protect Middleware which will return req.user 
router.use(authCtrl.protect)

router.patch('/updateMe', userCtrl.updateMe)
router.delete('/deactivate', userCtrl.deactivateUser) 

module.exports = router
