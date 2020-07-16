const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getMessage,
  createMessage,
  deleteMessage,
  updateMessage,
  addMessage,
} = require('../controllers/message');

router.route('/').get(auth, getMessage).post(auth, createMessage);
router
  .route('/:id')
  .delete(auth, deleteMessage)
  .put(auth, updateMessage)
  .post(auth, addMessage);

module.exports = router;
