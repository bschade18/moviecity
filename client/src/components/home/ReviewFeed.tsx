import React from 'react';
import FeedHeader from '../layout/FeedHeader';
import ReviewItem from './ReviewItem';
import Feed from '../layout/Feed';
import Spinner from '../layout/Spinner';
import NoResults from '../elements/NoResults';
import NoResultsImage from '../../img/happy.jpg';

interface ReviewFeedProps {
  loading: boolean;
  user: {
    _id: string;
    friends: {
      _id: string;
    }[];
  };
  reviews: {
    _id: string;
    user: {
      _id: string;
    };
    rating: number;
    imageUrl: string;
    movieId: number;
    movieTitle: string;
    text: string;
    comments: {}[];
  }[];
}

const ReviewFeed = ({ user, reviews, loading }: ReviewFeedProps) => {
  const userAndFriendsReviews = reviews.filter((review) => {
    const isFriendReview = user.friends.filter(
      (friend) => friend._id === review.user._id
    ).length;
    const isUserReview = review.user._id === user._id;

    return isFriendReview || isUserReview;
  });

  return (
    <Feed>
      {/*@ts-ignore*/}

      <FeedHeader heading="MovieCity" />
      {loading ? (
        <Spinner />
      ) : !loading && userAndFriendsReviews.length === 0 ? (
        <NoResults
          image={NoResultsImage}
          text1="Happy is upset you haven't reviewed any movies yet"
          text2="Reviews from you and your friends will display here when you do"
        />
      ) : (
        userAndFriendsReviews.map((review) => (
          <ReviewItem review={review} key={review._id} page="Home" />
        ))
      )}
    </Feed>
  );
};

export default ReviewFeed;
