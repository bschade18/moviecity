import React, { useEffect, useState } from 'react';
import Spinner from '../layout/Spinner';
import Navbar from '../layout/Navbar';
import Showcase from '../elements/Showcase';
import { imageUrl, backdropSize, popularBaseUrl } from '../../config';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

const Landing = ({ isAuthenticated, loading, alerts, setAlert }) => {
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
  } else if (!loading && isAuthenticated === false && !alerts.length) {
    return <Redirect to="/loginfail" />;
  }

  if (!image) return <Spinner />;

  return (
    <div>
      <Navbar page="landing" />
      <Showcase image={`${imageUrl}${backdropSize}${image.backdrop_path}`} />
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  alerts: PropTypes.array,
  setAlert: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  alerts: state.alert,
});

export default connect(mapStateToProps, { setAlert })(Landing);
