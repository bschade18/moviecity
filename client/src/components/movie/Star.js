import React from 'react';

const Star = ({ number, rating, setRating }) => (
  <span
    onClick={() => setRating(number)}
    className={'fa fa-star ' + (rating >= number ? 'fill-color' : 'empty')}
  ></span>
);

export default Star;
