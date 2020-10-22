import React from 'react';

const Grid = ({ header, children, component }) => (
  <div className='grid'>
    <h1 className="grid-header">{header}</h1>
    <div className={component ? 'grid-profile-children' : 'grid-children'}>{children}</div>
  </div>
);

export default Grid;
