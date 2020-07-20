import React from 'react';
import MovieThumb from '../elements/MovieThumb';
import NoImage from '../../img/no_image.jpg';
import { Link } from 'react-router-dom';

const Reviews = ({
  review: { rating, name, imageUrl, movieId, movieTitle, text, _id, comments },
}) => {
  const renderStar = (number) => {
    return (
      <span
        className={rating >= number ? 'fa fa-star checked' : 'd-none'}
      ></span>
    );
  };

  return (
    <div id="mainmovies-list">
      <Link className="user-link" to={`/${name}`}>
        <h6>{name}</h6>
      </Link>
      <div className="movie-box">
        <div className="mymovies-thumb">
          <MovieThumb
            image={imageUrl ? imageUrl : NoImage}
            clickable="true"
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
      <Link className="review-link" to={`/review/${_id}`}>
        <i className="far fa-comment-alt"></i>{' '}
        <span className="comments-length">
          {comments.length ? comments.length : null}
        </span>
      </Link>
    </div>
  );
};

export default Reviews;
