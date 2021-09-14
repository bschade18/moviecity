import '../../styles/AppGrid.css';
import React from 'react';
import UserSearch from '../elements/UserSearch';
import MobileNav from '../layout/MobileNav';
import Sidenav from '../layout/Sidenav';

const AppGrid = ({ component, children, showChat }) => (
  <div
    className={
      component === 'search'
        ? 'app-grid-search'
        : showChat
        ? 'app-grid-chat'
        : 'app-grid'
    }
  >
    <Sidenav component={component} />
    {children}
    {component !== 'search' && <UserSearch />}
    {!showChat && <MobileNav component={component} />}
  </div>
);

export default AppGrid;
