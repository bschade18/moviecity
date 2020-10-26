import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CommentItem = ({ comment: { text, user, username } }) => (
  <div className="comment-item">
    <div className="comment-item-content">
      <img src={`/uploads/${user.photo}`} className="user-avatar" alt="user" />
      <div className="comment-item-text ml-3">
        <Link className="comment-item-user-link" to={`/${username}`}>
          <h4 className="comment-item-username">{username}</h4>
        </Link>
        <div>
          <p className="my-1">{text}</p>
        </div>
      </div>
    </div>
  </div>
);

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default CommentItem;
