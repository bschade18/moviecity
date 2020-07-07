const express = require('express');
const router = express.Router();
const auth = require('../middleware/verifyToken');
const { register, login, getUser } = require('../controllers/auth');
const { validateUser } = require('../validate');

router.route('/register').post(validateUser, register);

router.route('/login').post(login);

router.route('/user').get(auth, getUser);

module.exports = router;
