const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getUsers, updateUser, getUser } = require('../controllers/user');

router.route('/').get(auth, getUsers);

router.route('/:id').get(auth, getUser).put(auth, updateUser);

module.exports = router;
