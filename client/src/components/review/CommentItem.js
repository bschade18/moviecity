import React from 'react';
import { Link } from 'react-router-dom';

const CommentItem = ({ comment: { text, name } }) => {
  return (
    <div className="comment p-3">
      <div>
        <Link className="comment-user-link" to={`/${name}`}>
          <h4 className="user-name">{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
      </div>
    </div>
  );
};

export default CommentItem;
