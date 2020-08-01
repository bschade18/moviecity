import React, { useEffect, Fragment } from 'react';
import ReviewItem from '../home/ReviewItem';
import Spinner from '../layout/Spinner';
import Sidenav from '../layout/Sidenav';
import UserSearch from '../elements/UserSearch';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import MobileNav from '../layout/MobileNav';
import FeedHeader from '../layout/FeedHeader';
import { getReview } from '../../actions/review';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Review = ({ match, review, getReview, loading }) => {
  useEffect(() => {
    getReview(match.params.id);
  }, [getReview, match.params.id]);

  if (loading || review === null) {
    return <Spinner />;
  }
  return (
    <Fragment>
      <Sidenav />
      <div className="display-container">
        <div className="ReviewFeed-main">
          <FeedHeader heading="Review" />
          <ReviewItem review={review} />
          {review.comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              reviewId={review._id}
            />
          ))}
          <CommentForm reviewId={review._id} />
        </div>
        <MobileNav />
      </div>
      <UserSearch />
    </Fragment>
  );
};

Review.propTypes = {
  getReview: PropTypes.func.isRequired,
  review: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  review: state.review.review,
  loading: state.review.loading,
});

export default connect(mapStateToProps, {
  getReview,
})(Review);
