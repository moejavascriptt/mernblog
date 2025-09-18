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
// ERROR MIDDLEWARE
// status
app.use((err, req, res, next) => {
  const status = err?.status ? err?.status : 'failed'
  // message
  const message = err?.message
  // stack
  const stack = err?.stack
  res.status(500).json({
    status,
    message,
    stack
  })
})

const server = http.createServer(app)
// ? start the server

const PORT = process.env.PORT || 9080
server.listen(PORT, console.log(`Server is running on port ${PORT}`))
