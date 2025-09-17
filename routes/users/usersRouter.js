const express = require('express')
const {
  register,
  login,
  getProfile
} = require('../../controllers/users/usersCtlr')
const isLoggedIn = require('../../middlewares/isLoggedin')



const usersRouter = express.Router()

//!register
usersRouter.post('/register', register)

// login
usersRouter.post('/login', login)

//profile
usersRouter.get('/profile/:id', isLoggedIn, getProfile)

// * export
module.exports = usersRouter
