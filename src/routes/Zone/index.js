import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import _map from 'lodash/map';
import _sortBy from 'lodash/sortBy';
import OneZone from './OneZone';
import RunAllZones from './RunAllZonez';
const Zones = props => {
  const { location = {} } = props;
  const { state = {} } = location;
  const { data = {} } = state;
  const { id, zones, status } = data;

  // if there is no Id send it back to home
  if (!id) {
    useHistory.push('/');
    return null;
  }
  console.log({ status }, 'Zonessss');
  const sortedZones = _sortBy(zones, ['zoneNumber']);

  return (
    <div className="container marketing t30">
      {status === 'OFFLINE' && (
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <div className="alert alert-danger" role="alert">
              This device is off line, some features are disable.
            </div>{' '}
          </div>
          <div className="col-lg-4"></div>
        </div>
      )}

      {status === 'ONLINE' && <RunAllZones {...props} />}

      <br />

      <div className="row">
        {_map(sortedZones, element => {
          const { id } = element;
          return <OneZone key={id} data={element} status={status} />;
        })}
      </div>
    </div>
  );
};

export default Zones;
