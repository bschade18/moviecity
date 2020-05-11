import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import axios from 'axios';

const Navbar = ({ isAuthenticated, authSuccess }) => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (modal) {
      if (isAuthenticated) {
        toggle();
      }
    }
  });

  const toggle = () => {
    clearErrors();
    setModal(!modal);
  };

  const clearErrors = () => {
    setMsg(null);
  };

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
      .catch((err) => returnErrors(err.response.data));
  };

  const loginSuccess = (data) => {
    localStorage.setItem('token', data.token);
    authSuccess(data.user);
  };

  const returnErrors = (data) => {
    setMsg(data.msg);
  };

  return (
    <nav className="navbar navbar-dark background-primary py-3 navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/home" href="#">
          <FontAwesome className="fas fa-building" name="city" size="2x" />{' '}
          MovieCity
        </Link>

        <form className="form-inline my-2 my-lg-0 ml-auto" onSubmit={onSubmit}>
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Email"
            aria-label="Email"
            name="email"
            onChange={onChangeEmail}
          />
          <input
            className="form-control mr-sm-2"
            type="password"
            placeholder="Password"
            aria-label="Password"
            name="password"
            onChange={onChangePassword}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
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

export default Navbar;
