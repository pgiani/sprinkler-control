import React, { useState, useEffect } from 'react';
import _map from 'lodash/map';
import Zone from './Zone';

const Home = props => {
  const { data = {} } = props;
  const { devices = [] } = data;

  return (
    <div className="container marketing">
      <div className="row">
        {_map(devices, element => {
          const { id } = element;
          console.log(element);
          return <Zone key={id} data={element} />;
        })}
      </div>
    </div>
  );
};

export default Home;
