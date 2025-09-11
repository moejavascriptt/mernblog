const express = require('express')

const usersRouter = express.Router()


//!register
usersRouter.post('/api/v1/users/register', register)


// * export 
module.exports = usersRouter