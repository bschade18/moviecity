const express = require('express');
const router = express.Router();

const {
  getMessage,
  createMessage,
  deleteMessage,
  updateMessage,
} = require('../controllers/message');

router.route('/').get(getMessage).post(createMessage);
router.route('/:id').delete(deleteMessage).put(updateMessage);

module.exports = router;
