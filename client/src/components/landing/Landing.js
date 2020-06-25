import React, { useEffect, useState } from 'react';
import Spinner from '../layout/Spinner';
import Navbar from '../layout/Navbar';
import Showcase from '../elements/Showcase';
import { imageUrl, backdropSize, popularBaseUrl } from '../../config';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Landing = ({ isAuthenticated }) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    const getMovie = async () => {
      const result = await (await fetch(`${popularBaseUrl}&page=1`)).json();
      setImage(result.results[0]);
    };
    getMovie();
  }, []);

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }
  if (!image) return <Spinner />;

  return (
    <div>
      <Navbar />
      <Showcase image={`${imageUrl}${backdropSize}${image.backdrop_path}`} />
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
