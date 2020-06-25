const express = require('express');
const router = express.Router();
const auth = require('../middleware/verifyToken');
const { getReviews, postReviews } = require('../controllers/review');

router.route('/').get(auth, getReviews).post(auth, postReviews);

module.exports = router;
