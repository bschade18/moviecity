import React from 'react';
import MobileNav from '../layout/MobileNav';
import Reviews from './Reviews';

const ScrollReviews = ({ reviews, user, logout }) => (
  <div className="scroll-container">
    <div className="main">
      <div className="scroll-nav">
        <div className="scroll-heading">
          <p className="home-title">MovieCity</p>
        </div>
      </div>
      <div className="movie-scroll">
        {reviews
          .filter(
            (review) =>
              user.friends.includes(review.username) ||
              user.username === review.username
          )
          .map((review) => (
            <Reviews review={review} key={review._id} />
          ))}
      </div>
    </div>
    <MobileNav user={user} logout={logout} />
  </div>
);

export default ScrollReviews;
