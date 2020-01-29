import React from 'react';
import _map from 'lodash/map';
import _sortBy from 'lodash/sortBy';

import Device from './Device';
import history from '../history';

const Home = props => {
  const { data = {}, location } = props;
  const { devices = [] } = data;
  const { pathname } = location;

  const sortedDevices = _sortBy(devices, ['name']);

  // work around for Github pages
  if (pathname !== '/devices') history.push('/devices');

  return (
    <div className="container marketing t30">
      <div className="row">
        {_map(sortedDevices, element => {
          const { id } = element;

          return <Device {...props} key={id} data={element} />;
        })}
      </div>
    </div>
  );
};

export default Home;
