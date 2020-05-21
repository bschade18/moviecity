import React from 'react';
import ReviewModal from './ReviewModal';
import MessageModal from './MessageModal';

import NoImage from '../components/images/no_image.jpg';
import { posterSize, imageUrl, backdropSize } from '../config';
import MovieThumb from '../elements/MovieThumb';

const MovieInfo = ({ movie, user }) => {
  const {
    backdrop_path,
    poster_path,
    title,
    overview,
    vote_average,
    directors,
  } = movie;

  const movieInfoStyle = (backdrop) => ({
    background: backdrop_path
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
    <div className="movieinfo-container" style={movieInfoStyle(backdrop_path)}>
      <div className="movieinfo-content">
        <div className="movieinfo-thumb">
          <MovieThumb
            image={
              poster_path ? `${imageUrl}${posterSize}${poster_path}` : NoImage
            }
            clickable={false}
          />
        </div>
        <div className="movieinfo-text">
          <h1>{title}</h1>
          <h3>Plot</h3>
          <p>{overview}</p>

          <div className="rating-director">
            <div>
              <h3>IMDB Rating</h3>
              <div className="score">{vote_average}</div>
            </div>
            <div className="director">
              <h3>Director{directors.length > 1 ? 's' : ''}</h3>
              {directors.map((element) => (
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
