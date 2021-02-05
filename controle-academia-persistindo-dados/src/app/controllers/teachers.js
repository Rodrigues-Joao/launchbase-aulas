const { age, date, graduation } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    index(req, res) {
        let teachers = new Array();
        const query = `SELECT * FROM teachers`
        db.query(query, (err, results) => {
            if (err) {
                return res.send('Database error!')
            }
            for (row of results.rows) {
                teachers.push({
                    ...row,
                    services: row.services.split(',')
                })
            }
            return res.render(`teachers/index`, { teachers })
        })

    },
    show(req, res) {
        const { id } = req.params
        const query = `SELECT * FROM teachers WHERE id IN (${id})`
        db.query(query, (err, results) => {
            if (err) {
                return res.send('Database error!')
            }
            const teacher = {
                ...results.rows[0],
                age: age(results.rows[0].birth),
                schooling: graduation(results.rows[0].schooling),
                services: results.rows[0].services.split(','),
                created_at: new Intl.DateTimeFormat("pt-BR").format(results.rows[0].created_at)

            }
            return res.render(`teachers/show`, { teacher })
        })

    },
    create(req, res) {
        return res.render('teachers/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Por favor, preencha todos os campos")
        }

        const query = `
            INSERT INTO teachers (
                avatar_url,
                name,
                birth,
                schooling,
                classes,
                services,
                created_at
                ) VALUES ($1,$2,$3,$4,$5, $6,$7) 
                RETURNING id
                `
        const values = [
            req.body.avatar_url,
            req.body.name,
            date(req.body.birth).iso,
            req.body.schooling,
            req.body.classes,
            req.body.services,
            date(Date.now()).iso

        ]
        db.query(query, values, (err, results) => {
            if (err) {
                return res.send('Database error!')
            }

            return res.redirect(`teachers/${results.rows[0].id}`)
        })
        return

    },
    edit(req, res) {
        const { id } = req.params

        const query = `SELECT * FROM teachers WHERE id IN (${id})`
        db.query(query, (err, results) => {
            if (err) {
                return res.send('Database error!')
            }
            const teacher = {
                ...results.rows[0],
                birth: date(results.rows[0].birth).iso

            }

            return res.render('teachers/edit', { teacher })
        })

    },
    put(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Por favor, preencha todos os campos")
        }

        let { avatar_url, name, birth, school_year, workload } = req.body
    },
    delete(req, res) {

    }
}