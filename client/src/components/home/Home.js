import React, { useEffect } from 'react';
import AppGrid from '../layout/AppGrid';
import ReviewFeed from './ReviewFeed';
import Spinner from '../layout/Spinner';
import { getReviews } from '../../actions/review';
import { getUsers } from '../../actions/users';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Home = ({ user, reviews, reviewsLoading, getReviews, getUsers }) => {
  useEffect(() => {
    getReviews();
  }, [getReviews]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (reviews === null || !user) {
    return <Spinner />;
  }

  return (
    <AppGrid>
      <ReviewFeed user={user} reviews={reviews} loading={reviewsLoading} />
    </AppGrid>
  );
};

Home.propTypes = {
  user: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  reviewsLoading: PropTypes.bool.isRequired,
  getReviews: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  reviews: state.review.reviews,
  reviewsLoading: state.review.loading,
});

export default connect(mapStateToProps, { getReviews, getUsers })(Home);
