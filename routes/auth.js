const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  register,
  login,
  getUser,
  forgotPassword,
  resetPassword,
  findUser,
} = require('../controllers/auth');
const {
  validateRegister,
  validateLogin,
  validateNewPassword,
} = require('../validate');

router.route('/register').post(validateRegister, register);

router.route('/login').post(validateLogin, login);

router.route('/user').get(auth, getUser);

router.route('/forgotpassword').post(forgotPassword);

router
  .route('/resetpassword/:resettoken')
  .put(validateNewPassword, resetPassword);

router.route('/find').post(findUser);

module.exports = router;
