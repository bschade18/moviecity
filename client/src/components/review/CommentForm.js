import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/review';

const CommentForm = ({ reviewId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <div className="review-form">
      <form
        className="comment-form"
        onSubmit={(e) => {
          e.preventDefault();
          addComment(reviewId, { text });
          setText('');
        }}
      >
        <input
          onChange={(e) => setText(e.target.value)}
          type="text"
          className="message-reply form-control"
          value={text}
          placeholder="Write a comment..."
        />
        <input
          className="btn btn-success messages-reply-submit ml-1"
          type="submit"
          id="submit"
          value="Post"
        />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  reviewId: PropTypes.string.isRequired,
};

export default connect(null, { addComment })(CommentForm);
