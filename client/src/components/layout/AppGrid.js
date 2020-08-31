import React from 'react';
import UserSearch from '../elements/UserSearch';
import MobileNav from '../layout/MobileNav';
import Sidenav from '../layout/Sidenav';

const AppGrid = ({ component, children }) => {
  return (
    <div
      className={
        component === 'search'
          ? 'app-grid-search-container'
          : 'app-grid-container'
      }
    >
      <Sidenav />
      {children}
      <UserSearch />
      <MobileNav />
    </div>
  );
};

export default AppGrid;
