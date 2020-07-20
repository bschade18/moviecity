let User = require('../models/User');
let asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @route GET /users
// @desc Get all users
// @access Private
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json(users);
});

// @route PUT /users/:id
// @desc Update user
// @access Private

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).select('-password');

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json(user);
});
