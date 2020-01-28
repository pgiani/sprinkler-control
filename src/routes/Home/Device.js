import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import deviceImage from '../../assets/images/device.png';

const Device = props => {
  const { data = {} } = props;
  const { name, zones, status, on, id, model } = data;

  return (
    <div className="col-lg-4">
      <h3>{name}</h3>
      <img
        className={`img-responsive ${status === 'ONLINE' ? '' : 'zone_error'}`}
        src={deviceImage}
        alt="Generic placeholder image"
        width="200"
        height="140"
      />

      <p className="t15">
        {status === 'ONLINE' ? (
          <Link
            to={{
              pathname: '/zone',
              state: { data },
            }}
          >
            <Button variant="secondary" size="sm">
              <i className="fa fa-wifi text-success"> </i> View Zones
            </Button>
          </Link>
        ) : (
          <Link
            to={{
              pathname: '/zone',
              state: { data },
            }}
          >
            <Button variant="warning" size="sm">
              <i className="fa fa-ban   text-danger"></i>
              Troubleshot
            </Button>
          </Link>
        )}
      </p>
    </div>
  );
};

export default Device;
