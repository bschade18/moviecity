const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getMessages,
  createMessage,
  deleteMessage,
  updateMessage,
} = require('../controllers/message');

router.route('/').get(auth, getMessages).post(auth, createMessage);

router.route('/:id').put(auth, updateMessage).delete(auth, deleteMessage);

module.exports = router;
