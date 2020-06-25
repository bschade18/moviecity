import React from 'react';
import { Link } from 'react-router-dom';

const MovieThumb = ({ image, id, clickable }) => (
  <div className="movie-thumb">
    {clickable ? (
      <Link to={`/movie/${id}`}>
        <img className="clickable" src={image} alt="moviethumb" />
      </Link>
    ) : (
      <img className="movie-thumb-image" src={image} alt="moviethumb" />
    )}
  </div>
);

export default MovieThumb;
