import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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

MovieThumb.propTypes = {
  image: PropTypes.string.isRequired,
  id: PropTypes.number,
  clickable: PropTypes.bool.isRequired,
};

export default MovieThumb;
