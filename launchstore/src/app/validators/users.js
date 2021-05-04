const User = require('../models/user')

async function post(req, res, next) {
    const keys = Object.keys(req.body)
    for (let key of keys) {
        if (req.body[key] == '') {
            return res.render("users/register.njk", {
                user: req.body,
                error: 'Preencha todos os campos'
            })
        }
    }
    const { email, cpf_cnpj, password, passwordRepeat } = req.body

    const user = await User.findOne({
        where: { email },
        or: { cpf_cnpj }
    })

    if (user)
        return res.render("users/register.njk", {
            user: req.body,
            error: 'Usuário já cadastrado.'
        })

    if (password !== passwordRepeat)
        return res.render("users/register.njk", {
            user: req.body,
            error: 'As senhas não são identicas.'
        })

    next()
}

module.exports = { post }