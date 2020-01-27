import React from 'react';
import _map from 'lodash/map';
import Device from './Device';

const Home = props => {
  const { data = {} } = props;
  const { devices = [] } = data;

  return (
    <div className="container marketing">
      <div className="row">
        {_map(devices, element => {
          const { id } = element;

          return <Device key={id} data={element} />;
        })}
      </div>
    </div>
  );
};

export default Home;
