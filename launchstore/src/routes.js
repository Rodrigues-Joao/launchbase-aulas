const express = require('express')
const ProdcutController = require('./app/controllers/product-controller')


const routes = express.Router()
routes.get('/', (req, res) => {
    return res.render("layout.njk")
})
routes.get('/products/create', ProdcutController.create)
routes.get('/ads/create', (req, res) => {
    return res.redirect('/products/create')
})


module.exports = routes