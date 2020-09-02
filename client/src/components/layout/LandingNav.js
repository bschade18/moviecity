import React from 'react';
import useFormState from '../hooks/useFormState';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const LandingNav = ({ login, page }) => {
  const [email, setEmail] = useFormState('');
  const [password, setPassword] = useFormState('');

  const onSubmit = (e) => {
    e.preventDefault();

    login({ email, password });
  };

  return (
    <nav className="navbar navbar-dark landing-nav py-3">
      <div className="container">
        <Link className="navbar-brand" to="/home" href="#">
          <FontAwesome
            className="fas fa-building d-none d-md-inline"
            name="city"
            size="2x"
          />{' '}
          <span>MovieCity</span>
        </Link>
        {page === 'landing' && (
          <form className="form-inline" onSubmit={onSubmit}>
            <input
              className="form-control my-2 mr-sm-2"
              type="text"
              placeholder="Email"
              aria-label="Email"
              name="email"
              onChange={setEmail}
            />

            <input
              className="form-control my-2 mr-sm-2"
              type="password"
              placeholder="Password"
              aria-label="Password"
              name="password"
              onChange={setPassword}
            />
            <Link to="/account/reset_password/start">
              <small className="landing-nav-forgotpw">Forgot Password?</small>
            </Link>

            <button
              className="btn btn-outline-success my-2 my-sm-0 btn-block-sm-only"
              type="submit"
            >
              Log in
            </button>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav ml-auto"></ul>
            </div>
          </form>
        )}
      </div>
    </nav>
  );
};

LandingNav.propTypes = {
  login: PropTypes.func.isRequired,
  page: PropTypes.string,
};

export default connect(null, { login })(LandingNav);
