import React from 'react';
import FontAwesome from 'react-fontawesome';
import Logout from '../components/auth/Logout';
import { Link } from 'react-router-dom';

const Sidenav = ({ logout }) => (
  <div id="sidenav-container">
    <div className="sn-item">
      <FontAwesome className="fa-home" name="home" size="2x" />
      <Link to="/main" className="btn">
        Home
      </Link>
    </div>
    <div className="sn-item">
      <FontAwesome className="fa-envelope" name="envelope" size="2x" />
      <Link to="/messages" className="btn">
        Inbox
      </Link>
    </div>
    <div className="sn-item">
      <FontAwesome className="fa-search" name="search" size="2x" />
      <Link to="/search" className="btn">
        Search
      </Link>
    </div>
    <div className="sn-item">
      <FontAwesome className="fa-sign-out" name="singout" size="2x" />

      <Logout logout={logout} />
    </div>
  </div>
);

export default Sidenav;
