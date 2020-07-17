const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getUsers, updateUser } = require('../controllers/user');

router.route('/').get(auth, getUsers);

router.route('/:id').put(auth, updateUser);

module.exports = router;
