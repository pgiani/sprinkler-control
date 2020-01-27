import React, { useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// import Navigation from './components/Navigation';

import Home from './Home';
import About from './About';
import Sample from './Sample';

const MyRoutes = props => {
  // you can only create history one
  // so put in on useState other wise you get You cannot change <Router routes>; it will be ignored
  const [myhistory, setMyhistory] = useState(createBrowserHistory());

  const { data } = props;
  return (
    <Router history={myhistory}>
      <Switch>
        <Route
          exact
          path="/"
          render={props => <Home {...props} data={data} />}
        />
        <Route path="/about" component={About} />
        <Route path="/sample" component={Sample} />
      </Switch>
    </Router>
  );
};

export default MyRoutes;
