const mongoose = require('mongoose');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  friends: [String],
  favorites: [{ title: String, imgUrl: String, movieId: String }],
  watchList: [{ title: String, imgUrl: String, movieId: String }],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Generate and hash password token
// because this is being call on the user itself, not on the model itself - it's a method - instead of statics
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  // random bytes generates random data, pass in number of bytes
  // this will give us a buffer but we want to format as a string, so do toString('hex')
  // can look at this further in node docs
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field (in model - above)
  // this is all in node crypto documentation
  // this is a method being called on the actual user, so we can access the users fields with "this"
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = User = mongoose.model('user', UserSchema);
