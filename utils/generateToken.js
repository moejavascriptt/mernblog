const jwt = require('jsonwebtoken')

const generateToken = user => {
  // create payload for user
  const payload = {
    user: {
      id: user.id
    }
  }
  //sign the token with secret key
  const token = jwt.sign(payload, 'anykey', {
    expiresIn: 36000 //expires in 1hr
  })
  return token
}

module.exports = generateToken
