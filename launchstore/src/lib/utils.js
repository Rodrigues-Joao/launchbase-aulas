const Product = require('../app/models/product')
module.exports = {

    date: function(timestamp) {
        const date = new Date(timestamp)
        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)
        const hour = date.getHours()
        const minutes = `0${date.getMinutes()}`.slice(-2)


        return {
            day,
            month,
            year,
            hour,
            minutes,
            iso: `${year}-${month}-${day}`,
            bithDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    },
    formatPrice(price) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price / 100)
    },
    getImage: async function(req, productId) {
        let results = await Product.files(productId)
        const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace('public','')}`)

        return files[0]
    }

}