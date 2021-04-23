class UserController {
    registerForm(req, res) {
        return res.render('users/register.njk')
    }
    post(req, res) {

    }
    show(req, res) {

    }

    update(req, res) {

    }
    delete(req, res) {}

}
module.exports = new UserController()