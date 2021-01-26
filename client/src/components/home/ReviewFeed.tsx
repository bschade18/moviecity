import React from 'react';
import FeedHeader from '../layout/FeedHeader';
import ReviewItem from './ReviewItem';
import Feed from '../layout/Feed';
import NoResults from '../elements/NoResults';
import NoResultsImage from '../../img/happy.jpg';


interface ReviewFeedProps {
  loading: boolean,
  user: {
    _id: string
    friends: {
      _id: string
    }[]
  },
  reviews: {
  _id: string,
  user: {
    _id: string
  },
  rating: number,
  imageUrl: string,
  movieId: number,
  movieTitle: string,
  text: string,
  comments: {}[]
  }[]
}

const ReviewFeed = ({ user, reviews, loading } : ReviewFeedProps) => {
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
    {/*@ts-ignore*/} 
      <FeedHeader heading="MovieCity" />
      {renderReviews()}
    </Feed>
  );
};



export default ReviewFeed;
