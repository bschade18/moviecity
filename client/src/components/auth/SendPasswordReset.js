import React, { useState, Fragment } from 'react';
import LandingNav from '../layout/LandingNav';
import { connect } from 'react-redux';
import api from '../../utils/api';

const SendPasswordReset = ({ user }) => {
  const [message, setMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    sendPasswordResetEmail(user.email);
  };

  const sendPasswordResetEmail = async (email) => {
    const body = JSON.stringify({ email });

    try {
      await api.post('/auth/forgotpassword', body);

      setMessage('Email Sent!');
    } catch (err) {
      setMessage('Something Went Wrong');
    }
  };

  return (
    <div>
      <LandingNav />
      <div className="container">
        <div className="login-fail d-flex justify-content-center align-items-center">
          <div className="col-lg-5 ml-lg-5">
            {message ? (
              <div>
                <h1 className="text-center">Check your email!</h1>
                <p className="text-center mt-3">
                  We sent an email to {user.email}
                </p>
                <p className="text-center mt-3">
                  Click the link in the email to reset your password.
                </p>
              </div>
            ) : (
              <Fragment>
                <h4 className="text-center">
                  We located the following email associated with your account:
                </h4>
                <div className="text-center mt-3">
                  {' '}
                  <strong>{user.email}</strong>
                </div>

                <form onSubmit={onSubmit}>
                  <button
                    className="btn btn-success btn-block mt-4"
                    type="submit"
                  >
                    Send Password Reset To This Email
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

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, {})(SendPasswordReset);
