let Message = require('../models/Message');

// @route GET /messages
// @desc Get all messages
// @access Public
exports.getMessage = (req, res, next) => {
  Message.find()
    .then((messages) => res.json(messages))
    .catch((err) => res.status(400).json('Error: ' + err));
};

// @route POST /messages
// @desc Create a message
// @access Public
exports.createMessage = (req, res, next) => {
  const sender = req.body.sender;
  const recipient = req.body.recipient;
  const movieTitle = req.body.movieTitle;
  const message = req.body.message;
  const messageDate = req.body.messageDate;
  const imageUrl = req.body.imageUrl;

  const newMessage = new Message({
    sender,
    recipient,
    movieTitle,
    message,
    messageDate,
    imageUrl,
  });

  newMessage
    .save()
    .then(() => res.json('message added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
};

// @route DELETE /users:id
// @desc Delete user
// @access Public

exports.deleteMessage = (req, res, next) => {
  Message.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json('message deleted'))
    .catch((err) => res.status(404).json('Error: ' + err));
};
