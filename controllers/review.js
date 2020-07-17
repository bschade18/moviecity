let Review = require('../models/Review');
let User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @route GET /reviews
// @desc get reviews
// @access Private
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

// @route GET /reviews/:id
// @desc get review
// @access Private
exports.getReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ msg: 'Review not found' });
    }

    res.status(200).json({
      data: review,
    });
  } catch (error) {
    next(new ErrorResponse('Reviews not found', 404));
  }
};

// @route POST /reviews
// @desc create a review
// @access Private

exports.postReviews = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    const newReview = new Review({
      text: req.body.text,
      name: user.name,
      user: req.user.id,
      movieTitle: req.body.movieTitle,
      imageUrl: req.body.imageUrl,
      movieId: req.body.movieId,
      review: req.body.review,
    });

    const review = await newReview.save();

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      msg: 'Server Error',
    });
  }
};

// @route    POST /reviews/comment/:id
// @desc     Comment on a review
// @access   Private
exports.addComment = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const review = await Review.findById(req.params.id);

    const newComment = {
      text: req.body.text,
      name: user.name,
      user: req.user.id,
    };

    review.comments.push(newComment);

    await review.save();

    res.json(review.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
