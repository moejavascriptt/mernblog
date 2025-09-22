const express = require('express')
const {
  register,
  login,
  getProfile,
  blockUser
} = require('../../controllers/users/usersCtlr')
const isLoggedIn = require('../../middlewares/isLoggedIn')

const usersRouter = express.Router()

//!register
usersRouter.post('/register', register)

// login
usersRouter.post('/login', login)

//profile
usersRouter.get('/profile/', isLoggedIn, getProfile)
// block user
usersRouter.put('/block/:userIdToBlock', isLoggedIn, blockUser)

// * export
module.exports = usersRouter
