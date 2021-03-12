const Category = require('../models/category')
const Product = require('../models/product')
module.exports = {
    create(req, res) {
        Category.all().then((results) => {
            const categories = results.rows
            return res.render('products/create.njk', { categories })
        }).catch((err) => {
            throw new Error(err)
        })
    },
    async post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == '') {
                return res.send('Please, fill all fields!')
            }
        }

        let results = await Product.create(req.body)
        const productId = results.rows[0].id


        return res.render(`products/${productId}`)
    },
    async edit(req, res) {

        let results = await Product.find(req.params.id)
        const product = results.rows[0]
        if (!product)
            return res.send("Product not found!")
        results = await Category.all()
        const categories = results.rows[0]
        console.log(product)
        return res.render('products/edit.njk', { product, categories })
    }
}