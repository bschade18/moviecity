const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  movieTitle: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  conversation: {
    type: [{ name: String, message: String }],
    required: true,
  },
  messageDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Message = mongoose.model('message', MessageSchema);
