import React from 'react';
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

import store from './store';

import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/main" component={Main}></Route>
            <Route exact path="/messages" component={Messages}></Route>
            <Route exact path="/search" component={Search}></Route>
            <Route exact path="/:movieId" component={Movie}></Route>
            <Route exact path="/user/:user" component={UserHome}></Route>
            <Route component={Error} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
