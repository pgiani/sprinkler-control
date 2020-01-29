import React, { Fragment, useState } from 'react';
import {
  Button,
  DropdownButton,
  Dropdown,
  ButtonGroup,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import TimeAgo from 'react-timeago';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import _sortBy from 'lodash/sortBy';
import _find from 'lodash/find';
import { runMultitpleZones } from '../../components/racioApi';
import {
  isRunning,
  startRunning,
  stopRunning,
} from '../../components/RunZones';

async function runZones(e) {
  // chang the button state imedaatly

  const { id, zones, time, runningDevices = [], setRunningDevices } = e;
  const runZones = [];
  let zoneCounter = 1;
  const runTime = time * 60;

  // not going to run for less them 1 minute
  if (runTime < 60) return;

  // change the button state before sending the API call, update the UI now
  startRunning(e);
  // run them in the same order is there numbers
  const sortedZones = _sortBy(zones, ['zoneNumber']);
  _map(sortedZones, o => {
    const { id, enabled, maxRuntime } = o;

    // dont run disable zones, they must be disable for a reason
    if (!enabled) return;

    // make sure we dont run it for more then MaxRuntime
    // again must be a reason for this parameter
    if (runTime > maxRuntime) {
      runZones.push({ id, sortOrder: zoneCounter, duration: maxRuntime });
    }
    // all looks good we are going to run with the time reuqested
    else {
      runZones.push({ id, sortOrder: zoneCounter, duration: runTime });
    }
    zoneCounter++;
  });

  // check to make sure there are valid zones to run
  if (!_isEmpty(runZones)) {
    try {
      // await runMultitpleZones(runZones);
    } catch (err) {
      // stop the timer on API errors
      stopRunning(e);
    }
  } else {
    // stop the timer if there are no Zones to run
    stopRunning(e);
  }
}

const OffLine = props => (
  <Button variant="warning" disabled>
    <i className="fa fa-ban fa-fw r10"></i>Unavailable
  </Button>
);

const RunButton = props => {
  const { location = {}, runningDevices, setRunningDevices } = props;
  const { state = {} } = location;
  const { data = {} } = state;
  const { id, zones, status } = data;

  const runnig = isRunning({ runningDevices, id });
  console.log({ runnig }, '--- runnig ---');

  if (status === 'OFFLINE') return <OffLine />;
  return (
    <div>
      {runnig ? (
        <OverlayTrigger
          trigger="hover"
          placement="bottom"
          overlay={
            <Tooltip id={id}>
              Will end{' '}
              <strong>
                <TimeAgo date={runnig} minPeriod={10} />{' '}
              </strong>
              .
            </Tooltip>
          }
        >
          <Button variant="success">
            <i className="fa fa-refresh fa-spin fa-fw r10"></i>Running ...
          </Button>
        </OverlayTrigger>
      ) : (
        <ButtonGroup>
          <DropdownButton
            as={ButtonGroup}
            title={
              <span>
                <i className="fa fa-play r10 "></i>Run all
              </span>
            }
            id="bg-nested-dropdown"
            onSelect={e => {
              runZones({
                id,
                time: e,
                zones,
                runningDevices,
                setRunningDevices,
              });
            }}
          >
            <Dropdown.Item eventKey="1">1 minutes</Dropdown.Item>
            <Dropdown.Item eventKey="5">5 minutes</Dropdown.Item>
            <Dropdown.Item eventKey="10">10 minutes</Dropdown.Item>
            <Dropdown.Item eventKey="15">15 minutes</Dropdown.Item>
            <Dropdown.Item eventKey="20">20 minutes</Dropdown.Item>
            <Dropdown.Item eventKey="30">30 minutes</Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
      )}
    </div>
  );
};

export default RunButton;
