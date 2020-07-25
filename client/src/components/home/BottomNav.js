import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const BottomNav = ({ user, logout }) => (
  <div className="bottom-nav">
    <Link to="/home" className="btn">
      <div className="sn-item">
        <FontAwesome className="fa-home" name="home" size="2x" />
        <span className="d-block">Home</span>
      </div>
    </Link>
    <Link to="/messages" className="btn">
      <div className="sn-item">
        <FontAwesome className="fa-envelope" name="envelope" size="2x" />
        <span className="d-block">Inbox</span>
      </div>
    </Link>
    <Link to="/search" className="btn">
      <div className="sn-item">
        <FontAwesome className="fa-search" name="search" size="2x" />
        <span className="d-block">Search</span>
      </div>
    </Link>
    <Link to={`/${user.username}`} className="btn">
      <div className="sn-item">
        <FontAwesome className="fa-user" name="search" size="2x" />
        <span className="d-block">Profile</span>
      </div>
    </Link>
    <button className="btn" onClick={logout}>
      <div className="sn-item">
        <FontAwesome className="fa-sign-out" name="singout" size="2x" />
        <span className="d-block">Logout</span>
      </div>
    </button>
  </div>
);

export default BottomNav;
