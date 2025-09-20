const express = require('express')

const { createComment } = require('../../controllers/comments/comments')
const isLoggedIn = require('../../middlewares/isLoggedIn')

const commentRouter = express.Router()

//create
commentRouter.post('/:postId', isLoggedIn, createComment)

module.exports = commentRouter
