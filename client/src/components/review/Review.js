import React, { useEffect } from 'react';
import FontAwesome from 'react-fontawesome';
import ReviewItem from './ReviewItem';
import Spinner from '../layout/Spinner';
import Sidenav from '../layout/Sidenav';
import UserSearch from '../elements/UserSearch';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { loadUser, logout, updateUser } from '../../actions/auth';
import { getReviews, getReview } from '../../actions/review';
import { getUsers } from '../../actions/users';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Review = ({ match, user, review, getReview, loading }) => {
  useEffect(() => {
    getReview(match.params.id);
    // eslint-disable-next-line
  }, []);

  if (loading || review === null) {
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
              <p>Review</p>
            </div>
          </div>
          <div className="movie-scroll">
            <ReviewItem review={review} />

            <div className="comments">
              {review.comments.map((comment) => (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  reviewId={review._id}
                />
              ))}
            </div>
            <CommentForm reviewId={review._id} />
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
            <Link to={`/${user.name}`} className="btn">
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

Review.propTypes = {
  user: PropTypes.object,
  loadUser: PropTypes.func,
  logout: PropTypes.func,
  reviews: PropTypes.array,
  getReviews: PropTypes.func,
  updateUser: PropTypes.func,
  getReview: PropTypes.func,
  review: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  reviews: state.review.reviews,
  users: state.user.users,
  review: state.review.review,
  loading: state.review.loading,
});

export default connect(mapStateToProps, {
  loadUser,
  logout,
  getReview,
  getReviews,
  getUsers,
  updateUser,
})(Review);
