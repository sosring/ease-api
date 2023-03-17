const Router = require('express').Router()
const productCtrl = require('../controllers/productCtrl') 

Router.post('/create', productCtrl.createNewProduct)

Router.route('/')
  .get((req, res) => {
    res.send('hello')
  })

Router.route('/:id')
  .get((req, res) => {
    res.send(req.params.id)
  })

module.exports = Router
