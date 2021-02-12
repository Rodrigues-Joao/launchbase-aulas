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
        teacher.find(id, (teacher) => {
            if (!teacher)
                res.send("Teacher Not Found!")

            teacher.age = age(teacher.birth_date)
            teacher.education_level = graduation(teacher.education_level)
            teacher.subjects_taught = teacher.subjects_taught.split(',')
            teacher.created_at = date(teacher.created_at).format


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
        teacher.find(id, (teacher) => {
            if (!teacher)
                res.send("Teacher Not Found!")

            teacher.birth_date = date(teacher.birth_date).iso


            return res.render(`teachers/edit`, { teacher })
        })


    },
    put(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Por favor, preencha todos os campos")
        }

        teacher.update(req.body, () => {
            return res.redirect(`/teachers/${req.body.id}`)
        })
    },
    delete(req, res) {
        teacher.delete(req.body.id, () => {
            return res.redirect(`/teachers`)
        })
    }
}