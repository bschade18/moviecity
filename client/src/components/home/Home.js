import React, { useEffect } from 'react';
import AppGrid from '../layout/AppGrid';
import ReviewFeed from './ReviewFeed';
import Spinner from '../layout/Spinner';
import { getReviews } from '../../actions/review';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Home = ({ getReviews, reviews, user, reviewsLoading }) => {
  useEffect(() => {
    getReviews();
  }, [getReviews]);

  if (reviews === null || !user) {
    return <Spinner />;
  }

  return (
    <AppGrid component="home">
      <ReviewFeed user={user} reviews={reviews} loading={reviewsLoading} />
    </AppGrid>
  );
};

Home.propTypes = {
  getReviews: PropTypes.func.isRequired,
  reviews: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  reviewsLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  reviews: state.review.reviews,
  reviewsLoading: state.review.loading,
});

export default connect(mapStateToProps, { getReviews })(Home);
