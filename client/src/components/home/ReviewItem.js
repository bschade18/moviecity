import '../../styles/ReviewItem.css';
import React from 'react';
import ReviewItemUser from './ReviewItemUser';
import ReviewItemContent from './ReviewItemContent';
import ReviewItemComments from './ReviewItemComments';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ReviewItem = ({
  review: { rating, imageUrl, movieId, movieTitle, text, _id, comments, user },
  page,
}) => (
  <div className="review-item">
    <Link className="overlay" to={`/review/${_id}`}></Link>
    <ReviewItemUser user={user} />
    <ReviewItemContent
      movieId={movieId}
      imageUrl={imageUrl}
      movieTitle={movieTitle}
      text={text}
      rating={rating}
    />
    {page && <ReviewItemComments comments={comments} />}
  </div>
);

ReviewItem.propTypes = {
  review: PropTypes.object.isRequired,
};

export default ReviewItem;
