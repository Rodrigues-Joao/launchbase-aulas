const db = require('../../config/db')

module.exports = {
    findAll() {
        const query = `
            SELECT * 
            FROM products
            ORDER BY updated_at DESC
        `
        try {
            return db.query(query)
        } catch (err) {
            console.error(err)
        }
    },
    create(data) {
        const query = `
            INSERT INTO products (
                name,
                category_id,
                user_id,
                description,
                old_price,
                price,
                quantity,
                status
                ) VALUES ($1,$2,$3,$4,$5, $6, $7, $8) 
                RETURNING id
                `

        data.price = data.price.replace(/\D/g, '')
        const values = [
            data.name,
            data.category_id,
            data.user_id || 1,
            data.description,
            data.old_price || data.price,
            data.price,
            data.quantity,
            data.status || 1

        ]
        return db.query(query, values)
    },
    find(id) {
        try {
            return db.query('SELECT * FROM products WHERE id = $1', [id])
        } catch (err) {
            console.error(err)
        }
    },
    findUser(user_id) {
        try {
            return db.query('SELECT * FROM products WHERE user_id = $1', [user_id])
        } catch (err) {
            console.error(err)
        }
    },
    update(data) {
        const query = `
            UPDATE products SET
            category_id = $1,
            user_id =$2,
            name =$3,
            description =$4,
            old_price =$5,
            price =$6,
            quantity = $7,
            status =$8
            WHERE id = $9
        `

        const values = [
            data.category_id,
            data.user_id || 1,
            data.name,
            data.description,
            data.old_price,
            data.price,
            data.quantity,
            data.status,
            data.id
        ]

        return db.query(query, values)
    },
    delete(id) {
        return db.query('DELETE FROM products WHERE id = $1', [id])
    },
    files(id) {
        const query = `
            SELECT * FROM files WHERE product_id = ${id}
        `
        try {
            return db.query(query)
        } catch (err) {
            console.error(err)
        }
    },
    search(params) {
        const { filter, category } = params

        let query = ``,
            filterQuery = `WHERE`

        if (category) {
            filterQuery = `
                ${filterQuery}
                products.category_id = ${category}
                AND
            `
        }

        filterQuery = `
            ${filterQuery}
            products.name ilike '%${filter}%'
            OR products.description ilike '%${filter}%'
        `


        query = `
            SELECT  products.*, 
            categories.name AS category_name
            FROM products
            LEFT JOIN categories ON (categories.id = products.category_id)
            ${filterQuery}
            
        `

        return db.query(query)
    }
}