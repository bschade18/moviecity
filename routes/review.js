const express = require('express');
const router = express.Router();
const { getReviews, postReviews } = require('../controllers/review');

router.route('/').get(getReviews).post(postReviews);

module.exports = router;
