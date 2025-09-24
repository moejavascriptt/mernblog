// @desc Register a new user
//@route POST /api/v1/users/register
//@access public

const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../../model/User/User')
const generateToken = require('../../utils/generateToken')

exports.register = asyncHandler(async (req, res) => {
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
})

// @desc login user
//@route POST /api/v1/users/login
//@access public

exports.login = asyncHandler(async (req, res) => {
  // get the login details
  const { username, password } = req.body
  // if user exists
  const user = await User.findOne({ username })
  if (!user) {
    throw new Error('Invalid login credentials')
  }
  // compare the hashed password with the one the request
  const isMatched = await bcrypt.compare(password, user?.password)
  if (!isMatched) {
    throw new Error('Invalid login credentials')
  }

  //update the last login
  user.lastLogin = new Date()
  res.json({
    status: 'success',
    email: user?.email,
    _id: user?._id,
    username: user?.username,
    role: user?.role,
    token: generateToken(user)
  })
})

// @desc get profile
//@route POST /api/v1/users/profile/:id
//@access private

exports.getProfile = asyncHandler(async (req, res, next) => {
  // trigger custom
  const myErr = new Error('my custom error')
  return next(myErr)
  // get user id from params

  const id = req.userAuth._id
  const user = await User.findById(id)
  console.log(user)

  res.json({
    status: 'success',
    message: 'Profile fetched',
    user
  })
})

//@desc block user
//@route POST /api/v1/users/block/:userIdToBloc
//@access private

exports.blockUser = asyncHandler(async (req, res) => {
  // find the user to be blocked
  const userIdToBlock = req.params.userIdToBlock
  const userToBlock = await User.findById(userIdToBlock)
  if (!userToBlock) {
    throw new Error('User to block not folund')
  }

  // ! user who is blocking
  const userBlocking = req.userAuth._id

  // check if user is blocking him/herself

  if (userIdToBlock.toString() === userBlocking.toString()) {
    throw new Error('Cannot block yourself')
  }

  // find the current user
  const currentUser = await User.findById(userBlocking)

  //? Check if user already blocked
  if (currentUser?.blockedUsers?.includes(userIdToBlock)) {
    throw new Error('User already blocked')
  }
  // push the user to be blocked in the array of the current user
  currentUser?.blockedUsers.push(userIdToBlock)
  await currentUser.save()
  res.json({
    message: 'User blocked successfully',
    status: 'success'
  })
})

//@desc unblock user
//@route PUT /api/v1/users/unblock/:userIdToUnblock
//@access private

exports.unblockUser = asyncHandler(async (req, res) => {
  // find the user to be unblocked
  const userIdToUnBlock = req.params.userIdToUnBlock
  const userToUnBlock = await User.findById(userIdToUnBlock)
  if (!userToUnBlock) {
    throw new Error('User to be unblocked is not found')
  }
  //find the current user
  const userUnBlocking = req.userAuth._id
  const currentUser = await User.findById(userUnBlocking)

  //? Check if user is not blocked before unblocking
  if (!currentUser.blockedUsers.includes(userIdToUnBlock)) {
    throw new Error('User is not blocked')
  }
  //remove the user from the current user blocked users array
  currentUser.blockedUsers = currentUser.blockedUsers.filter(
    id => id.toString() !== userIdToUnBlock.toString()
  )
  // resave the current user
  await currentUser.save()
  res.json({
    status: 'success',
    message: 'User unblocked successfully'
  })
})

//@desc who view my profile
//@route POST /api/v1/users/profile-viewer/:userProfileId
//@access private

exports.profileViewers = asyncHandler(async (req, res) => {
  // find that we want to view profile

  const userProfileId = req.params.userProfileId

  const userProfile = await User.findById(userProfileId)
  if (!userProfile) {
    throw new Error('User to view his profile not found')
  }

  // find the current user
  const currentUserId = req.userAuth._id
  //? Check if user already viewed the profile
  if (userProfile?.profileViewers?.includes(currentUserId)) {
    throw new Error('You have already viewed this profile')
  }
  // push the user current user id into the user profile
  userProfile.profileViewers.push(currentUserId)
  await userProfile.save()
  res.json({
    message: 'You have successfully viewed the profile',
    status: 'success'
  })
})

//@desc following user
//@route PUT /api/v1/useres/following/:userIdToFollow
//@access private

exports.followingUser = asyncHandler(async (req, res) => {
  // find the current user
  const currentUserId = req.userAuth._id
  //! find the user to follow
  const userToFollowId = req.params.userToFollowId
  // avoid user following himself
  if (currentUserId.toString() === userToFollowId.toString()) {
    throw new Error('You cannot follow yourself')
  }

  //push the user to followID into the current user following field
  await User.findByIdAndUpdate(currentUserId, {
    $addToSet: { following: userToFollowId }
  })
  //push the currentUserId into the user to follow followers field
  await User.findByIdAndUpdate(currentUserId, {
    $addToSet: { following: currentUserId }
  })

  // send the response
  res.json({
    status: 'success',
    message: 'You followed the user successfully'
  })
})
