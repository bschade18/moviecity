import React from 'react';
import NoResults from '../elements/NoResults';
import ReviewItem from '../home/ReviewItem';

const ProfileUserReviews = ({ img, text, reviews, profileUserId }) => {
  const userReviews = reviews.filter(
    (review) => review.user._id === profileUserId()
  );
  return (
    <div>
      {!userReviews.length ? (
        <NoResults image={img} text1={text} />
      ) : (
        userReviews.map((review) => (
          <ReviewItem review={review} key={review._id} />
        ))
      )}
    </div>
  );
};

export default ProfileUserReviews;
