const mongoose = require('mongoose')
const crypto = require('crypto')

// schema

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user'
    },
    password: {
      type: String,
      required: true
    },

    lastLogin: {
      type: Date,
      default: Date.now()
    },
    isVerified: {
      type: String,
      default: false
    },
    accountLevel: {
      type: String,
      enum: ['bronze', 'silver', 'gold'],
      default: 'bronze'
    },
    profilePicture: {
      type: String,
      default: ''
    },

    coverImage: {
      type: String,
      default: ''
    },
    bio: {
      type: String
    },
    location: {
      type: String
    },

    notificationPreferences: {
      email: { type: String, default: true }
      //..other notifications (sms)
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'prefer not to say', 'non-binary']
    },

    profileViewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    passwordResetToken: {
      type: String
    },
    passwordResetExpires: {
      type: Date
    },
    accountVertificationToken: {
      type: String
    },
    accountVertificationExpires: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

//! generate password reset token
userSchema.methods.generatePasswordResetToken = function () {
  //generate token
  const resetToken = crypto.randomBytes(20).toString('hex')
  // assign the token to passwordResetToken field
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  //update the passwordResetExpires and when to expire
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000 //! 10 minutes to expire
  return resetToken
}

// compile schema to model

const User = mongoose.model('User', userSchema)

module.exports = User
