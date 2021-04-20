const Product = require('../models/product')
const File = require('../models/file')

const { formatPrice, date, getImage } = require('../../lib/utils')



module.exports = {
    async index(req, res) {
        let results,
            params = {}

        try {

            const { filter, category } = req.query

            if (!filter)
                return res.redirect('/')

            params.filter = filter

            if (category) {
                params.category = category
            }

            results = await Product.search(params)

            const productsPromise = results.rows.map(async product => {
                product.image = await getImage(req, product.id)
                if (product.old_price && product.old_price > product.price)
                    product.old_price = formatPrice(product.old_price)
                else
                    product.old_price = 0
                product.price = formatPrice(product.price)
                return product
            })

            const products = await Promise.all(productsPromise)
            const search = {
                term: req.query.filter,
                total: products.length
            }

            const categories = products.map(product => ({
                id: product.category_id,
                name: product.category_name
            })).reduce((categoriesFiltered, category) => {
                const found = categoriesFiltered.some(cat => cat.id == category.id)
                if (!found)
                    categoriesFiltered.push(category)
                return categoriesFiltered
            }, [])

            return res.render('search/index.njk', { products, search, categories })
        } catch (err) {
            console.error(err)
        }

    }
}