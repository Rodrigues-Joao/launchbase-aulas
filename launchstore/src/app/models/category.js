const db = require('../../config/db')

module.exports = {
    all() {
        let query = `SELECT * FROM categories`

        return db.query(query)
    }
}