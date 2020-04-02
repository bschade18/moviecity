const router = require('express').Router();
let Message = require('../models/message.model');

// @route GET /review
// @desc get review
// @access Public
router.get('/', (req, res) => {
  //mongoose command
  Message.find()
    .then(messages => res.json(messages))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route POST message/add
// @desc create a review
// @access Public
router.post('/add', (req, res) => {
  const sender = req.body.sender;
  const recipient = req.body.recipient;
  const movieTitle = req.body.movieTitle;
  const message = req.body.message;
  const messageDate = req.body.messageDate;
  const imageUrl = req.body.imageUrl;

  // create a new review using the variable we have from above
  const newMessage = new Message({
    sender,
    recipient,
    movieTitle,
    message,
    messageDate,
    imageUrl
  });

  newMessage
    .save()
    .then(() => res.json('message added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
