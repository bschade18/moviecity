const Review = require('../models/Review');
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
// @desc Add review
// @access Private
exports.addReview = asyncHandler(async (req, res, next) => {
  const review = await Review.create(req.body);

  res.status(201).json(review);
});

// @route    POST /reviews/:id/comment
// @desc     Add comment to review
// @access   Private
exports.addComment = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`Review not found with id of ${req.params.id}`, 404)
    );
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate({
    path: 'comments.user',
    select: 'photo',
  });

  res.status(200).json(review);
});
