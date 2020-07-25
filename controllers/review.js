let Review = require('../models/Review');
let User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @route GET /reviews
// @desc Get all reviews
// @access Private
exports.getReviews = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find()
    .sort({ reviewDate: -1 })
    .populate('user')
    .populate({
      path: 'comments.user',
      select: 'photo',
    });
  res.status(200).json(reviews);
});

// @route GET /reviews/:id
// @desc Get single review
// @access Private
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id)
    .populate('user')
    .populate({
      path: 'comments.user',
      select: 'photo',
    });

  if (!review) {
    return next(
      new ErrorResponse(`Review not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json(review);
});

// @route POST /reviews
// @desc Add a review
// @access Private

exports.addReview = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');

  const { text, movieTitle, imageUrl, movieId, rating } = req.body;

  const newReview = new Review({
    name: user.name,
    user: req.user.id,
    username: user.username,
    text,
    movieTitle,
    imageUrl,
    movieId,
    rating,
  });

  const review = await newReview.save();

  res.status(201).json(review);
});

// @route    POST /reviews/comment/:id
// @desc     Comment on a review
// @access   Private
exports.addComment = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');
  const review = await Review.findById(req.params.id);

  const newComment = {
    text: req.body.text,
    name: user.name,
    username: user.username,
    user: req.user.id,
  };

  review.comments.push(newComment);

  await review.save();

  const newReview = await Review.findById(req.params.id).populate({
    path: 'comments.user',
    select: 'photo',
  });

  res.status(200).json(newReview.comments);
});
