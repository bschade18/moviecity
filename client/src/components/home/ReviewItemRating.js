import React from 'react';

const ReviewItemRating = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span className={'fa fa-star fill-star'}></span>);
    }
    return stars;
  };
  return <div className="rating">{renderStars()}</div>;
};

export default ReviewItemRating;
