const db = require('../../config/db')
const { age, date, graduation } = require('../../lib/utils')

module.exports = {
    all(callback) {

        const query = `SELECT * FROM students ORDER BY name ASC`
        db.query(query, (err, results) => {
            if (err) throw `Database eroor = ${err}`

            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO students (
                avatar_url,
                name,
                email,
                birth_date,
                school_year,
                workload
                ) VALUES ($1,$2,$3,$4,$5, $6) 
                RETURNING id
                `
        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth_date).iso,
            data.school_year,
            data.workload

        ]
        db.query(query, values, (err, results) => {
            if (err) throw `Database eroor = ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        const query = `SELECT * FROM students WHERE id IN (${id})`
        db.query(query, (err, results) => {
            if (err) throw `Database eroor = ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
        UPDATE students SET
            avatar_url = $1,
            name= $2,
            email= $3,
            birth_date= $4,
            school_year= $5,
            workload= $6
        WHERE id = $7
        `
        const values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth_date).iso,
            data.school_year,
            data.workload,
            data.id

        ]
        db.query(query, values, (err, results) => {
            if (err) throw `Database eroor = ${err}`

            callback()
        })
    },
    delete(id, callback) {
        const query = `DELETE FROM students WHERE id = ${id} `
        db.query(query, (err) => {
            if (err) throw `Database eroor = ${err}`

            callback()
        })
    }
}