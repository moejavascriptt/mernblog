const asyncHandler = require('express-async-handler')
const Category = require('../../model/Category/Category')

exports.createCategory = asyncHandler(async (req, res) => {
  const { name, author } = req.body
  // if exist
  const categoryFound = await Category.findOne({ name })
  if (categoryFound) {
    throw new Error('Category already exists')
  }

  const category = await Category.create({
    name: name,
    author: req.userAuth?._id
  })
  res.status(201).json({
    status: 'success',
    message: 'Category successfully created',
    category
  })
})

//@desc get all categories
//@route get /api/v1/categories
//@access public

exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({})

  res.status(201).json({
    status: 'success',
    message: 'Categories successfully fetched',
    categories
  })
})

//@desc delete categories
//@route delete /api/v1/categories/:id
//@access private

exports.deleteCategory = asyncHandler(async (req, res) => {
  await Category.findByIdAndDelete(req.params.id)

  res.status(201).json({
    status: 'success',
    message: 'Categories successfully deleted'
  })
})

//@desc update category
//@route put /api/v1/categories/:id
//@access private

exports.updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name
    },
    {
      new: true,
      runValidators: true
    }
  )

  res.status(201).json({
    status: 'success',
    message: 'Categories successfully updated'
  })
})
