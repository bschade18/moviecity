const express = require('express');
const router = express.Router();
const { getUsers, updateUser } = require('../controllers/user');

router.route('/').get(getUsers);

router.route('/:id').put(updateUser);

module.exports = router;
