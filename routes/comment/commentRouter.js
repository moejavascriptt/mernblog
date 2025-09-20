const express = require('express')

const {
  createComment,
  deleteComment,
  updateComment
} = require('../../controllers/comments/comments')
const isLoggedIn = require('../../middlewares/isLoggedIn')

const commentRouter = express.Router()

//create
commentRouter.post('/:postId', isLoggedIn, createComment)

//update
commentRouter.put('/:id', isLoggedIn, updateComment)

commentRouter.delete('/:id', isLoggedIn, deleteComment)

module.exports = commentRouter
