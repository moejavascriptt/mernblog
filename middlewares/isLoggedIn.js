const isLoggedIn = (req, res, next) => {
  console.log(req.headers)
  //get token from header
  const token = req.headers.authorization?.split(' ')[1]
  console.log(token)
  // verify the token
  // save the user
  // send the user
  next()
}

module.exports = isLoggedIn
