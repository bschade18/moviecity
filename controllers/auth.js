let User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route POST auth/register
// @desc register user
// @access Public
exports.register = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (user)
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });

    const newUser = new User({
      name,
      email,
      password,
    });

    // create salt & hash
    const secret = process.env.SECRET;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user._id },
            secret,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user._id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
};

// @route POST auth/login
// @desc login user
// @access Public

exports.login = (req, res) => {
  const { email, password } = req.body;

  //check if user in db
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // check pw
    const secret = process.env.SECRET;
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
      // create and assign token
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
    });
  });
};

// @route GET auth/user
// @desc get user data
// @access Private

exports.getUser = (req, res, next) => {
  User.findById(req.user.id)
    .select('-password')
    .then((user) => res.json(user))
    .catch((err) => res.status(401).json('Error: ' + err));
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
