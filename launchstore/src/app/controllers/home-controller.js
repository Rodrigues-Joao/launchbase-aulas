const Product = require('../models/product')
const File = require('../models/file')

const { formatPrice, date, getImage } = require('../../lib/utils')



module.exports = {
    async index(req, res) {
        let results = await Product.findAll()
        let products = results.rows

        if (!products) return res.send('Products not found!')


        const porductPromise = products.map(async product => {
                product.image = await getImage(req, product.id)
                if (product.old_price && product.old_price > product.price)
                    product.old_price = formatPrice(product.old_price)
                else
                    product.old_price = 0
                product.price = formatPrice(product.price)
                return product
            }).filter((product, index) => index > 2 ? false : true)
            /*  equivalente ao if ternario feito acima ^
                .filter((product, index) => {
                    if(index> 2)
                        return false
                    else
                        return true
                })
             */

        products = await Promise.all(porductPromise)

        return res.render('home/index.njk', { products })
    }
}