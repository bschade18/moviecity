import React from 'react';
import MovieThumb from '../elements/MovieThumb';
import NoImage from '../../img/no_image.jpg';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ReviewItem = ({
  review: { rating, imageUrl, movieId, movieTitle, text, _id, comments, user },
  page,
}) => {
  const renderStar = (num) => (
    <span className={rating >= num ? 'fa fa-star checked' : 'd-none'}></span>
  );

  return (
    <div className="review-item">
      <Link className="review-item-user-link mb-2" to={`/${user.username}`}>
        <img
          src={`/uploads/${user.photo}`}
          className="user-avatar"
          alt="user"
        />
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
        <div className="rating">
          {renderStar(1)}
          {renderStar(2)}
          {renderStar(3)}
          {renderStar(4)}
          {renderStar(5)}
        </div>
        <p>{text}</p>
      </div>

      {page && (
        <div className="review-item-link-container">
          <Link className="review-item-link" to={`/review/${_id}`}>
            <i className="far fa-comment-alt"></i>{' '}
            <span>{comments.length > 0 && comments.length}</span>
          </Link>
        </div>
      )}
    </div>
  );
};

ReviewItem.propTypes = {
  review: PropTypes.object.isRequired,
};

export default ReviewItem;
