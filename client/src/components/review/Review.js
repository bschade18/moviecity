import React, { useEffect, Fragment } from 'react';
import ReviewItem from '../home/ReviewItem';
import Spinner from '../layout/Spinner';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import FeedHeader from '../layout/FeedHeader';
import AppGrid from '../layout/AppGrid';
import Feed from '../layout/Feed';
import { getReview } from '../../actions/review';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Review = ({ match, review, getReview, loading, user }) => {
  useEffect(() => {
    getReview(match.params.id);
  }, [getReview, match.params.id]);

  return (
    <AppGrid>
      <Feed>
        <FeedHeader heading="Review" />
        {loading || review === null ? (
          <Spinner />
        ) : (
          <Fragment>
            <ReviewItem review={review} />
            {review.comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                reviewId={review._id}
              />
            ))}
            <CommentForm reviewId={review._id} review={review} user={user} />
          </Fragment>
        )}
      </Feed>
    </AppGrid>
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
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getReview,
})(Review);
