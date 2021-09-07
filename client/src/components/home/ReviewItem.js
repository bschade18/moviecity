import '../../styles/ReviewItem.css';
import React from 'react';
import MovieThumb from '../elements/MovieThumb';
import NoImage from '../../img/no_image.jpg';
import ReviewItemRating from './ReviewItemRating';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ReviewItem = ({
  review: { rating, imageUrl, movieId, movieTitle, text, _id, comments, user },
  page,
}) => (
  <div className="review-item">
    <Link className="overlay" to={`/review/${_id}`}></Link>
    <Link className="review-item-user-link mb-2" to={`/${user.username}`}>
      <img src={`/uploads/${user.photo}`} className="user-avatar" alt="user" />
      <h6 className="ml-2 review-item-username">{user.username}</h6>
    </Link>
    <div className="review-item-content">
      <div className="review-item-thumb">
        <MovieThumb
          image={imageUrl ? imageUrl : NoImage}
          clickable={true}
          id={movieId}
        />
      </div>
      <h5>{movieTitle}</h5>
      <ReviewItemRating rating={rating} />
      <p>{text}</p>
    </div>
    {page && (
      <div className="review-item-link-container">
        <i className="far fa-comment-alt"></i>{' '}
        <span>{comments.length > 0 && comments.length}</span>
      </div>
    )}
  </div>
);

ReviewItem.propTypes = {
  review: PropTypes.object.isRequired,
};

export default ReviewItem;
