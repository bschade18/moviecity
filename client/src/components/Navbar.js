import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';

import axios from 'axios';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: '',
      password: '',
      msg: null
    };
  }

  componentDidUpdate() {
    if (this.state.modal) {
      if (this.props.isAuthenticated) {
        this.toggle();
      }
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password
    };

    this.login(user);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = user => {
    const { email, password } = user;

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    // request body
    const body = JSON.stringify({ email, password });

    axios
      .post('/auth/login', body, config)
      .then(res => this.loginSuccess(res.data))
      .catch(err => this.returnErrors(err.response.data, err.response.status));
  };

  loginSuccess = data => {
    localStorage.setItem('token', data.token);
    this.props.authSuccess(data.user);
  };

  returnErrors = (data, status) => {
    this.setState({
      msg: data.msg
    });
  };

  render() {
    return (
      <div id="nav-page">
        <nav className="navbar navbar-light bg-light navbar-expand-lg">
          <Link className="navbar-brand" to="/home" href="#">
            MovieCity
          </Link>
          {this.props.isAuthenticated ? (
            <div></div>
          ) : (
            <RegisterModal
              authSuccess={user => this.props.authSuccess(user)}
              isAuthenticated={this.props.isAuthenticated}
            />
          )}
          {this.props.isAuthenticated ? (
            <Logout logout={this.props.logout} />
          ) : (
            <form
              className="form-inline my-2 my-lg-0 ml-auto"
              onSubmit={this.onSubmit}
            >
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Email"
                aria-label="Email"
                name="email"
                onChange={this.onChange}
              />
              <input
                className="form-control mr-sm-2"
                type="password"
                placeholder="Password"
                aria-label="Password"
                name="password"
                onChange={this.onChange}
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
          )}
        </nav>
      </div>
    );
  }
}

export default Navbar;
