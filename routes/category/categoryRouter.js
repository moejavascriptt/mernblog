const express = require('express')
const isLoggedIn = require('../../middlewares/isLoggedin')
const { createCategory } = require('../../controllers/categories/category')

const categoryRouter = express.Router()

//create

categoryRouter.post('/', isLoggedIn, createCategory)
module.exports = categoryRouter
