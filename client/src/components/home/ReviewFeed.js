import React from 'react';
import FeedHeader from '../layout/FeedHeader';
import ReviewItem from './ReviewItem';
import Feed from '../layout/Feed';
import PropTypes from 'prop-types';

const ReviewFeed = ({ reviews, user, loading }) => {
  const displayReviews = () => {
    let filterReviews = reviews.filter(
      (review) =>
        user.friends.includes(review.username) ||
        user.username === review.username
    );
    if (!filterReviews.length && !loading) {
      return (
        <div>
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
        </div>
      );
    } else {
      return filterReviews.map((review) => (
        <ReviewItem review={review} key={review._id} page="Home" />
      ));
    }
  };

  return (
    <Feed>
      <FeedHeader heading="MovieCity" />
      {displayReviews()}
    </Feed>
  );
};

ReviewFeed.propTypes = {
  user: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ReviewFeed;
