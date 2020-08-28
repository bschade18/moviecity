import React from 'react';
import FeedHeader from '../layout/FeedHeader';
import ReviewItem from './ReviewItem';
import Feed from '../layout/Feed';
import NoResults from '../elements/NoResults';
import PropTypes from 'prop-types';

const ReviewFeed = ({ reviews, user, loading }) => {
  const displayReviews = () => {
    const userAndFriendsReviews = reviews.filter(
      (review) =>
        user.friends.includes(review.username) ||
        user.username === review.username
    );
    if (!userAndFriendsReviews.length && !loading) {
      return (
        <NoResults
          image="https://www.pajiba.com/assets_c/2020/04/Happy-Gilmore-thumb-700x481-224295.png"
          text1="Happy is upset you haven't reviewed any movies yet"
          text2="Reviews from you and your friends will display here when you do"
        />
      );
    } else {
      return userAndFriendsReviews.map((review) => (
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
