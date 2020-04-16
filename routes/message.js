const express = require('express');
const router = express.Router();

const { getMessage, createMessage } = require('../controllers/message');

router.route('/').get(getMessage).post(createMessage);

module.exports = router;
