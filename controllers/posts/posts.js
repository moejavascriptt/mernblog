const asyncHandler = require('express-async-handler')
const Post = require('../../model/Post/Post')
const User = require('../../model/User/User')
const Category = require('../../model/Category/Category')
//@desc create a post
//@route POST /api/v1/posts
//@access Private

exports.createPost = asyncHandler(async (req, res) => {
  // get the payload
  const { title, content, categoryId } = req.body
  //check if post exists
  const postFound = await Post.findOne({ title })
  if (postFound) {
    throw new Error('Post already exists')
  }
  // create post
  const post = await Post.create({
    title,
    content,
    category: categoryId,
    author: req?.userAuth?._id
  })

  // associate post to user
  await User.findByIdAndUpdate(
    req?.userAuth?._id,
    {
      $push: { posts: post._id }
    },
    {
      new: true
    }
  )
  // Push post into category
  await Category.findByIdAndUpdate(
    req?.userAuth?._id,
    {
      $push: { posts: post._id }
    },
    {
      new: true
    }
  )

  // send the response
  res.json({
    status: 'success',
    message: 'Post Successfuly created',
    post
  })
})

//@ desc get all posts
//@route GET /api/v1/posts
//@access PUBLIC

exports.getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
  res.status(201).json({
    status: 'success',
    message: 'Posts successfully fetched',
    posts
  })
})

//@desc get single posts
//@route GET /api/v1/posts/:id
//@access PUBLIC

exports.getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  res.status(201).json({
    status: 'success',
    message: 'Post successfully fetched',
    post
  })
})

//@delete post
//@route delete /api/v1/posts/:id
//@access private

exports.deletePost = asyncHandler(async (req, res) => {
  await Post.findByIdAndDelete(req.params.id)
  res.status(201).json({
    status: 'success',
    message: 'Post successfully deleted'
  })
})

//@desc update post
//@route put /api/v1/posts/:id
//@access private

exports.updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  res.status(201).json({
    status: 'success',
    message: 'post successfully updated',
    post
  })
})
