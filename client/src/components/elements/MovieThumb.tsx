import '../../styles/MovieThumb.css';
import React from 'react';
import { Link } from 'react-router-dom';

interface MovieThumbProps {
  image: string,
  id: string,
  clickable: boolean
}

const MovieThumb = ({ image, id, clickable } : MovieThumbProps) => (
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
