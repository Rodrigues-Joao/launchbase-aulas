const { age, date, graduation, correctedSubjects_taught } = require('../../lib/utils')
const db = require('../../config/db')
const Teacher = require('../models/teacher')

module.exports = {
    index(req, res) {
        let { filter, limit, page } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1),
            pagination

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(teachers) {
                if (teachers.length > 0) {
                    pagination = {
                        page,
                        total: Math.ceil(teachers[0].total / limit)
                    }
                }
                return res.render(`teachers/index`, { teachers: correctedSubjects_taught(teachers), pagination, filter })
            }
        }
        Teacher.paginate(params)


    },
    show(req, res) {
        const { id } = req.params
        Teacher.find(id, (teacher) => {
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
        Teacher.create(req.body, (teacher) => {
            // return res.redirect(`teachers/${teacher.id}`)
            return res.redirect(`teachers`)
        })
    },
    edit(req, res) {
        const { id } = req.params
        Teacher.find(id, (teacher) => {
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

        Teacher.update(req.body, () => {
            return res.redirect(`/teachers/${req.body.id}`)
        })
    },
    delete(req, res) {
        Teacher.delete(req.body.id, () => {
            return res.redirect(`/teachers`)
        })
    }
}