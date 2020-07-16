import React, { Fragment } from 'react';
import BottomNav from './BottomNav';
import FontAwesome from 'react-fontawesome';
import Reviews from './Reviews';

const ScrollReviews = ({ reviews, user, logout }) => {
  return (
    <Fragment>
      <div className="main">
        <div className="scroll-nav">
          <div className="scroll-heading">
            <FontAwesome className="fas fa-building" name="city" size="2x" />
            <p>MovieCity</p>
          </div>
        </div>
        <div className="movie-scroll">
          {reviews
            .filter(
              (review) =>
                user.friends.includes(review.name) || user.name === review.name
            )
            .map((review) => (
              <Reviews review={review} key={review._id} />
            ))}
        </div>
      </div>
      <BottomNav user={user} logout={logout} />
    </Fragment>
  );
};

export default ScrollReviews;
