import React from 'react';
import UserSearch from '../elements/UserSearch';
import MobileNav from '../layout/MobileNav';
import Sidenav from '../layout/Sidenav';

const AppGrid = ({ component, children, showChat }) => {
  return (
    <div
      className={
        component === 'search'
          ? 'app-grid-search-container'
          : showChat
          ? 'app-grid-container-chat'
          : 'app-grid-container'
      }
    >
      <Sidenav component={component} />
      {children}
      <UserSearch />
      {showChat ? null : <MobileNav component={component} />}
    </div>
  );
};

export default AppGrid;
