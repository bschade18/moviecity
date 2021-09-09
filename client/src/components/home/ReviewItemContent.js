import '../../styles/ReviewItemContent.css';
import React from 'react';
import NoImage from '../../img/no_image.jpg';
import MovieThumb from '../elements/MovieThumb';
import ReviewItemRating from './ReviewItemRating';

const ReviewItemContent = ({ imageUrl, movieId, movieTitle, rating, text }) => {
  return (
    <div className="review-item-content">
      <div className="review-item-thumb">
        <MovieThumb
          image={imageUrl ? imageUrl : NoImage}
          clickable={true}
          id={movieId}
        />
      </div>
      <h5>{movieTitle}</h5>
      <ReviewItemRating rating={rating} />
      <p>{text}</p>
    </div>
  );
};

export default ReviewItemContent;
