import React, { useState, useRef } from 'react';
import FontAwesome from 'react-fontawesome';

const SearchBar = ({ callback }) => {
  const [state, setState] = useState('');
  const timeOut = useRef(null);

  const doSearch = event => {
    const { value } = event.target;

    clearTimeout(timeOut.current);
    setState(value);

    timeOut.current = setTimeout(() => {
      callback(value);
    }, 500);
  };
  return (
    <div id="search-bar">
      <div className="search-bar-content">
        <input
          type="text"
          placeholder="search movie"
          onChange={doSearch}
          value={state}
          className="search-input"
        />
        <FontAwesome className="fa-search" name="search" size="2x" />
      </div>
    </div>
  );
};

export default SearchBar;
