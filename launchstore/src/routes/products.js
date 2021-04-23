const express = require('express')
const routes = express.Router()

const ProdcutController = require('../app/controllers/product-controller')
const SearchController = require('../app/controllers/search-controller')
const multer = require('../app/middlewares/multer')


routes.get('/search', SearchController.index)
routes.get('/create', ProdcutController.create)
routes.get('/:id', ProdcutController.show)
routes.get('/:id/edit', ProdcutController.edit)

routes.post('/', multer.array("photos", 6), ProdcutController.post)
routes.put('/', multer.array("photos", 6), ProdcutController.put)

routes.delete('/', ProdcutController.delete)

module.exports = routes