let User = require('../models/User');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

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

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

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
    let user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (err) {
    res.status(401).send('Server Error');
  }
};

// @route    PUT /auth/favorite/:id
// @desc     update user favorites
// @access   Private
exports.addFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    user.favorites = req.body.favorites;

    const updatedUser = await user.save();

    res.json(updatedUser.favorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route    PUT /auth/watchlist/:id
// @desc     update user watchlist
// @access   Private
exports.setWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    user.watchList = req.body.watchList;

    const updatedUser = await user.save();

    res.json(updatedUser.watchList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc      Upload photo for user
// @route     PUT /auth/photo
// @access    Private
exports.userPhotoUpload = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.user.id);
  // could probably use req.user.id?

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${user._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    user = await User.findByIdAndUpdate(req.user.id, {
      photo: file.name,
    }).select('photo');

    res.status(200).json({ filename: file.name, user });
  });
});
