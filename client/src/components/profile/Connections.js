import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Connections = ({ connections, setView }) =>
  connections.map(({ _id, username, photo }) => (
    <div key={_id} className="connections">
      <img
        className="user-nav-user-avatar"
        src={`/uploads/${photo}`}
        alt="user"
      />
      <Link
        onClick={() => setView('Reviews')}
        className="connections-user-link"
        to={`/${username}`}
      >
        <div className="connections-username">{username}</div>
      </Link>
    </div>
  ));

export default Connections;

Connections.propTypes = {
  connections: PropTypes.array.isRequired,
  setView: PropTypes.func.isRequired,
};
