import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

import { runningCount } from '../../components/RunZones';
import moment from 'moment';

function getPopOver(e) {
  const { zones, active, lastRunning, data } = e;
  const { status, serialNumber, createDate } = data;
  console.log({ name, status, zones, active, lastRunning, data }, 'getPopOver');
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h4">
        <div className="text-center">
          {status === 'ONLINE' ? (
            <span className=" text-success"> Active</span>
          ) : (
            <span className="text-primaruy"> Inactive</span>
          )}
        </div>
      </Popover.Title>
      <Popover.Content>
        <small>Total zones</small>: <strong>{zones}</strong> <br />
        <small>Running zones</small>: <strong>{active}</strong> <br />
        {lastRunning && (
          <Fragment>
            <small>
              <span>
                Ending:
                <strong>
                  <TimeAgo date={lastRunning} minPeriod={10} />
                </strong>
              </span>
            </small>
            <br />
          </Fragment>
        )}
        <small>Serial</small>: <strong>{serialNumber} </strong>
        <br />
        <small>Since</small>:{' '}
        <strong>{moment(createDate).format('ll')} </strong> <br />
      </Popover.Content>
    </Popover>
  );
  return popover;
}
const Device = props => {
  const { data = {}, runningDevices } = props;
  const { name, status, id } = data;

  const { zones, active, lastRunning } = runningCount({ id, runningDevices });
  const deviceImageURL =
    status === 'ONLINE'
      ? 'https://res.cloudinary.com/pablo-giani/image/upload/v1580235798/device_p0ed9i.png'
      : 'https://res.cloudinary.com/pablo-giani/image/upload/v1580327092/device-red_wrrj8m.png';
  return (
    <div className="col-lg-4">
      <h3 className={`${status === 'ONLINE' ? 'text-dark' : 'text-muted'}`}>
        {name}
      </h3>
      <Link
        to={{
          pathname: '/zone',
          state: { data, name, id },
        }}
      >
        <OverlayTrigger
          trigger="hover"
          placement="left"
          overlay={getPopOver({ zones, active, lastRunning, data })}
        >
          <img
            className="img-responsive"
            src={deviceImageURL}
            alt="Generic placeholder image"
            width="200"
            height="140"
          />
        </OverlayTrigger>
        <p className="t15">
          {status === 'ONLINE' ? (
            <Button
              variant="secondary"
              size="sm"
              className={`${active && 'zone_ok'} `}
            >
              <i className="fa fa-wifi text-success"> </i> View Zones
            </Button>
          ) : (
            <Button variant="warning" size="sm">
              <i className="fa fa-ban   text-danger"></i>
              Troubleshot
            </Button>
          )}
        </p>
      </Link>
    </div>
  );
};

export default Device;
