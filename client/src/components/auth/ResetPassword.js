import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import useFormState from '../hooks/useFormState';
import LandingNav from '../layout/LandingNav';
import { setAlert } from '../../actions/alert';
import api from '../../utils/api';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ResetPassword = ({ match, setAlert, alerts }) => {
  const [password, setPassword] = useFormState('');
  const [password2, setPassword2] = useFormState('');
  const [message, setMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    const token = match.params.token;

    resetPassword(password, password2, token);
  };

  const resetPassword = async (password, password2, token) => {
    const body = JSON.stringify({ password, password2 });

    try {
      await api.put(`/auth/resetpassword/${token}`, body);

      setMessage('Password successfully reset!');
    } catch (err) {
      const errors = err.response.data.errors;

      setAlert(errors);
    }
  };

  const checkAlert = (inputField) => {
    if (alerts.filter((alert) => alert.param === inputField).length) {
      const msg = alerts.filter((alert) => alert.param === inputField)[0].msg;
      return <p className="error">{msg}</p>;
    } else {
      return <p></p>;
    }
  };

  const applyErrorStyle = (inputField) => {
    if (alerts.filter((alert) => alert.param === inputField).length) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div>
      <LandingNav />
      <div className="container">
        <div className="login-fail d-flex justify-content-center align-items-center">
          <div className="col-lg-5 ml-lg-5">
            {message ? (
              <Fragment>
                <div>
                  <h1 className="text-center">{message}</h1>
                </div>
                <div className="text-center">
                  <Link to="/">Login to MovieCity</Link>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <h3>Reset Password</h3>

                <form onSubmit={onSubmit}>
                  <div className="form-group">
                    <input
                      className={
                        applyErrorStyle('password')
                          ? 'form-control error-border'
                          : 'form-control'
                      }
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter New Password"
                      onChange={setPassword}
                    />
                    {checkAlert('password')}
                  </div>
                  <div className="form-group">
                    <input
                      className={
                        applyErrorStyle('password2')
                          ? 'form-control error-border'
                          : 'form-control'
                      }
                      type="password"
                      name="password2"
                      id="password2"
                      placeholder="Confirm New Password"
                      onChange={setPassword2}
                    />
                    {checkAlert('password2')}
                  </div>

                  <button className="btn btn-success btn-block" type="submit">
                    Submit
                  </button>
                </form>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ResetPassword.propTypes = {
  match: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  alerts: PropTypes.array,
};

const mapStateToProps = (state) => ({
  alerts: state.alert.alerts,
});

export default connect(mapStateToProps, { setAlert })(ResetPassword);
