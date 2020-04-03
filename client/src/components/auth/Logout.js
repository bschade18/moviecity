import React from 'react';

function Logout(props) {
  return (
    <span onClick={props.logout} href="#" className="btn">
      Logout
    </span>
  );
}

export default Logout;
