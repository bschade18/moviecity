const router = require('express').Router();
let Review = require('../models/review.model');

// @route GET /review
// @desc get review
// @access Public
router.get('/', (req, res) => {
  //mongoose command
  Review.find()
    .sort({ reviewDate: -1 })
    .then(reviews => res.json(reviews))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route POST review/add
// @desc create a review
// @access Public
router.post('/add', (req, res) => {
  const user = req.body.user;
  const movieTitle = req.body.movieTitle;
  const comments = req.body.comments;
  const reviewDate = req.body.reviewDate;
  const review = req.body.review;
  const imageUrl = req.body.imageUrl;

  // create a new review using the variable we have from above
  const newReview = new Review({
    user,
    movieTitle,
    comments,
    reviewDate,
    review,
    imageUrl
  });

  newReview
    .save()
    .then(() => res.json('Review added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//  /review/:id + get request
router.route('/:id').get((req, res) => {
  Review.findById(req.params.id)
    .then(review => res.json(review))
    .catch(err => res.status(400).json('Error: ' + err));
});

// /review/:id + delete request
router.route('/:id').delete((req, res) => {
  Review.findByIdAndDelete(req.params.id)
    .then(() => res.json('Review deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// /review/update/:id + post request
// currently all fields are required, can update so that you can update a single field without and error
router.route('/update/:id').post((req, res) => {
  Review.findById(req.params.id)
    .then(review => {
      review.user = req.body.user;
      review.movieTitle = req.body.movieTitle;
      review.comments = req.body.comments;
      review.reviewDate = req.body.reviewDate;

      review
        .save()
        .then(() => res.json('Review updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
