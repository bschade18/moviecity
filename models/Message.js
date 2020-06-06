const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
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
  message: {
    type: [{ name: String, message: String }],
    required: true,
  },
  messageDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Message = mongoose.model('message', MessageSchema);
