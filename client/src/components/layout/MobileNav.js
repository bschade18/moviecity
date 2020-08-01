import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const MobileNav = ({ logout, user }) => (
  <div className="bottom-nav">
    <Link to="/home" className="btn">
      <div className="sn-item">
        <FontAwesome className="fa-home" name="home" size="2x" />
      </div>
    </Link>
    <Link to="/messages" className="btn">
      <div className="sn-item">
        <FontAwesome className="fa-envelope" name="envelope" size="2x" />
      </div>
    </Link>
    <Link to="/search" className="btn">
      <div className="sn-item">
        <FontAwesome className="fa-search" name="search" size="2x" />
      </div>
    </Link>
    <Link to={`/${user.username}`} className="btn">
      <div className="sn-item">
        <FontAwesome className="fa-user" name="search" size="2x" />
      </div>
    </Link>
    <button className="btn" onClick={logout}>
      <div className="sn-item">
        <FontAwesome className="fa-sign-out" name="signout" size="2x" />
      </div>
    </button>
  </div>
);

MobileNav.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(MobileNav);
