const http = require('http')
const express = require('express')
const usersRouter = require('./routes/users/usersRouter')

// !server

const app = express()

// routes 
app.use('/', usersRouter)

const server = http.createServer(app)
// ? start the server

const PORT = process.env.PORT || 9080
server.listen(PORT, console.log(`Server is running on port ${PORT}`))
