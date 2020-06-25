import React, { useEffect } from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import MyMovies from './MyMovies';
import Spinner from '../layout/Spinner';
import Sidenav from '../layout/Sidenav';
import UserSearch from '../elements/UserSearch';
import { logout } from '../../actions/auth';
import { getReviews } from '../../actions/review';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Home = ({ user, logout, getReviews, reviews }) => {
  useEffect(() => {
    getReviews();
    // eslint-disable-next-line
  }, []);

  if (reviews === null || !user) {
    return <Spinner />;
  }
  return (
    <div className="main-content">
      <Sidenav />
      <div className="scroll-container">
        <div className="main">
          <div className="scroll-nav">
            <div className="scroll-heading">
              <FontAwesome className="fas fa-building" name="city" size="2x" />
              <p>MovieCity</p>
            </div>
          </div>
          <div className="movie-scroll">
            {reviews
              .filter(
                (movie) =>
                  user.friends.includes(movie.user) || user.name === movie.user
              )
              .map((movie) => (
                <MyMovies movie={movie} key={movie._id} />
              ))}
          </div>
          <div className="bottom-nav">
            <Link to="/home" className="btn">
              <div className="sn-item">
                <FontAwesome className="fa-home" name="home" size="2x" />
                <span className="d-block">Home</span>
              </div>
            </Link>
            <Link to="/messages" className="btn">
              <div className="sn-item">
                <FontAwesome
                  className="fa-envelope"
                  name="envelope"
                  size="2x"
                />
                <span className="d-block">Inbox</span>
              </div>
            </Link>
            <Link to="/search" className="btn">
              <div className="sn-item">
                <FontAwesome className="fa-search" name="search" size="2x" />
                <span className="d-block">Search</span>
              </div>
            </Link>
            <Link to={`/user/${user.name}`} className="btn">
              <div className="sn-item">
                <FontAwesome className="fa-user" name="search" size="2x" />
                <span className="d-block">Profile</span>
              </div>
            </Link>
            <button className="btn" onClick={logout}>
              <div className="sn-item">
                <FontAwesome className="fa-sign-out" name="singout" size="2x" />
                <span className="d-block">Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <UserSearch />
    </div>
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
