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
        const { userId: id } = req.session
        const user = await User.findOne({ where: { id } })

        if (!user) {
            return res.render('users/register', {
                error: "Usuário não encontrado"
            })
        }
        return res.render('users/index.njk', { user })
    }

    update(req, res) {

    }
    delete(req, res) {}

}
module.exports = new UserController()