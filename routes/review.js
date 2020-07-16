const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getReviews,
  getReview,
  postReviews,
  addComment,
} = require('../controllers/review');

router.route('/').get(auth, getReviews).post(auth, postReviews);

router.route('/:id').get(auth, getReview);

router.route('/comment/:id').post(auth, addComment);

module.exports = router;
