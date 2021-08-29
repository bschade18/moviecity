import '../../styles/CommentForm.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/review';

const CommentForm = ({ reviewId, addComment, review, user }) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    addComment(reviewId, {
      comments: [
        ...review.comments,
        {
          user: user._id,
          name: user.name,
          username: user.username,
          text,
        },
      ],
    });

    setText('');
  };

  return (
    <div className="comment-form">
      <form
        className={
          review.comments.length
            ? 'comment-form-flat-top'
            : 'comment-form-rounded-top'
        }
        onSubmit={(e) => onSubmit(e)}
      >
        <input
          onChange={(e) => setText(e.target.value)}
          type="text"
          className="form-control"
          value={text}
          placeholder="Write a comment..."
        />
        <input
          className="btn btn-success ml-1"
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
