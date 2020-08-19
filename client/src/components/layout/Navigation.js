import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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

Navigation.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Navigation;
