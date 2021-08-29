import '../../styles/SearchBar.css';
import React, { useState, useRef } from 'react';
import FontAwesome from 'react-fontawesome';

const SearchBar = ({ callback }) => {
  const [state, setState] = useState('');
  const timeOut = useRef(null);

  const doSearch = (e) => {
    const { value } = e.target;

    clearTimeout(timeOut.current);
    setState(value);

    timeOut.current = setTimeout(() => {
      callback(value);
    }, 500);
  };
  return (
    <div className="search-bar">
      <div className="search-bar-content">
        <FontAwesome className="fa-search" name="search" size="2x" />
        <input
          type="text"
          placeholder="Search Movies"
          onChange={doSearch}
          value={state}
          className="search-bar-input"
        />
      </div>
    </div>
  );
};

export default SearchBar;
