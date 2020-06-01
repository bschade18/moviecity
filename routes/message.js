const express = require('express');
const router = express.Router();

const {
  getMessage,
  createMessage,
  deleteMessage,
} = require('../controllers/message');

router.route('/').get(getMessage).post(createMessage);
router.route('/:id').delete(deleteMessage);

module.exports = router;
