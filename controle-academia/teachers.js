const fs = require('fs')
const data = require('./data.json')

exports.show = function(req, res) {
    const { id } = req.params

    const foundTeachers = data.teachers.find((teacher) => { return teacher.id == id })

    if (!foundTeachers)
        return res.send('Professor não encontrado!')

    function real_schooling(schooling) {

        switch (schooling) {
            case "EMC":
                return "Ensino Médio Completo"
                break
            case "ESC":
                return "Ensino Superior Completo"
                break
            case "MeD":
                return "Mestrado e Doutorado"
                break
        }
    }

    function age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || (month == 0 && today.getDate() < birthDate.getDate()))
            age = age - 1

        return age
    }

    const teacher = {
        ...foundTeachers,
        age: age(foundTeachers.birth),
        schooling: real_schooling(foundTeachers.schooling),
        services: foundTeachers.services.split(','),
        created_at: ""
    }

    return res.render('./teachers/show', { teacher })

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
    const id = Number(data.teachers.length + 1)

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