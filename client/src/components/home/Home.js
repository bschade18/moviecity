import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Sidenav from '../layout/Sidenav';
import UserSearch from '../elements/UserSearch';
import { logout } from '../../actions/auth';
import { getReviews } from '../../actions/review';
import PropTypes from 'prop-types';
import ScrollReviews from './ScrollReviews';

const Home = ({ user, logout, getReviews, reviews }) => {
  useEffect(() => {
    getReviews();
    // eslint-disable-next-line
  }, [getReviews]);

  if (reviews === null || !user) {
    return <Spinner />;
  }
  return (
    <Fragment>
      <Sidenav />
      <div className="scroll-container">
        <ScrollReviews reviews={reviews} user={user} logout={logout} />
      </div>
      <UserSearch />
    </Fragment>
  );
};

Home.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  getReviews: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  reviews: state.review.reviews,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { logout, getReviews })(Home);
