const { age, date, graduation } = require('../../lib/utils')
const db = require('../../config/db')
const teacher = require('../models/teacher')

module.exports = {
    index(req, res) {
        let Correct_teachers = new Array();
        teacher.all((teachers) => {
            for (row of teachers) {
                Correct_teachers.push({
                    ...row,
                    subjects_taught: row.subjects_taught.split(',')
                })
            }
            return res.render(`teachers/index`, { teachers: Correct_teachers })
        })

    },
    show(req, res) {
        const { id } = req.params
        teacher.find(id, (found_teacher) => {
            if (!found_teacher)
                res.send("Instructor Not Found!")
            const teacher = {
                ...found_teacher,
                age: age(found_teacher.birth_date),
                schooling: graduation(found_teacher.schooling),
                subjects_taught: found_teacher.subjects_taught.split(','),
                created_at: date(found_teacher.created_at).format

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
        teacher.create(req.body, (teacher) => {
            // return res.redirect(`teachers/${teacher.id}`)
            return res.redirect(`teachers`)
        })
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