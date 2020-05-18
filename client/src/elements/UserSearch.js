import React, { useState, useRef } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SearchBar = ({}) => {
  const [state, setState] = useState('');
  const [users, setUsers] = useState([]);
  const timeOut = useRef(null);

  const searchUsers = (event) => {
    const { value } = event.target;
    clearTimeout(timeOut.current);
    if (value === '') {
      setUsers([]);
    } else {
      timeOut.current = setTimeout(async () => {
        const res = await axios.get('/users');
        setUsers(res.data);
      }, 500);
    }
    setState(value);
  };

  const filtered = () => {
    return users.filter((user) => {
      const regex = new RegExp(state, 'gi');
      return user.name.match(regex);
    });
  };
  return (
    <div id="user-search">
      <div>
        <input
          type="text"
          placeholder="Find Friends"
          onChange={searchUsers}
          value={state}
          className="form-control"
        />
        {/* <FontAwesome className="fa-search" name="search" /> */}
      </div>
      <div>
        {users[0] &&
          filtered().map((user) => (
            <div id="user-search-box">
              <Link id="user-search-link" to={`/user/${user.name}`}>
                <div>{user.name}</div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchBar;
