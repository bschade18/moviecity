import React, { useEffect } from 'react';
import Spinner from '../layout/Spinner';
import Sidenav from '../layout/Sidenav';
import ReviewFeed from './ReviewFeed';
import UserSearch from '../elements/UserSearch';
import MobileNav from '../layout/MobileNav';
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
    <div className="display-container">
      <Sidenav />
      <ReviewFeed user={user} reviews={reviews} loading={reviewsLoading} />
      <UserSearch />
      <MobileNav />
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  getReviews: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  reviews: state.review.reviews,
  reviewsLoading: state.review.loading,
});

export default connect(mapStateToProps, { getReviews, getUsers })(Home);
