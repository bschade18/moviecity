import React from 'react';
import MovieThumb from '../elements/MovieThumb';
import NoImage from '../../img/no_image.jpg';
import { Link } from 'react-router-dom';

const ReviewItem = ({
  review: { review, name, imageUrl, movieId, movieTitle, text, _id },
}) => {
  const renderStar = (number) => {
    return (
      <span
        className={review >= number ? 'fa fa-star checked' : 'd-none'}
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
    </div>
  );
};

export default ReviewItem;