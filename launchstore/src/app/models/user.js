const db = require('../../config/db')
const Product = require('../models/product')
const fs = require('fs')

const { hash } = require('bcryptjs')
const { FileSystemLoader } = require('nunjucks')

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
    update(id, fields) {
        let query = `
            UPDATE users SET
        `
        Object.keys(fields).map((key, index, array) => {
            if ((index + 1) < array.length) {
                query = `${query}
                    ${key} = '${fields[key]}',
                `
            } else {
                query = `${query}
                ${key} = '${fields[key]}'
                WHERE id = ${id}
            `
            }
        })

        return db.query(query)
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
    },
    async delete(id) {
        let results = await Product.findUser(id)
        const products = results.rows

        const allFilesPromise = products.map(product => Product.files(product.id))
        let promiseResults = await Promise.all(allFilesPromise)

        await db.query(`DELETE FROM users WHERE id = $1`, [id])

        promiseResults.map(results => {
            results.rows.map(file => fs.unlinkSync(file.path))
        })
    }
}