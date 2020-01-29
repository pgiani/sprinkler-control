import React, { Fragment, useState } from 'react';
import { Button, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';

import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import _sortBy from 'lodash/sortBy';
import RunButton from './Run';

const Headers = props => {
  const { location = {} } = props;
  const { state = {} } = location;
  const { data = {} } = state;
  const { name, status, id } = data;

  return (
    <div className="row t30">
      <div className="col-lg-3">
        <h2 className="l15">{name}</h2>
      </div>
      <div className="col-lg-5">
        {status === 'OFFLINE' && (
          <div className="text-center alert alert-danger" role="alert">
            This device is off line, some features are disable.
          </div>
        )}
      </div>
      <div className="col-lg-3">
        <div className="pull-right r15">
          <RunButton
            {...props}
            title={'Run All'}
            titleRunning={'Running ...'}
            id={id}
          />
        </div>
      </div>
    </div>
  );
};

export default Headers;
