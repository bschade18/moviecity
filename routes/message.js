const express = require('express');
const router = express.Router();
const auth = require('../middleware/verifyToken');
const {
  getMessage,
  createMessage,
  deleteMessage,
  updateMessage,
} = require('../controllers/message');

router.route('/').get(auth, getMessage).post(auth, createMessage);
router.route('/:id').delete(auth, deleteMessage).put(auth, updateMessage);

module.exports = router;
