import React from 'react';
import MovieThumb from '../elements/MovieThumb';
import NoImage from '../../img/no_image.jpg';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ReviewItem = ({
  review: {
    rating,
    username,
    imageUrl,
    movieId,
    movieTitle,
    text,
    _id,
    comments,
    user,
  },
  page,
}) => {
  const renderStar = (num) => (
    <span className={rating >= num ? 'fa fa-star checked' : 'd-none'}></span>
  );

  return (
    <div className="ReviewItem">
      <Link className="user-link mb-2" to={`/${user.username}`}>
        <img src={`/uploads/${user.photo}`} className="user-photo" alt="user" />
        <h6 className="ml-2 mainmovies-user-name">{username}</h6>
      </Link>
      <div className="movie-box">
        <div className="mymovies-thumb">
          <MovieThumb
            image={imageUrl ? imageUrl : NoImage}
            clickable={true}
            className="mymovies-image"
            id={movieId}
          />
        </div>
        <div className="mainmovies-text">
          <h5>{movieTitle}</h5>
          <div className="rating">
            {renderStar(1)}
            {renderStar(2)}
            {renderStar(3)}
            {renderStar(4)}
            {renderStar(5)}
          </div>
          <p className="mainmovies-comments">{text}</p>
        </div>
      </div>
      {page && (
        <Link className="review-link" to={`/review/${_id}`}>
          <i className="far fa-comment-alt"></i>{' '}
          <span className="comments-length">
            {comments.length ? comments.length : null}
          </span>
        </Link>
      )}
    </div>
  );
};

ReviewItem.propTypes = {
  review: PropTypes.object.isRequired,
};

export default ReviewItem;
