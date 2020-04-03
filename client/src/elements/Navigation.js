import React from 'react';

import { Link } from 'react-router-dom';

const Navigation = ({ movie }) => (
  <div id="navigation">
    <div className="navigation-container">
      <div className="navigation-content">
        <Link to="/">
          <p>Home</p>
        </Link>
        <p>|</p>
        <p>{movie ? movie : 'Search'}</p>
      </div>
    </div>
  </div>
);

export default Navigation;
