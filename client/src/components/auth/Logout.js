import React from 'react';

function Logout(props) {
  return (
    <div onClick={props.logout} href="#" className="btn">
      Logout
    </div>
  );
}

export default Logout;
