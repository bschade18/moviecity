const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');
const ErrorResponse = require('../utils/errorResponse');
const crypto = require('crypto');

// @route POST auth/register
// @desc register user
// @access Public
exports.register = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    user = new User({
      name,
      username,
      email,
      password,
    });

    await user.save();

    const secret = process.env.SECRET;

    jwt.sign({ id: user._id }, secret, { expiresIn: 14400 }, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
        },
      });
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// @route POST auth/login
// @desc login user
// @access Public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const secret = process.env.SECRET;

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    jwt.sign({ id: user._id }, secret, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          username: user.username,
        },
      });
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// @route GET auth/user
// @desc get user data
// @access Private
exports.getUser = async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select('-password').populate({
      path: 'friends',
    });

    res.json(user);
  } catch (err) {
    res.status(401).send('Server Error');
  }
};

// @desc      Forgot password
// @route     POST /auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const message = `Click the link below to reset your password - if you did not request a password reset, please ignore: \n\n ${req.protocol}://rocky-shore-27082.herokuapp.com/account/reset_password/${resetToken}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'MovieCity password reset request',
      message,
    });

    res.status(200).send('Email sent');
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

// @desc      Reset password
// @route     PUT /auth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.send('password reset');
});

// @route POST auth/find
// @desc find user
// @access Public
exports.findUser = async (req, res) => {
  const { account } = req.body;

  try {
    let user = await User.findOne({ email: account });

    if (!user) {
      user = await User.findOne({ username: account });
    }

    if (!user) {
      return res.status(400).json({ msg: 'No user found' });
    }

    res.send(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
