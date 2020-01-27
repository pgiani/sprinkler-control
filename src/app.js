import React, { Fragment, useEffect, useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { createBrowserHistory } from 'history';

// import Navigation from './components/Navigation';
import Home from './routes/Home';
import About from './routes/About';
import Sample from './routes/Sample';
import BackRound from './components/BackRound';
import { getID, get } from './components/racioApi';

export const App = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [personId, setPersonId] = useState(false);
  const [devices, setDevices] = useState(false);

  console.log('1 Starting');

  useEffect(() => {
    // get the persoonID for further API calls
    getID(setPersonId, setIsError);
  }, []);

  useEffect(() => {
    return;
    // once we have the ID get the list of devices
    if (personId && !devices) {
      console.log('--------- Get Info *--------');
      get({ point: 'person', set: setDevices, personId, setIsError });
    }

    // check if we have every thing loaded
    if (personId && devices && isLoading) setIsLoading(false);
  }, [personId, devices, isLoading]);

  console.log({ personId, devices });
  const percentage = 66;

  return (
    <Fragment>
      <BackRound />
      {isLoading ? (
        <div className="container marketing">
          <div className="row">
            <div className="col-lg-4"> </div>
            <div className="col-lg-4">
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  // Rotation of path and trail, in number of turns (0-1)
                  rotation: 0.25,

                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: 'butt',

                  // Text size
                  textSize: '16px',

                  // How long animation takes to go from one percentage to another, in seconds
                  pathTransitionDuration: 0.5,

                  // Can specify path transition in more detail, or remove it entirely
                  // pathTransition: 'none',

                  // Colors
                  pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
                  textColor: '#ffff',
                  trailColor: '#d6d6d6',
                  backgroundColor: '#3e98c7',
                })}
              />
            </div>
            <div className="col-lg-4"> </div>
          </div>
        </div>
      ) : (
        <Router history={createBrowserHistory()}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/sample" component={Sample} />
          </Switch>
        </Router>
      )}
    </Fragment>
  );
};
