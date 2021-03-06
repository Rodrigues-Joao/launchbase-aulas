const fs = require('fs')
const data = require('../data.json')
const { age, date, graduation } = require('../utils')

exports.index = function(req, res) {
    let teachers = new Array();
    for (let i = 0; i < data.teachers.length; i++) {

        teachers.push({
            ...data.teachers[i],
            services: data.teachers[i].services.split(',')
        })
    }


    return res.render('teachers/index', { teachers })
}

exports.show = function(req, res) {
    const { id } = req.params

    const foundTeachers = data.teachers.find((teacher) => { return teacher.id == id })

    if (!foundTeachers)
        return res.send('Professor não encontrado!')

    const teacher = {
        ...foundTeachers,
        age: age(foundTeachers.birth),
        schooling: graduation(foundTeachers.schooling),
        services: foundTeachers.services.split(','),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeachers.created_at)
    }

    return res.render('./teachers/show', { teacher })
}

exports.create = function(req, res) {

    return res.render('teachers/create')

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


    let id = 1
    const lastTeacher = data.teachers[data.teachers.length - 1]

    if (lastTeacher) {
        id = lastTeacher.id + 1
    }

    data.teachers.push({
        id,
        created_at,
        avatar_url,
        name,
        birth,
        schooling,
        classes,
        services

    })
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {

            if (err)
                return res.send("Erro ao escrever arquivo")

            return res.redirect("/teachers")

        })
        // return res.send(req.body)
}

exports.edit = function(req, res) {
    const { id } = req.params

    const foundTeachers = data.teachers.find((teacher) => { return teacher.id == id })

    if (!foundTeachers)
        return res.send('Professor não encontrado!')
    const teacher = {
        ...foundTeachers,
        birth: date(foundTeachers.birth).iso
    }

    return res.render('teachers/edit', { teacher })
}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0;
    const foundTeachers = data.teachers.find((teacher, foundindex) => {
        if (teacher.id == id) {
            index = foundindex
            return true
        }
    })

    if (!foundTeachers)
        return res.send('Professor não encontrado!')

    const teacher = {
        ...foundTeachers,
        ...req.body,
        birth: birth = Date.parse(req.body.birth),
        id: Number(req.body.id)
    }
    data.teachers[index] = teacher
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err)
            return res.send("Write error!")

        return res.redirect(`/teachers/${id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredTeachers = data.teachers.filter((teacher) => {
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err)
            return res.send("Write error!")

        return res.redirect(`/teachers`)
    })
}