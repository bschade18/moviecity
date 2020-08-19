import React from 'react';
import PropTypes from 'prop-types';

const Logout = ({ logout }) => (
  <span onClick={logout} href="#" className="btn">
    Logout
  </span>
);

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Logout;
