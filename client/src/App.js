import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Home from './components/pages/Home';
import Main from './components/pages/Main';
import Messages from './components/pages/Messages';

import Error from './components/Error';
import Movie from './components/Movie';
import Search from './components/pages/Search';
import Profile from './components/Profile';
import UserHome from './components/pages/UserHome';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

import './App.css';

// change to functional component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      movies: null,
      pictures: [],
      description: [],
      titles: [],
      object: null,
      currentImage: '',
      currentOverview: '',
      currentTitle: '',
      isAuthenticated: null,
      user: null,
      isLoading: false,
      token: localStorage.getItem('token'),
    };
  }

  authSuccess = (user) => {
    this.setState({
      isAuthenticated: true,
      isLoading: true,
      user: user,
    });
    this.loadUser();
  };

  componentDidMount() {
    this.loadUser();
  }

  loadUser = () => {
    this.setState({
      isLoading: true,
    });

    axios
      .get('/auth/user', this.tokenConfig())
      .then((res) => this.userLoaded(res.data));
  };

  userLoaded = (user) => {
    this.setState({
      isAuthenticated: true,
      isLoading: false,
      user: user,
    });
  };

  tokenConfig = () => {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  };

  logout = () => {
    localStorage.removeItem('token');
    this.setState({
      isAuthenticated: false,
      user: null,
      token: null,
    });

    window.location = '/';
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <Home
                  {...props}
                  authSuccess={this.authSuccess}
                  isAuthenticated={this.state.isAuthenticated}
                  logout={this.logout}
                  user={this.state.user}
                />
              )}
            ></Route>

            <Route
              path="/main"
              render={(props) => (
                <Main
                  {...props}
                  movies={this.state.movies}
                  handleChange={this.handleChange}
                  search={this.state.search}
                  user={this.state.user}
                  logout={this.logout}
                  isAuthenticated={this.state.isAuthenticated}
                  isLoading={this.state.isLoading}
                />
              )}
            ></Route>
            <Route
              exact
              path="/messages"
              render={(props) => <Messages {...props} user={this.state.user} />}
            ></Route>
            <Route
              exact
              path="/search"
              render={(props) => <Search {...props} />}
            ></Route>
            <Route
              path="/profile"
              render={(props) => <Profile {...props} user={this.state.user} />}
            ></Route>
            <Route
              exact
              path="/:movieId"
              render={(props) => <Movie {...props} user={this.state.user} />}
            ></Route>
            <Route
              exact
              path="/user/:user"
              render={(props) => (
                <UserHome
                  {...props}
                  movies={this.state.movies}
                  logout={this.logout}
                  user={this.state.user}
                  loadUser={this.loadUser}
                />
              )}
            ></Route>

            <Route component={Error} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
