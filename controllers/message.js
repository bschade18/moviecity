let Message = require('../models/Message');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @route GET /messages
// @desc Get all messages
// @access Private
exports.getMessages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find().populate('sender recipient');

  res.status(200).json(messages);
});

// @route POST /messages
// @desc Create a message
// @access Private
exports.createMessage = asyncHandler(async (req, res, next) => {
  req.body.conversation[0].user = req.user.id;
  const message = new Message(req.body);

  message.sender = req.user.id;

  await message.save();

  res.status(201).json(message);
});

// @route    POST /message/:id
// @desc     Add a message to conversation
// @access   Private
exports.addMessage = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');
  const message = await Message.findById(req.params.id);

  const newMessage = {
    text: req.body.text,
    name: user.username,
    user: req.user.id,
  };

  message.conversation.push(newMessage);

  await message.save();

  res.json(message.conversation);
});

// @route    PUT /message/:id
// @desc     Update message
// @access   Private
exports.updateMessage = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id);
  message.conversation = req.body.readChat;

  await message.save();

  res.json(message.conversation);
});

// @route DELETE /messages/:id
// @desc Delete a message
// @access Private

exports.deleteMessage = asyncHandler(async (req, res, next) => {
  const message = await Message.findByIdAndDelete(req.params.id);

  if (!message) {
    return next(
      new ErrorResponse(`Message not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).send('Message Deleted');
});
