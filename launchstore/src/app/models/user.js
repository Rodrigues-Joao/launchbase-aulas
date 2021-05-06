const { query } = require('../../config/db')
const db = require('../../config/db')

const { hash } = require('bcryptjs')

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
    async create(data) {
        try {
            const query = `
            INSERT INTO users (
                name,
                email,
                password,
                cpf_cnpj,
                cep,
                address
                ) VALUES ($1,$2,$3,$4,$5,$6) 
                RETURNING id
                `

            const passwordHash = await hash(data.password, 8)
            const values = [
                data.name,
                data.email,
                passwordHash,
                data.cpf_cnpj,
                data.cep,
                data.address
            ]
            const results = await db.query(query, values)
            return results.rows[0].id
        } catch (error) {
            console.error(error)
        }
    },
    async findOne(filters) {
        let query = `SELECT * FROM users`

        Object.keys(filters).map(key => {
            query = `${query} ${key}`
            Object.keys(filters[key]).map(field => {
                query = `${query} ${field} = '${filters[key][field]}'`
            })
        })
        try {
            const results = db.query(query)
            return (await results).rows[0]
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