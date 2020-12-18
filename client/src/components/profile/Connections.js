import React from 'react';

const Connections = ({ connections }) =>
  connections.map(({ _id, username, photo }) => (
    <div key={_id} className="connections">
      <img
        className="user-nav-user-avatar"
        src={`/uploads/${photo}`}
        alt="user"
      />
      <div>{username}</div>
    </div>
  ));

export default Connections;
