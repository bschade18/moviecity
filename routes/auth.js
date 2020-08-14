const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  register,
  login,
  getUser,
  addFavorite,
  setWatchlist,
  userPhotoUpload,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth');
const { validateRegister, validateLogin } = require('../validate');

router.route('/register').post(validateRegister, register);

router.route('/login').post(validateLogin, login);

router.route('/user').get(auth, getUser);

router.route('/favorite/:id').put(auth, addFavorite);

router.route('/watchlist/:id').put(auth, setWatchlist);

router.route('/photo').put(auth, userPhotoUpload);

router.route('/forgotpassword').post(forgotPassword);

router.route('/resetpassword/:resettoken').put(resetPassword);

module.exports = router;
