const { age, date, graduation } = require('../../lib/utils')

module.exports = {
    index(req, res) {

    },
    show(req, res) {

        return res.render('./students/show')
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


    },
    edit(req, res) {

    },
    put(req, res) {
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == "")
                return res.send("Por favor, preencha todos os campos")
        }

    },
    delete(req, res) {

    }
}