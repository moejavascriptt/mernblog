const http = require('http')
const express = require('express')
const usersRouter = require('./routes/users/usersRouter')
const connectDB = require('./config/database')

// !server

const app = express()
//db connect
connectDB()

//middlewares
app.use(express.json()) //pass incoming data
// routes
app.use('/api/v1/users', usersRouter)

const server = http.createServer(app)
// ? start the server

const PORT = process.env.PORT || 9080
server.listen(PORT, console.log(`Server is running on port ${PORT}`))
