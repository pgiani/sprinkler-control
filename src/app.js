import React, { Fragment, useEffect, useState } from 'react';

import MyRoutes from './routes/AllRoutes';
import Progress from './components/Progress';
import BackRound from './components/Back_Round';
import ErrorPage from './components/Error';
import _map from 'lodash/map';
import { checkExpiration } from './components/RunZones';

import { getID, get } from './components/racioApi';

export const App = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [personId, setPersonId] = useState(false);
  const [devices, setDevices] = useState(false);
  const [runningDevices, setRunningDevices] = useState([]);

  useEffect(() => {
    // get the personID for further API calls
    getID(setPersonId, setIsError);
  }, []);

  useEffect(() => {
    // once we have the ID get the list of devices
    if (personId && !devices) {
      get({ point: 'person', set: setDevices, personId, setIsError });
    }

    // check if we have every thing loaded
    if (personId && devices && isLoading) {
      // setUp a object with all devices and zone ID
      // to keep the UI update on runnig states
      const runningList = [];
      if (devices && devices.devices)
        _map(devices.devices, o => {
          const { zones, status, id } = o;
          runningList.push({
            status: status === 'ONLINE',
            id,
            type: 'device',
            expiration: null,
            parent: null,
            zoneNumber: -1,
          });
          _map(zones, z => {
            const { enabled, id: zooneId, zoneNumber, maxRuntime } = z;
            runningList.push({
              status: enabled,
              id: zooneId,
              type: 'zone',
              expiration: null,
              parent: id,
              zoneNumber,
              maxRuntime,
            });
          });
        });
      setRunningDevices(runningList);

      setIsLoading(false);
    }
  }, [personId, devices, isLoading]);

  // check timers that expired
  let interval = null;
  interval = setInterval(() => {
    if (personId && checkExpiration({ runningDevices, setRunningDevices })) {
      // if a timer has expired wait to pull changes
      setTimeout(() => {
        get({
          point: 'person',
          set: setDevices,
          personId,
          setIsError,
        });
      }, 30 * 1000);
    }
  }, 10 * 1000);

  useEffect(() => {
    // clear the timer on page unload
    return () => clearInterval(interval);
  }, []);

  if (isError) return <ErrorPage error={isError} />;

  return (
    <Fragment>
      <BackRound />
      {isLoading ? (
        <Progress />
      ) : (
        <MyRoutes
          data={devices}
          runningDevices={runningDevices}
          setRunningDevices={setRunningDevices}
          {...props}
        />
      )}
    </Fragment>
  );
};
