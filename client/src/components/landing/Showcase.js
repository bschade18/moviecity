import React from 'react';
import useFormState from '../hooks/useFormState';
import { register } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';

const Showcase = ({ register, image, alerts }) => {
  const [name, setName] = useFormState('');
  const [username, setUserName] = useFormState('');
  const [email, setEmail] = useFormState('');
  const [password, setPassword] = useFormState('');
  const [password2, setPassword2] = useFormState('');

  const onSubmit = (e) => {
    e.preventDefault();

    register({ name, username, email, password, password2 });
  };

  const applyErrorStyle = (inputField) =>
    alerts.filter((alert) => alert.param === inputField).length > 0;

  return (
    <div className="container">
      <div className="showcase row align-items-center mt-5">
        <div className="col-lg-6 d-none d-lg-block mr-3">
          <img src={image} alt="movie" className="showcase-movie-img" />
        </div>
        <div className="col-lg-5 ml-lg-5">
          <h3>Create a New Account</h3>
          <form onSubmit={onSubmit} noValidate>
            <div className="form-group">
              <input
                className={
                  applyErrorStyle('name')
                    ? 'form-control error-border'
                    : 'form-control'
                }
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={setName}
              />
              <Alert field="name" />
            </div>
            <div className="form-group">
              <input
                className={
                  applyErrorStyle('username')
                    ? 'form-control error-border'
                    : 'form-control'
                }
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                onChange={setUserName}
              />
              <Alert field="username" />
            </div>
            <div className="form-group">
              <input
                className={
                  applyErrorStyle('email')
                    ? 'form-control error-border'
                    : 'form-control'
                }
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={setEmail}
              />
              <Alert field="email" />
            </div>
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
                placeholder="New Password"
                onChange={setPassword}
              />
              <Alert field="password" />
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
                placeholder="Confirm Password"
                onChange={setPassword2}
              />
              <Alert field="password2" />
            </div>

            <button className="btn btn-success btn-block-sm-only" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Showcase.propTypes = {
  register: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  alerts: PropTypes.array,
};

const mapStateToProps = (state) => ({
  alerts: state.alert.alerts,
});

export default connect(mapStateToProps, { register })(Showcase);
