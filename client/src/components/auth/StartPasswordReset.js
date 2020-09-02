import React from 'react';
import LandingNav from '../layout/LandingNav';
import useFormState from '../hooks/useFormState';
import { connect } from 'react-redux';
import { findAccount } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

const StartPasswordReset = ({ findAccount, user }) => {
  const [accountField, setAccountField] = useFormState('');

  const onSubmit = (e) => {
    e.preventDefault();

    findAccount(accountField);
  };

  if (user) {
    return <Redirect to="/account/send_password_reset" />;
  }

  return (
    <div>
      <LandingNav />
      <div className="container">
        <div className="login-fail d-flex justify-content-center align-items-center">
          <div className="col-lg-5 ml-lg-5">
            <h3>Find your MovieCity account</h3>

            <form onSubmit={onSubmit}>
              <div className="form-group py-1">
                <label>Enter your email or username</label>
                <input
                  className="form-control"
                  type="text"
                  name="account"
                  id="account"
                  onChange={setAccountField}
                />
              </div>

              <button className="btn btn-success btn-block" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, { findAccount })(StartPasswordReset);
