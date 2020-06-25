import React from 'react';

const Inbox = ({ messagesList }) => (
  <div className="table-responsive">
    <table className="table table-hover mt-5">
      <thead>
        <tr>
          <th>Sender</th>
          <th>Movie</th>
          <th>Title</th>
          <th className="movie-table-message">Message</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{messagesList()}</tbody>
    </table>
  </div>
);

export default Inbox;
