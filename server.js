const http = require('http')
const express = require('express')
const usersRouter = require('./routes/users/usersRouter')
const connectDB = require('./config/database')
const { notFound, globalErrHandler } = require('./middlewares/globalErrorHandler')

// !server

const app = express()
//db connect
connectDB()

//middlewares
app.use(express.json()) //pass incoming data
// routes
app.use('/api/v1/users', usersRouter)
// not found middleware
app.use(notFound)

// ERROR MIDDLEWARE
// status
app.use(globalErrHandler)

const server = http.createServer(app)
// ? start the server

const PORT = process.env.PORT || 9080
server.listen(PORT, console.log(`Server is running on port ${PORT}`))
