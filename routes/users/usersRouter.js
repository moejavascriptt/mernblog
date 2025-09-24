const express = require('express')
const {
  register,
  login,
  getProfile,
  blockUser,
  unblockUser,
  profileViewers,
  followingUser
} = require('../../controllers/users/usersCtlr')
const isLoggedIn = require('../../middlewares/isLoggedIn')

const usersRouter = express.Router()

//!register
usersRouter.post('/register', register)

// login
usersRouter.post('/login', login)

//profile
usersRouter.get('/profile', isLoggedIn, getProfile)
// block user
usersRouter.put('/block/:userIdToBlock', isLoggedIn, blockUser)
// unblock user
usersRouter.put('/unblock/:userIdToUnBlock', isLoggedIn, unblockUser)

usersRouter.get('/profileviewer/:userProfileId', isLoggedIn, profileViewers)

usersRouter.put('/following/:usertoFollowId', isLoggedIn, followingUser)

// * export
module.exports = usersRouter
