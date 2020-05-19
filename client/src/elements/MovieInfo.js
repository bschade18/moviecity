import React from 'react';
import ReviewModal from './ReviewModal';
import MessageModal from './MessageModal';

import NoImage from '../components/images/no_image.jpg';
import { posterSize, imageUrl, backdropSize } from '../config';
import MovieThumb from '../elements/MovieThumb';

const MovieInfo = ({ movie, user }) => {
  // backdrop is a prop to the backdrop style component here
  // see styled movie info styled component

  const movieInfoStyle = (backdrop) => ({
    background: movie.backdrop_path
      ? `url(${imageUrl}${backdropSize}${backdrop})`
      : '#000',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    padding: '40px 20px',
    boxSizing: 'border-box',
    animation: 'animateMovieinfo 1s',
  });

  return (
    <div
      className="movieinfo-container"
      style={movieInfoStyle(movie.backdrop_path)}
    >
      <div className="movieinfo-content">
        <div className="movieinfo-thumb">
          <MovieThumb
            image={
              movie.poster_path
                ? `${imageUrl}${posterSize}${movie.poster_path}`
                : NoImage
            }
            clickable={false}
          />
        </div>
        <div className="movieinfo-text">
          <h1>{movie.title}</h1>
          <h3>Plot</h3>
          <p>{movie.overview}</p>

          <div className="rating-director">
            <div>
              <h3>IMDB Rating</h3>
              <div className="score">{movie.vote_average}</div>
            </div>
            <div className="director">
              <h3>Director{movie.directors.length > 1 ? 's' : ''}</h3>
              {movie.directors.map((element) => (
                <p key={element.credit_id}>{element.name}</p>
              ))}
            </div>
          </div>
          <div className="movieinfo-review-btns">
            <div className="movieinfo-review-btn">
              <ReviewModal movie={movie} user={user} />
            </div>
            <div className="movieinfo-review-btn">
              <MessageModal movie={movie} user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
