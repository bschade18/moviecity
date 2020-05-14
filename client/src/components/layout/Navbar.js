import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

import axios from 'axios';

const Navbar = ({ authSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    login(user);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const login = (user) => {
    const { email, password } = user;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, password });

    axios
      .post('/auth/login', body, config)
      .then((res) => loginSuccess(res.data))
      .catch((err) => console.log(err));
  };

  const loginSuccess = (data) => {
    localStorage.setItem('token', data.token);
    authSuccess(data.user);
  };

  return (
    <nav className="navbar navbar-dark background-primary py-3">
      <div className="container">
        <Link className="navbar-brand" to="/home" href="#">
          <FontAwesome
            className="fas fa-building d-none d-md-inline"
            name="city"
            size="2x"
          />{' '}
          <span>MovieCity</span>
        </Link>

        <form className="form-inline" onSubmit={onSubmit}>
          <input
            className="form-control my-2 mr-sm-2"
            type="text"
            placeholder="Email"
            aria-label="Email"
            name="email"
            onChange={onChangeEmail}
          />
          <input
            className="form-control my-2 mr-sm-2"
            type="password"
            placeholder="Password"
            aria-label="Password"
            name="password"
            onChange={onChangePassword}
          />
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
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  authSuccess: PropTypes.func.isRequired,
};

export default Navbar;
