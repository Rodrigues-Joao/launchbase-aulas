const { age, date, grade } = require('../../lib/utils')
const db = require('../../config/db')
const student = require('../models/student')

module.exports = {
    index(req, res) {
        let Correct_students = new Array();
        student.all((students) => {
            for (row of students) {
                Correct_students.push({
                    ...row,
                    school_year: grade(row.school_year)
                })
            }
            return res.render(`students/index`, { students: Correct_students })
        })

    },
    show(req, res) {
        const { id } = req.params
        student.find(id, (student) => {
            if (!student) res.send("Student Not Found!")

            student.birth_date = date(student.birth_date).bithDay
            student.school_year = grade(student.school_year)

            return res.render(`students/show`, { student })
        })
    },
    create(req, res) {
        return res.render('students/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Por favor, preencha todos os campos")
        }
        student.create(req.body, (student) => {
            // return res.redirect(`/students/${student.id}`)
            return res.redirect(`/students`)
        })
    },
    edit(req, res) {
        const { id } = req.params
        student.find(id, (student) => {
            if (!student) res.send("Student Not Found!")

            student.birth_date = date(student.birth_date).iso

            return res.render(`students/edit`, { student })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Por favor, preencha todos os campos")
        }

        student.update(req.body, () => {
            return res.redirect(`/students/${req.body.id}`)
        })
    },
    delete(req, res) {
        student.delete(req.body.id, () => {
            return res.redirect(`/students`)
        })
    }
}