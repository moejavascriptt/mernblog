const mongoose = require('mongoose')
// connect to db

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://moe:moe@cluster0.smxl9ls.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    )
    console.log('DB has been connected...')
  } catch (error) {
    console.log('DB Connection failed', error.message)
  }
}

module.exports = connectDB
