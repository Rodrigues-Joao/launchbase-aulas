const express = require('express')
const ProdcutController = require('./app/controllers/product-controller')
const HomeController = require('./app/controllers/home-controller')
const SearchController = require('./app/controllers/search-controller')
const multer = require('./app/middlewares/multer')


const routes = express.Router()
routes.get('/', HomeController.index)
routes.get('/products/search', SearchController.index)
routes.get('/products/create', ProdcutController.create)
routes.get('/products/:id', ProdcutController.show)
routes.get('/products/:id/edit', ProdcutController.edit)

routes.post('/products', multer.array("photos", 6), ProdcutController.post)
routes.put('/products', multer.array("photos", 6), ProdcutController.put)

routes.delete('/products', ProdcutController.delete)


/*----- Alias -----*/
routes.get('/ads/create', (req, res) => {
    return res.redirect('/products/create')
})


module.exports = routes