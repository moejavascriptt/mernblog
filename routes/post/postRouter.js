const express = require('express')
const isLoggedIn = require('../../middlewares/isLoggedin')
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
} = require('../../controllers/posts/posts')

const postsRouter = express.Router()

// create
postsRouter.post('/', isLoggedIn, createPost)
//getting all
postsRouter.get('/', getPosts)
//single
postsRouter.get('/:id', getPost)
//update
postsRouter.put('/:id', isLoggedIn, updatePost)
// delete
postsRouter.delete('/:id', isLoggedIn, deletePost)

module.exports = postsRouter
