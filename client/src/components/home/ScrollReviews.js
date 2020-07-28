import React, { Fragment } from 'react';
import MobileNav from '../layout/MobileNav';
import Reviews from './Reviews';

const ScrollReviews = ({ reviews, user, logout, loading }) => {
  const displayReviews = () => {
    let filterReviews = reviews.filter(
      (review) =>
        user.friends.includes(review.username) ||
        user.username === review.username
    );
    if (!filterReviews.length && !loading) {
      return (
        <Fragment>
          <img
            src="https://www.pajiba.com/assets_c/2020/04/Happy-Gilmore-thumb-700x481-224295.png"
            alt="happy gilmore"
            className="m-auto empty-tl-image"
          />
          <p className="text-center mt-2">
            Happy is upset you haven't reviewed any movies yet
          </p>
          <p className="text-center">
            Reviews from you and your friends will display here when you do
          </p>
        </Fragment>
      );
    } else {
      return filterReviews.map((review) => (
        <Reviews review={review} key={review._id} />
      ));
    }
  };

  return (
    <div className="scroll-container">
      <div className="main">
        <div className="scroll-nav">
          <div className="scroll-heading">
            <p className="home-title">MovieCity</p>
          </div>
        </div>
        <div className="movie-scroll">{displayReviews()}</div>
      </div>
      <MobileNav user={user} logout={logout} />
    </div>
  );
};

export default ScrollReviews;
