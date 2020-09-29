const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getReviews,
  getReview,
  addReview,
  addComment,
} = require('../controllers/review');

router.route('/').get(auth, getReviews).post(auth, addReview);

router.route('/:id').get(auth, getReview).put(auth, addComment);

module.exports = router;
