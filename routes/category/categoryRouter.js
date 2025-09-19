const express = require('express')
const isLoggedIn = require('../../middlewares/isLoggedin')
const { createCategory, getCategories } = require('../../controllers/categories/category')

const categoryRouter = express.Router()

//create

categoryRouter.post('/', isLoggedIn, createCategory)
//all

categoryRouter.get('/', getCategories)
module.exports = categoryRouter
