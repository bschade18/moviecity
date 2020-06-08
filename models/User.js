const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  friends: [String],
  favorites: [{ title: String, imgUrl: String, movieId: String }],
  watchList: [{ title: String, imgUrl: String, movieId: String }],
});

module.exports = User = mongoose.model('user', UserSchema);
