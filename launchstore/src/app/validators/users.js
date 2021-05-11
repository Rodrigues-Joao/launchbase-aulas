const User = require('../models/user')
const { compare } = require('bcryptjs')
const { use } = require('browser-sync')

function checkAllFields(body) {
    const keys = Object.keys(body)
    for (let key of keys) {
        if (body[key] == '') {
            return {
                user: body,
                error: 'Preencha todos os campos'
            }
        }
    }
}
async function post(req, res, next) {

    const fillAllFields = checkAllFields(req.body)

    if (fillAllFields) {
        return res.render('users/register.njk', fillAllFields)
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
async function show(req, res, next) {
    const { userId: id } = req.session
    const user = await User.findOne({ where: { id } })

    if (!user) {
        return res.render('users/register', {
            error: "Usuário não encontrado"
        })
    }

    req.user = user
    next()
}
async function update(req, res, next) {
    const fillAllFields = checkAllFields(req.body)

    if (fillAllFields) {
        return res.render('users/index.njk', fillAllFields)
    }

    const { id, password } = req.body

    if (!password) {
        return res.render('users/index.njk', {
            user: req.body,
            error: 'Coloque a senha para atualizar seu cadastro.'
        })
    }
    const user = await User.findOne({ where: { id } })

    if (!user) {
        return res.render('users/index.njk', {
            error: "Usuário não encontrado"
        })
    }

    const passed = await compare(password, user.password)

    if (!passed) {
        return res.render('users/index.njk', {
            user: req.body,
            error: 'Senha inválida.'
        })
    }

    req.user = user
    next()
}

module.exports = { post, show, update }