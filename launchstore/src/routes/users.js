const express = require('express')
const routes = express.Router()

const SessionController = require('../app/controllers/session-controller')
const UserController = require('../app/controllers/user-controller')
const UserValidator = require('../app/validators/users')
const SessionValidator = require('../app/validators/session')

const { isLogged } = require('../app/middlewares/session')



//login/logout

routes.get('/login', isLogged, SessionController.loginForm)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', SessionController.logout)

// reset pas/word

routes.get('/forgot-password', SessionController.forgotForm)
routes.get('/reset-password', SessionController.resetForm)
routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot)
routes.post('/reset-password', SessionValidator.reset, SessionController.reset)

//user register

routes.get('/register', UserController.registerForm)
routes.post('/register', UserValidator.post, UserController.post)

routes.get('/', UserValidator.show, UserController.show)
routes.put('/', UserValidator.update, UserController.update)
routes.delete('/', UserController.delete)



module.exports = routes