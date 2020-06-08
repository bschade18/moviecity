let Review = require('../models/Review');
const ErrorResponse = require('../utils/errorResponse');

// @route GET /reviews
// @desc get reviews
// @access Public
exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().sort({ reviewDate: -1 });
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    next(new ErrorResponse('Reviews not found', 404));
  }
};

// @route POST /reviews
// @desc create a review
// @access Public

exports.postReviews = async (req, res, next) => {
  try {
    const review = await Review.create(req.body);

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
    });
  }
};
