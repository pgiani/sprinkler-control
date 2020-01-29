import React, { Fragment } from 'react';
import _truncate from 'lodash/truncate';
import TimeAgo from 'react-timeago';
import { Button, OverlayTrigger } from 'react-bootstrap';
import Img from 'react-image';
import VisibilitySensor from 'react-visibility-sensor';
import loadingImage from '../../assets/images/loadingZone.jpg';
import { getPopOver } from './tools';
import RunButton from './Run';
const Zone = props => {
  const { data = {}, status } = props;
  const {
    name,
    enabled,
    imageUrl,
    id,
    lastWateredDate,
    lastWateredDuration,
  } = data;

  let runningTime = '';
  if (lastWateredDuration) {
    const minutes = lastWateredDuration;
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    runningTime = `( ${minutes} min.)`;
    if (minutes / 60 > 1) runningTime = `( ${hours} hours.)`;
    if (minutes / 60 / 24 > 1) runningTime = `( ${days} days.)`;
  }

  return (
    <div className="col-lg-4">
      <h3 className="text-dark">
        {_truncate(name, {
          length: 18,
          separator: ' ',
        })}
      </h3>

      <VisibilitySensor>
        <OverlayTrigger
          trigger="hover"
          placement="bottom"
          overlay={getPopOver(data)}
        >
          <Img
            src={imageUrl}
            decode={false}
            className={`${
              enabled ? 'zone_ok' : 'zone_error'
            } rounded-circle ZoneBorder`}
            alt={name}
            width="140"
            height="140"
            loader={
              <img
                className="  rounded-circle"
                src={loadingImage}
                alt={name}
                width="140"
                height="140"
              />
            }
          />
        </OverlayTrigger>
      </VisibilitySensor>

      <div className="t10">
        {enabled && status === 'ONLINE' ? (
          <Fragment>
            <small className="text-dark">
              <i className="fa fa-tint text-primary r5" aria-hidden="true"></i>
              <TimeAgo date={lastWateredDate} minPeriod={5} />
              {runningTime}
            </small>
            <RunButton {...props} size={'sm'} id={id} />
          </Fragment>
        ) : (
          <small className="text-dark">
            <i className="fa fa-tint text-primary r5" aria-hidden="true"></i>
            <TimeAgo date={lastWateredDate} minPeriod={30} /> {runningTime}
          </small>
        )}
      </div>
    </div>
  );
};

export default Zone;
