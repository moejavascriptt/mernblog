const express = require('express')
const {
  register,
  login,
  getProfile
} = require('../../controllers/users/usersCtlr')

const usersRouter = express.Router()

//!register
usersRouter.post('/register', register)

// login
usersRouter.post('/login', login)

//profile
usersRouter.get('/profile/:id', getProfile)

// * export
module.exports = usersRouter
