const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  movieTitle: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
  review: {
    type: Number,
    required: true,
  },
  reviewDate: {
    type: Date,
    default: Date.now,
  },
  movieId: {
    type: String,
    required: true,
  },
});

module.exports = Review = mongoose.model('review', ReviewSchema);
