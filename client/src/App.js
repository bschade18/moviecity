import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './components/pages/Home';
import Main from './components/pages/Main';
import Messages from './components/pages/Messages';
import Search from './components/pages/Search';
import Movie from './components/pages/Movie';
import UserHome from './components/pages/UserHome';
import Error from './components/Error';
import 'bootstrap/dist/css/bootstrap.min.css';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './routing/PrivateRoute';

import store from './store';

import './App.css';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <PrivateRoute exact path="/main" component={Main} />
            <PrivateRoute exact path="/messages" component={Messages} />
            <PrivateRoute exact path="/search" component={Search} />
            <PrivateRoute exact path="/:movieId" component={Movie} />
            <PrivateRoute exact path="/user/:user" component={UserHome} />
            <Route component={Error} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
