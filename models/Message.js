const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieTitle: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  conversation: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      text: {
        type: String,
        required: true,
      },
      read: {
        type: Boolean,
        default: false,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  messageDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Message = mongoose.model('message', MessageSchema);
