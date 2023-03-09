const Router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const authCtrl = require('../controllers/authCtrl')

Router.post('/signup', authCtrl.signup)
Router.post('/login', authCtrl.login)

Router.route('/')
  .get(userCtrl.getAllUsers)

module.exports = Router
