import React, { Fragment, useEffect, useState } from 'react';

import MyRoutes from './routes/AllRoutes';
import Progress from './components/Progress';
import BackRound from './components/Back_Round';
import ErrorPage from './components/Error';
import Navigation from './components/Navigation';
import { getID, get } from './components/racioApi';

export const App = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const [isError, setIsError] = useState(false);
  const [personId, setPersonId] = useState(false);
  const [devices, setDevices] = useState(false);

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

  if (isError) return <ErrorPage error={isError} />;
  return (
    <Fragment>
      <BackRound />
      {isLoading ? (
        <Fragment>
          <nav className="site-header sticky-top py-1">
            <div className="container d-flex flex-column flex-md-row justify-content-between">
              <div className="py-2 d-none d-md-inline-block"> Devices </div>
            </div>
          </nav>
          <h1 className="text-center t30">
            Communicating with your devices...
          </h1>

          <div className=" t30">
            <Progress percentage={percentage} />
          </div>
        </Fragment>
      ) : (
        <MyRoutes
          personId={personId}
          data={devices}
          personId={personId}
          {...props}
        />
      )}
    </Fragment>
  );
};
