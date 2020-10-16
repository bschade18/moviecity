import React from 'react';
import FeedHeader from '../layout/FeedHeader';
import ReviewItem from './ReviewItem';
import Feed from '../layout/Feed';
import NoResults from '../elements/NoResults';
import PropTypes from 'prop-types';
import NoResultsImage from '../../img/happy.jpg';

const ReviewFeed = ({ user, reviews, loading }) => {
  const renderReviews = () => {
    const userAndFriendsReviews = reviews.filter((review) => {
      const { friends } = user;
      return (
        friends.filter((friend) => friend._id === review.user._id).length ||
        review.user._id === user._id
      );
    });
    if (!loading && !userAndFriendsReviews.length) {
      return (
        <NoResults
          image={NoResultsImage}
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
      {renderReviews()}
    </Feed>
  );
};

ReviewFeed.propTypes = {
  user: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ReviewFeed;
