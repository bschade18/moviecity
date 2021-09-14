import React, { useEffect, useState, Fragment } from 'react';
import api from '../../utils/api';
import Spinner from '../layout/Spinner';
import LandingNav from '../layout/LandingNav';
import Showcase from './Showcase';
import { clearAlerts } from '../../actions/alert';
import { imageUrl, backdropSize, popularBaseUrl } from '../../config';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Landing = ({ isAuthenticated, loading, clearAlerts }) => {
  const [showcaseImage, setShowcaseImage] = useState('');

  useEffect(() => {
    const getShowcaseImage = async () => {
      const { data } = await api.get(`${popularBaseUrl}&page=1`);
      setShowcaseImage(data.results[0]);
    };
    getShowcaseImage();
  }, []);

  if (isAuthenticated) {
    clearAlerts();
    return <Redirect to="/home" />;
  } else if (!loading && isAuthenticated === false) {
    return <Redirect to="/loginfail" />;
  }

  if (!showcaseImage) return <Spinner />;

  return (
    <Fragment>
      <LandingNav page="landing" />
      <Showcase
        image={`${imageUrl}${backdropSize}${showcaseImage.backdrop_path}`}
      />
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
