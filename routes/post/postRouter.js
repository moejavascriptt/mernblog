const express = require('express')
const isLoggedIn = require('../../middlewares/isLoggedin')
const { createPost } = require('../../controllers/posts/posts')

const postsRouter = express.Router()

// create
postsRouter.post('/', isLoggedIn, createPost)

module.exports = postsRouter
