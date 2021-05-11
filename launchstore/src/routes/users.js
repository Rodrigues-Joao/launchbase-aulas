const express = require('express')
const routes = express.Router()

const SessionController = require('../app/controllers/session-controller')
const UserController = require('../app/controllers/user-controller')
const UserValidator = require('../app/validators/users')
const SessionValidator = require('../app/validators/session')



//login/logout

routes.get('/login', SessionController.loginForm)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', SessionController.logout)

// reset pas/word

routes.get('/orgot-password', SessionController.forgotForm)
routes.get('/assword-reset', SessionController.resetForm)
routes.post('/forgot-password', SessionController.forgot)
routes.post('/password-reset', SessionController.reset)

//user register

routes.get('/register', UserController.registerForm)
routes.post('/register', UserValidator.post, UserController.post)

routes.get('/', UserValidator.show, UserController.show)
routes.put('/', UserValidator.update, UserController.update)
routes.delete('/', UserController.delete)



module.exports = routes