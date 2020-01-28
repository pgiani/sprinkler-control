import React from 'react';
import _map from 'lodash/map';
import _sortBy from 'lodash/sortBy';

import Device from './Device';

const Home = props => {
  const { data = {}, location } = props;
  const { devices = [] } = data;
  console.log({ devices }, 'Home');
  const sortedDevices = _sortBy(devices, ['name']);

  return (
    <div className="container marketing t30">
      <div className="row">
        {_map(sortedDevices, element => {
          const { id } = element;

          return <Device key={id} data={element} />;
        })}
      </div>
    </div>
  );
};

export default Home;
