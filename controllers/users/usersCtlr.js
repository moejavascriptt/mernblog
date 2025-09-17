// @desc Register a new user
//@route POST /api/v1/users/register
//@access public

const bcrypt = require('bcryptjs')
const User = require('../../model/User/User')

exports.register = async (req, res) => {
  console.log(req.body)
  try {
    // get the details
    const { username, password, email } = req.body
    // check if user exists
    const user = await User.findOne({ username })
    if (user) {
      throw new Error('User already exists')
    }
    // register new user
    const newUser = new User({
      username,
      email,
      password
    })
    // hash password
    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(password, salt)
    // save
    await newUser.save()
    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      //   _id: newUser?._id,
      //   username: newUser?.username,
      //   email: newUser?.email,
      //   role: newUser?.role
      newUser
    })
  } catch (error) {
    res.json({
      status: 'failed',
      message: error?.message
    })
  }
}
