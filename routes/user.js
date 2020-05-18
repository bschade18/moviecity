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

router.route('/:id/photo').put(userPhotoUpload);

module.exports = router;
