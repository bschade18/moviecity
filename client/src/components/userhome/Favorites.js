import React from 'react';
import MovieThumb from '../elements/MovieThumb';
import NoImage from '../../img/no_image.jpg';

const Favorites = ({ movie: { imgUrl, movieId, title } }) => {
  return (
    <div id="mainmovies-list">
      <div className="movie-box">
        <div className="mymovies-thumb">
          <MovieThumb
            image={imgUrl ? imgUrl : NoImage}
            clickable="true"
            className="mymovies-image"
            id={movieId}
          />
        </div>
        <div className="mainmovies-text">
          <h5>{title}</h5>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
