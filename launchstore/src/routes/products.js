const express = require('express')
const routes = express.Router()

const ProdcutController = require('../app/controllers/product-controller')
const SearchController = require('../app/controllers/search-controller')
const multer = require('../app/middlewares/multer')
const { onlyUsers } = require('../app/middlewares//session')


routes.get('/search', SearchController.index)
routes.get('/create', onlyUsers, ProdcutController.create)
routes.get('/:id', ProdcutController.show)
routes.get('/:id/edit', onlyUsers, ProdcutController.edit)

routes.post('/', onlyUsers, multer.array("photos", 6), ProdcutController.post)
routes.put('/', onlyUsers, multer.array("photos", 6), ProdcutController.put)

routes.delete('/', onlyUsers, ProdcutController.delete)

module.exports = routes