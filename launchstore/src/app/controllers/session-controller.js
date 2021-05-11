module.exports = {
    loginForm(req, res) {
        return res.render('session/login.njk')
    },
    login(req, res) {
        req.session.userId = req.user.id

        return res.redirect('/users/')
    },
    logout(req, res) {
        req.session.destroy()
        return res.redirect('/')
    },
    forgotForm(req, res) {

    },
    resetForm(req, res) {

    },
    forgot(req, res) {

    },
    reset(req, res) {

    }

}