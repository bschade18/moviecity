import React from 'react';
import useFormState from '../hooks/useFormState';
import Alert from '../layout/Alert';
import { register } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';

const Showcase = ({ register, image, setAlert }) => {
  const [name, setName] = useFormState('');
  const [username, setUserName] = useFormState('');
  const [email, setEmail] = useFormState('');
  const [password, setPassword] = useFormState('');
  const [password2, setPassword2] = useFormState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, username, email, password });
    }
  };

  return (
    <div className="container">
      <div id="showcase-container" className="row align-items-center mt-5">
        <div className="col-lg-6 d-none d-lg-block mr-3">
          <img src={image} alt="movie" className="home-img" />
        </div>
        <div className="col-lg-5 ml-lg-5">
          <h3>Create a New Account</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group py-1">
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={setName}
              />
            </div>
            <div className="form-group py-1">
              <input
                className="form-control"
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                onChange={setUserName}
              />
            </div>
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
            <div className="form-group py-1">
              <input
                className="form-control"
                type="password"
                name="password2"
                id="password2"
                placeholder="Confirm Password"
                onChange={setPassword2}
              />
            </div>
            <button className="btn btn-success btn-block-sm-only" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <Alert />
    </div>
  );
};

Showcase.propTypes = {
  register: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  setAlert: PropTypes.func.isRequired,
  alert: PropTypes.array,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps, { register, setAlert })(Showcase);
