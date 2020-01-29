import React, { Fragment } from 'react';
import moment from 'moment';
import { Popover } from 'react-bootstrap';

export function getPopOver(data) {
  const {
    enabled,
    zoneNumber,
    rootZoneDepth,
    availableWater = 0,
    customCrop = {},
    lastWateredDate,
    lastWateredDuration,
  } = data;
  const { name: cropName } = customCrop;
  let runningTime = '';
  if (lastWateredDuration) {
    const minutes = lastWateredDuration;
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    runningTime = `${minutes} minutes`;
    if (minutes / 60 > 1) runningTime = `${hours} hours`;
    if (minutes / 60 / 24 > 1) runningTime = `${days} days`;
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h4" className="text-center">
        <strong>Zone</strong>: {zoneNumber} (
        {enabled ? (
          <span className="text-primary"> Enable</span>
        ) : (
          <span className="text-danger"> Disable</span>
        )}{' '}
        )  
      </Popover.Title>
      <Popover.Content>
        <span>
          <small>Last run</small>: {moment(lastWateredDate).format('ll')}
        </span>
        <br />
        {lastWateredDuration && (
          <Fragment>
            <span>
              <small>Duration</small>: {runningTime}
            </span>
            <br />
          </Fragment>
        )}
        <span>
          <small>Crop</small>: {cropName}
        </span>
        <br />
        <span>
          <small>Root depth</small>: {rootZoneDepth}
        </span>
        <br />
        <span>
          <small>Available water</small>:{' '}
          {parseFloat(availableWater).toFixed(2)}
        </span>
      </Popover.Content>
    </Popover>
  );
  return popover;
}
