import React, { useEffect, useState, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import LandingNav from '../layout/LandingNav';
import Showcase from '../elements/Showcase';
import { imageUrl, backdropSize, popularBaseUrl } from '../../config';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Landing = ({ isAuthenticated, loading, alerts }) => {
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
    <Fragment>
      <LandingNav page="landing" />
      <Showcase image={`${imageUrl}${backdropSize}${image.backdrop_path}`} />
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  alerts: PropTypes.array,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  alerts: state.alert,
});

export default connect(mapStateToProps, {})(Landing);
