const fs = require('fs')
const data = require('../data.json')
const { age, date, graduation } = require('../utils')

exports.index = function(req, res) {
    let students = new Array();
    /*for (let i = 0; i < data.students.length; i++) {

        students.push({
            ...data.students[i],
            services: data.students[i].services.split(',')
        })
    }*/


    return res.render('students/index', { students: data.students })
}

exports.show = function(req, res) {
    const { id } = req.params

    const foundStudents = data.students.find((student) => { return student.id == id })

    if (!foundStudents)
        return res.send('Professor não encontrado!')

    const student = {
        ...foundStudents,
        age: age(foundStudents.birth),
        schooling: graduation(foundStudents.schooling),
    }

    return res.render('./students/show', { student })
}

exports.create = function(req, res) {

    return res.render('students/create')

}

exports.post = function(req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "")
            return res.send("Por favor, preencha todos os campos")
    }

    let { avatar_url, name, birth, schooling, classes, services } = req.body

    birth = Date.parse(req.body.birth)
    const created_at = Date.now()
    const id = Number(data.students.length + 1)

    data.students.push({
        id,
        created_at,
        avatar_url,
        name,
        birth,
        schooling,
        classes

    })
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {

            if (err)
                return res.send("Erro ao escrever arquivo")

            return res.redirect("/students")

        })
        // return res.send(req.body)
}

exports.edit = function(req, res) {
    const { id } = req.params

    const foundStudents = data.students.find((student) => { return student.id == id })

    if (!foundStudents)
        return res.send('Professor não encontrado!')
    const student = {
        ...foundStudents,
        birth: date(foundStudents.birth)
    }

    return res.render('students/edit', { student })
}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0;
    const foundStudents = data.students.find((student, foundindex) => {
        if (student.id == id) {
            index = foundindex
            return true
        }
    })

    if (!foundStudents)
        return res.send('Professor não encontrado!')

    const student = {
        ...foundStudents,
        ...req.body,
        birth: birth = Date.parse(req.body.birth),
        id: Number(req.body.id)
    }
    data.students[index] = student
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err)
            return res.send("Write error!")

        return res.redirect(`/students/${id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredStudents = data.students.filter((student) => {
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err)
            return res.send("Write error!")

        return res.redirect(`/students`)
    })
}