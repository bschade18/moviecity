let Review = require('../models/Review');
const ErrorResponse = require('../utils/errorResponse');

// @route GET /reviews
// @desc Get Reviews
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
  // Review.find()
  //   .sort({ reviewDate: -1 })
  //   .then((reviews) => res.json(reviews))
  //   .catch((err) => res.status(400).json('Error: ' + err));
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
    res.status(400).json({
      success: false,
    });
  }

  // const user = req.body.user;
  // const movieTitle = req.body.movieTitle;
  // const comments = req.body.comments;
  // const reviewDate = req.body.reviewDate;
  // const review = req.body.review;
  // const imageUrl = req.body.imageUrl;
  // const movieId = req.body.movieId;

  // const newReview = new Review({
  //   user,
  //   movieTitle,
  //   comments,
  //   reviewDate,
  //   review,
  //   imageUrl,
  //   movieId,
  // });

  // newReview
  //   .save()
  //   .then(() => res.json('Review added!'))
  //   .catch((err) => res.status(400).json('Error: ' + err));
};
