import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

const Sidenav = ({ logout }) => (
  <div id="sidenav-container">
    <Link to="/main" className="btn">
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
    <button className="btn" onClick={logout}>
      <div className="sn-item">
        <FontAwesome className="fa-sign-out" name="singout" size="2x" />
        <span className="d-block">Logout</span>
      </div>
    </button>
  </div>
);

export default Sidenav;
