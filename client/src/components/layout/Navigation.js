import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ page }) => (
  <div id="navigation" className="sticky-top">
    <div className="navigation-container">
      <div className="navigation-content">
        <Link to="/home">
          <p>Home</p>
        </Link>
        <p>|</p>
        <p>{page}</p>
      </div>
    </div>
  </div>
);

export default Navigation;
