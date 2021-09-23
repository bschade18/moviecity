const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getUsers,
  updateUser,
  getUser,
  userPhotoUpload,
} = require('../controllers/user');

router.route('/').get(auth, getUsers);

router.route('/:id').get(auth, getUser).put(auth, updateUser);

router.route('/:id/photo').put(auth, userPhotoUpload);

module.exports = router;
