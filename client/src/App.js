import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './routing/PrivateRoute';
import Landing from './components/landing/Landing';
import Home from './components/home/Home';
import Messages from './components/messages/Messages';
import Search from './components/movie_search/Search';
import Movie from './components/movie/Movie';
import Profile from './components/profile/Profile';
import LoginFail from './components/auth/LoginFail';
import Review from './components/review/Review';
import ResetPassword from './components/auth/ResetPassword';
import StartResetPassword from './components/auth/StartPasswordReset';
import SendPasswordReset from './components/auth/SendPasswordReset';

import NotFound from './components/layout/NotFound';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/loginfail" component={LoginFail} />
          <Route
            exact
            path="/account/reset_password/start"
            component={StartResetPassword}
          />
          <Route
            exact
            path="/account/reset_password/:token"
            component={ResetPassword}
          />
          <Route
            exact
            path="/account/send_password_reset"
            component={SendPasswordReset}
          />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/review/:id" component={Review} />
          <PrivateRoute exact path="/messages" component={Messages} />
          <PrivateRoute exact path="/search" component={Search} />
          <PrivateRoute exact path="/movie/:movieId" component={Movie} />
          <PrivateRoute exact path="/:username" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
