import React from 'react';

const Grid = ({ header, children }) => (
  <div className="grid">
    <h1 className="grid-header">{header}</h1>
    <div className="grid-children">{children}</div>
  </div>
);

export default Grid;
