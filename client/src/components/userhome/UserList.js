import React from 'react';
import MovieThumb from '../elements/MovieThumb';
import NoImage from '../../img/no_image.jpg';
import PropTypes from 'prop-types';

const UserList = ({ movie: { imgUrl, movieId, title } }) => {
  return (
    <div className="ReviewItem">
      <div className="movie-box">
        <div className="mymovies-thumb">
          <MovieThumb
            image={imgUrl ? imgUrl : NoImage}
            clickable={true}
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

UserList.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default UserList;
