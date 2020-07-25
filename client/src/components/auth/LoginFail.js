import React from 'react';
import useFormState from '../hooks/useFormState';
import LandingNav from '../layout/LandingNav';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const LoginFail = ({ login, isAuthenticated }) => {
  const [email, setEmail] = useFormState('');
  const [password, setPassword] = useFormState('');

  const onSubmit = (e) => {
    e.preventDefault();

    login({ email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div>
      <LandingNav />
      <div className="container">
        <div
          id="showcase-container"
          className="d-flex justify-content-center align-items-center"
        >
          <div className="col-lg-5 ml-lg-5">
            <h3>Log in to MovieCity</h3>
            <p className="text-danger">
              The email and password you entered do not match our records.
              Please double-check and try again.
            </p>
            <form onSubmit={onSubmit}>
              <div className="form-group py-1">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={setEmail}
                />
              </div>
              <div className="form-group py-1">
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="New Password"
                  onChange={setPassword}
                />
              </div>

              <button className="btn btn-success btn-block" type="submit">
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginFail.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LoginFail);
