const { age, date, graduation } = require('../../lib/utils')

module.exports = {
    index(req, res) {

    },
    show(req, res) {

        return res.render('./teachers/show')
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

        let { avatar_url, name, birth, school_year, workload } = req.body

    },
    edit(req, res) {

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