const User = require('../models/user')

class UserController {
    registerForm(req, res) {
        return res.render('users/register.njk')
    }
    async post(req, res) {

        const userId = await User.create(req.body)

        req.session.userId = userId

        return res.redirect('/users')
    }
    async show(req, res) {
        const { user } = req
        return res.render('users/index.njk', { user })
    }

    async update(req, res) {
        try {
            let { id, name, email, cpf_cnpj, cep, address } = req.body
            await User.update(id, {
                name,
                email,
                cpf_cnpj,
                cep,
                address
            })
            return res.render('users/index.njk', {
                user: req.body,
                success: 'Cadastro atualizado com sucesso!'
            })
        } catch (err) {
            console.error(err)

            return res.render('users/index.njk', {
                user: req.body,

                error: "Erro interno!"
            })
        }
    }
    async delete(req, res) {
        try {
            await User.delete(req.body.id)
            req.session.destroy()
            return res.render('session/login.njk', {
                success: "Conta deletada com sucesso"
            })
        } catch (error) {
            console.error(error)
            return res.render('users/index.njk', {
                error: "Erro ao deletar sua conta!"
            })
        }
    }

}
module.exports = new UserController()