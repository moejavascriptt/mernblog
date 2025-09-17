const express = require('express')
const { register, login } = require('../../controllers/users/usersCtlr')

const usersRouter = express.Router()

//!register
usersRouter.post('/api/v1/users/register', register)

// login
usersRouter.post('/api/v1/users/login', login)

// * export
module.exports = usersRouter
