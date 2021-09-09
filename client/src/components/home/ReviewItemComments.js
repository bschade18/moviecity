import '../../styles/ReviewItemComments.css';
import React from 'react';

const ReviewItemComments = ({ comments }) => (
  <div className="review-item-comments">
    <i className="far fa-comment-alt"></i>{' '}
    <span>{comments.length > 0 && comments.length}</span>
  </div>
);

export default ReviewItemComments;
