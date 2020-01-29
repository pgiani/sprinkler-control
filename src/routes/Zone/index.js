import React, { Fragment } from 'react';

import { Button } from 'react-bootstrap';
import _map from 'lodash/map';
import _sortBy from 'lodash/sortBy';
import OneZone from './OneZone';
import Headers from './Headers';
import history from '../history';

const Zones = props => {
  const { location = {} } = props;
  const { state = {} } = location;
  const { data = {} } = state;
  const { id, zones, status, name } = data;

  // if there is no Id send it back to home
  if (!id) {
    history.push('/devices');
    return null;
  }

  const sortedZones = _sortBy(zones, ['zoneNumber']);

  return (
    <Fragment>
      <Headers {...props} />
      <div className="container marketing t30">
        <br />

        <div className="row">
          {_map(sortedZones, element => {
            const { id } = element;
            return (
              <OneZone key={id} {...props} data={element} status={status} />
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Zones;
