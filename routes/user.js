const express = require('express');
const router = express.Router();
const {
  getUsers,
  deleteUser,
  userPhotoUpload,
  updateUser,
} = require('../controllers/user');

router.route('/').get(getUsers);

router.route('/:id').delete(deleteUser);

router.route('/:id').put(updateUser);

module.exports = router;
