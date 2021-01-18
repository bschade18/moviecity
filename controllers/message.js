const Message = require('../models/Message');
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
// @desc Create message
// @access Private

exports.createMessage = asyncHandler(async (req, res, next) => {
  const message = await Message.create(req.body);

  res.status(201).json(message);
});

// @route    PUT /message/:id
// @desc     Update message
// @access   Private
exports.updateMessage = asyncHandler(async (req, res, next) => {
  let message = await Message.findById(req.params.id);

  if (!message) {
    return next(
      new ErrorResponse(`Message not found with id of ${req.params.id}`, 404)
    );
  }

  message = await Message.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('sender recipient');

  res.status(200).json(message);
});

// @route DELETE /messages/:id
// @desc Delete message
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
