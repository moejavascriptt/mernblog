const express = require('express')
const isLoggedIn = require('../../middlewares/isLoggedin')
const {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory
} = require('../../controllers/categories/category')

const categoryRouter = express.Router()

//create

categoryRouter.post('/', isLoggedIn, createCategory)
//get all

categoryRouter.get('/', getCategories)

/// delete
categoryRouter.delete('/:id', isLoggedIn, deleteCategory)

// update
categoryRouter.put('/:id', isLoggedIn, updateCategory)

module.exports = categoryRouter
