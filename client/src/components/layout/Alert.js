import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ field, alerts }) => {
  if (alerts.filter((alert) => alert.param === field).length) {
    const msg = alerts.filter((alert) => alert.param === field)[0].msg;
    return <p className="error">{msg}</p>;
  } else {
    return <p></p>;
  }
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert.alerts,
});

export default connect(mapStateToProps)(Alert);
