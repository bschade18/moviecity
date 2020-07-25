import React, { Fragment } from 'react';

const NotFound = () => (
  <Fragment>
    <h1 className="display-4 m-5">
      <i className="fas fa-exclamation-triangle" /> Page Not Found
    </h1>
    <p className="lead ml-5">Sorry, this page does not exist</p>
  </Fragment>
);

export default NotFound;
