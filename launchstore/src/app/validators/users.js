const User = require('../models/user')

async function post(req, res, next) {
    const keys = Object.keys(req.body)
    for (let key of keys) {
        if (req.body[key] == '') {
            return res.send('Please, fill all fields!')
        }
    }
    const { email, cpf_cnpj, password, passwordRepeat } = req.body

    const user = await User.findOne({
        where: { email },
        or: { cpf_cnpj }
    })

    if (user)
        return res.send("Users exists")

    if (password !== passwordRepeat)
        return res.send("As senhas não são iguais")

    next()
}

module.exports = { post }