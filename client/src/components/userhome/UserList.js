import React from 'react';
import MovieThumb from '../elements/MovieThumb';
import NoImage from '../../img/no_image.jpg';
import PropTypes from 'prop-types';

const UserList = ({ movie: { imgUrl, movieId, title } }) => {
  return (
    <div className="review-item">
      <div className="review-item-content">
        <div className="review-item-thumb">
          <MovieThumb
            image={imgUrl ? imgUrl : NoImage}
            clickable={true}
            id={movieId}
          />
        </div>
        <div className="review-item-text">
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
