import React, { Fragment, useEffect, useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import { createBrowserHistory } from 'history';

// import Navigation from './components/Navigation';
import Home from './routes/Home';
import Progress from './components/progress';
import About from './routes/About';
import Sample from './routes/Sample';
import BackRound from './components/BackRound';
import ErrorPage from './components/error';
import { getID, get } from './components/racioApi';

export const App = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const [isError, setIsError] = useState(false);
  const [personId, setPersonId] = useState(false);
  const [devices, setDevices] = useState(false);

  console.log('1 Starting');

  useEffect(() => {
    // get the persoonID for further API calls
    setPercentage(10);
    getID(setPersonId, setIsError);
    setPercentage(20);
  }, []);

  useEffect(() => {
    setPercentage(50);

    // once we have the ID get the list of devices
    if (personId && !devices) {
      console.log('--------- Get Info *--------');
      get({ point: 'person', set: setDevices, personId, setIsError });
      setPercentage(75);
    }

    // check if we have every thing loaded
    if (personId && devices && isLoading) {
      setPercentage(99);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [personId, devices, isLoading]);

  console.log({ personId, devices });
  if (isError) return <ErrorPage error={isError} />;
  return (
    <Fragment>
      <BackRound />
      {isLoading ? (
        <Progress percentage={percentage} />
      ) : (
        <Router history={createBrowserHistory()}>
          <Switch>
            <Route
              exact
              path="/"
              component={Home}
              devices={devices}
              personId={personId}
            />
            <Route path="/about" component={About} />
            <Route path="/sample" component={Sample} />
          </Switch>
        </Router>
      )}
    </Fragment>
  );
};
