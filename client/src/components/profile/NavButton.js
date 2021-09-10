import React from 'react';

const NavButton = ({ listName, view, setView }) => {
  return (
    <div
      onClick={() => setView(listName)}
      className={
        'btn btn-outline-success btn-pill  mr-sm-2 ' +
        (view === listName && 'active')
      }
    >
      {listName}
    </div>
  );
};

export default NavButton;
