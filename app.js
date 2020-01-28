import React, { Fragment, useEffect, useState } from 'react';

import MyRoutes from './src/routes/AllRoutes';
import Progress from './src/components/Progress';
import BackRound from './src/components/Back_Round';
import ErrorPage from './src/components/Error';
import { getID, get } from './src/components/racioApi';

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
        <Progress percentage={percentage} />
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
