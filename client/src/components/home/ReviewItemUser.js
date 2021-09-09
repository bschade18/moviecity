import '../../styles/ReviewItemUser.css';
import React from 'react';
import { Link } from 'react-router-dom';

const ReviewItemUser = ({ user }) => (
  <Link className="review-item-user-link mb-2" to={`/${user.username}`}>
    <img src={`/uploads/${user.photo}`} className="user-avatar" alt="user" />
    <h6 className="ml-2 review-item-username">{user.username}</h6>
  </Link>
);

export default ReviewItemUser;
