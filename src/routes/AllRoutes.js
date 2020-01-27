import React, { useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Navigation from '../components/Navigation';

import Home from './Home';
import Zone from './Zone';

const MyRoutes = props => {
  // you can only create history one
  // so put in on useState other wise you get You cannot change <Router routes>; it will be ignored
  const [myhistory, setMyhistory] = useState(createBrowserHistory());

  const { data } = props;
  return (
    <Router history={myhistory}>
      <Navigation {...props} data={data} />
      <Switch>
        <Route
          exact
          path="/"
          render={props => <Home {...props} data={data} />}
        />
        <Route path="/zone" render={props => <Zone {...props} data={data} />} />
      </Switch>
    </Router>
  );
};

export default MyRoutes;