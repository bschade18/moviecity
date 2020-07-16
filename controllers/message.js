let Message = require('../models/Message');

// @route GET /messages
// @desc Get all messages
// @access Public
exports.getMessage = async (req, res) => {
  try {
    const messages = await Message.find();

    res.json(messages);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

// @route POST /messages
// @desc Create a message
// @access Private
exports.createMessage = async (req, res) => {
  try {
    const {
      sender,
      recipient,
      movieTitle,
      conversation,
      messageDate,
      imageUrl,
    } = req.body;

    const newMessage = new Message({
      sender,
      recipient,
      movieTitle,
      conversation,
      messageDate,
      imageUrl,
    });

    newMessage.conversation.user = req.user.id;

    await newMessage.save();
    res.json('message added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
};

// @route DELETE /messages/:id
// @desc Delete message
// @access Public

exports.deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);

    res.status(200).json('message deleted');
  } catch (err) {
    res.status(404).json('Error: ' + err);
  }
};

// @route Update /message/:id
// @desc update message
// @access Private

exports.updateMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json(message);
  } catch (error) {
    res.status(404).json('Error: ' + error);
  }
};

// @route    POST /message/:id
// @desc     Add a message
// @access   Private
exports.addMessage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const message = await Message.findById(req.params.id);

    const newMessage = {
      text: req.body.text,
      name: user.name,
      user: req.user.id,
    };

    message.conversation.push(newMessage);

    await message.save();

    res.json(message.conversation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
