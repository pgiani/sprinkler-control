import React, { useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Navigation from '../components/Navigation';
import history from './history';
import Home from './Devices';
import Zone from './Zone';

const MyRoutes = props => {
  // you can only create history one
  // so put in on useState other wise you get You cannot change <Router routes>; it will be ignored
  const [myhistory, setMyhistory] = useState(history);

  const { data, runningDevices, setRunningDevices } = props;
  return (
    <Router history={myhistory}>
      <Navigation {...props} data={data} />
      <Switch>
        <Route
          path="/"
          exact
          render={props => (
            <Home {...props} runningDevices={runningDevices} data={data} />
          )}
        />
        <Route
          exact
          path="/devices"
          render={props => (
            <Home {...props} runningDevices={runningDevices} data={data} />
          )}
        />
        <Route
          exact
          path="/zone"
          render={props => (
            <Zone
              {...props}
              runningDevices={runningDevices}
              setRunningDevices={setRunningDevices}
            />
          )}
        />
      </Switch>
    </Router>
  );
};

export default MyRoutes;
