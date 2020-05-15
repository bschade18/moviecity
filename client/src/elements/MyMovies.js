import React from 'react';
import MovieThumb from './MovieThumb';
import NoImage from '../components/images/no_image.jpg';

const MyMovies = ({ movie }) => (
  <div id="mainmovies-list">
    <h6>{movie.user}</h6>
    <div className="movie-box">
      <div className="mymovies-thumb">
        <MovieThumb
          image={movie.imageUrl ? movie.imageUrl : NoImage}
          clickable="true"
          className="mymovies-image"
          id={movie.movieId}
        />
      </div>
      <div className="mainmovies-text">
        <h5>{movie.movieTitle}</h5>
        <div className="rating">
          <span
            className={movie.review >= 1 ? 'fa fa-star checked' : 'd-none'}
          ></span>
          <span
            className={movie.review >= 2 ? 'fa fa-star checked' : 'd-none'}
          ></span>
          <span
            className={movie.review >= 3 ? 'fa fa-star checked' : 'd-none'}
          ></span>
          <span
            className={movie.review >= 4 ? 'fa fa-star checked' : 'd-none'}
          ></span>
          <span
            className={movie.review === 5 ? 'fa fa-star checked' : 'd-none'}
          ></span>
        </div>
        <p>{movie.comments}</p>
      </div>
    </div>
  </div>
);

export default MyMovies;
