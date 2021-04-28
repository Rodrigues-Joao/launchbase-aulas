const User = require('../models/user')

class UserController {
    registerForm(req, res) {
        return res.render('users/register.njk')
    }
    async post(req, res) {



        return res.send('passou')
    }
    show(req, res) {

    }

    update(req, res) {

    }
    delete(req, res) {}

}
module.exports = new UserController()