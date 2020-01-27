import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import _map from 'lodash/map';
import _sortBy from 'lodash/sortBy';
import OneZone from './OneZone';

const Zones = props => {
  const { location = {}, personId } = props;
  const { state = {} } = location;
  const { data = {} } = state;
  const { id, zones } = data;

  // if there is no Id send it back to home
  if (!id) {
    useHistory.push('/');
    return null;
  }
  // console.log({ zones }, 'Zonessss');
  const sortedZones = _sortBy(zones, ['zoneNumber']);
  return (
    <div className="container marketing">
      <div className="row">
        {_map(sortedZones, element => {
          const { id } = element;

          return <OneZone key={id} data={element} />;
        })}
      </div>
    </div>
  );
};

export default Zones;
