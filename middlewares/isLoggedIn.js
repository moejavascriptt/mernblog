const isLoggedIn = (req, res, next) => {
  console.log('is logged in middleware')
  //get token from header
  // verify the token
  // save the user
  // send the user
  next()
}

module.exports = isLoggedIn
