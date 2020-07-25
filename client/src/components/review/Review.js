import React, { useEffect } from 'react';
import ReviewItem from './ReviewItem';
import Spinner from '../layout/Spinner';
import Sidenav from '../layout/Sidenav';
import UserSearch from '../elements/UserSearch';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import MobileNav from '../layout/MobileNav';
import { getReview } from '../../actions/review';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Review = ({ match, review, getReview, loading }) => {
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
          <MobileNav />
        </div>
      </div>
      <UserSearch />
    </div>
  );
};

Review.propTypes = {
  getReview: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  review: state.review.review,
  loading: state.review.loading,
});

export default connect(mapStateToProps, {
  getReview,
})(Review);
