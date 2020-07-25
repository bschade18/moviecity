import React from 'react';

const Inbox = ({ messagesList }) => (
  <div className="table-responsive">
    <table className="table table-hover mt-5 ml-auto mr-auto">
      <tbody>{messagesList()}</tbody>
    </table>
  </div>
);

export default Inbox;
