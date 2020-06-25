import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ movie, page }) => (
  <div id="navigation" className="sticky-top">
    <div className="navigation-container">
      <div className="navigation-content">
        <Link to="/home">
          <p>Home</p>
        </Link>
        <p>|</p>
        <p>{page === 'Inbox' ? page : movie ? movie : 'Search'}</p>
      </div>
    </div>
  </div>
);

export default Navigation;
