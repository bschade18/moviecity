import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const Showcase = ({ image, title }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      console.log('passwords do not match');
    } else {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({ name, email, password });

      axios
        .post('/auth/register', body, config)
        .then((res) => console.log(res.data))
        .catch((err) => console.log('it did not work'));
    }
  };

  return (
    <div className="container">
      <div id="showcase-container" className="row align-items-center mt-5">
        <div className="col-lg-6 d-none d-lg-block">
          <img src={image} alt="movie" className="home-img" />
        </div>
        <div className="col-lg-5 offset-1">
          <h3>Create a New Account</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group py-1">
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={onChange}
              />
            </div>
            <div className="form-group py-1">
              <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={onChange}
              />
            </div>
            <div className="form-group py-1">
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                placeholder="New Password"
                onChange={onChange}
              />
            </div>
            <div className="form-group py-1">
              <input
                className="form-control"
                type="password"
                name="password2"
                id="password2"
                placeholder="Confirm Password"
                onChange={onChange}
              />
            </div>
            <button className="btn btn-success" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Showcase;

/* <img src={image} style={{ width: '100%' }} alt="movie-poster" /> */
