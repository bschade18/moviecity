import React from 'react';
import Star from './Star';

const Rating = ({ setRating, rating }) => (
  <div className="rating">
    <Star number={5} rating={rating} setRating={setRating} />
    <Star number={4} rating={rating} setRating={setRating} />
    <Star number={3} rating={rating} setRating={setRating} />
    <Star number={2} rating={rating} setRating={setRating} />
    <Star number={1} rating={rating} setRating={setRating} />
  </div>
);

export default Rating;
