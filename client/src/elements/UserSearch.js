import React, { useState, useRef } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SearchBar = ({}) => {
  const [state, setState] = useState('');
  const [users, setUsers] = useState([]);

  const searchUsers = async (event) => {
    const { value } = event.target;
    if (value === '') {
      setUsers([]);
    } else {
      console.log(value);
      const res = await axios.get('/users');

      setUsers(res.data);
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
