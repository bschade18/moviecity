import React from 'react';
import PropTypes from 'prop-types';

const Inbox = ({ messagesList }) => (
  <div className="table-responsive">
    <table className="table table-hover mt-5 ml-auto mr-auto">
      <tbody>{messagesList()}</tbody>
    </table>
  </div>
);

Inbox.propTypes = {
  messagesList: PropTypes.func.isRequired,
};

export default Inbox;
