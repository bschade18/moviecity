import React from 'react';
import { Link } from 'react-router-dom';

const CommentItem = ({ comment: { text, user, username } }) => {
  return (
    <div className="comment p-3">
      <div className="comment-item-content">
        <img src={`/uploads/${user.photo}`} className="user-photo" alt="user" />
        <div className="comment-item-text ml-3">
          <Link className="comment-user-link" to={`/${username}`}>
            <h4 className="user-name">{username}</h4>
          </Link>

          <div>
            <p className="my-1">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
