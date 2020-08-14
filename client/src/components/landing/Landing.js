import React, { useEffect, useState, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import LandingNav from '../layout/LandingNav';
import Showcase from '../elements/Showcase';
import { clearAlerts } from '../../actions/alert';
import { imageUrl, backdropSize, popularBaseUrl } from '../../config';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Landing = ({ isAuthenticated, loading, clearAlerts }) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    const getMovie = async () => {
      const result = await (await fetch(`${popularBaseUrl}&page=1`)).json();
      setImage(result.results[0]);
    };
    getMovie();
  }, []);

  if (isAuthenticated) {
    clearAlerts();
    return <Redirect to="/home" />;
  } else if (!loading && isAuthenticated === false) {
    return <Redirect to="/loginfail" />;
  }

  if (!image) return <Spinner />;

  return (
    <Fragment>
      <LandingNav page="landing" />
      <Showcase image={`${imageUrl}${backdropSize}${image.backdrop_path}`} />
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  clearAlerts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { clearAlerts })(Landing);
