import React from 'react';
import ReviewItem from './ReviewItem';

const Reviews = ({ userAndFriendsReviews }) => (
  <div>
    {userAndFriendsReviews.map((review) => (
      <ReviewItem review={review} key={review._id} page="Home" />
    ))}
  </div>
);

export default Reviews;
