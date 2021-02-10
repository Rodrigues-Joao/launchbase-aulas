const db = require('../../config/db')
const { age, date, graduation } = require('../../lib/utils')

module.exports = {
    all(callback) {

        const query = `SELECT * FROM teachers`
        db.query(query, (err, results) => {
            if (err)
                return res.send('Database error!')


            callback(results.rows)
        })
    },
    create(data, calback) {
        const query = `
            INSERT INTO teachers (
                avatar_url,
                name,
                birth_date,
                education_level,
                class_type,
                subjects_taught,
                created_at
                ) VALUES ($1,$2,$3,$4,$5, $6,$7) 
                RETURNING id
                `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth_date).iso,
            data.education_level,
            data.class_type,
            data.subjects_taught,
            date(Date.now()).iso

        ]
        db.query(query, values, (err, results) => {
            if (err) {
                return res.send('Database error!')
            }

            calback(results.rows[0])
        })
        return
    },
    find(id, callback) {
        const query = `SELECT * FROM teachers WHERE id IN (${id})`
        db.query(query, (err, results) => {
            if (err)
                return res.send('Database error!')
            callback(results.rows[0])
        })
    }
}