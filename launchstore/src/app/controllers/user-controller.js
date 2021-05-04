const User = require('../models/user')

class UserController {
    registerForm(req, res) {
        return res.render('users/register.njk')
    }
    async post(req, res) {

        const userId = await User.create(req.body)

        return res.redirect('/users')
    }
    async show(req, res) {
        return res.send("CADASTRADO")
    }

    update(req, res) {

    }
    delete(req, res) {}

}
module.exports = new UserController()