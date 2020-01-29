import React from 'react';
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
import _head from 'lodash/head';
import _size from 'lodash/size';
import _isEmpty from 'lodash/isEmpty';
import _sortBy from 'lodash/sortBy';
import _find from 'lodash/find';
import _filter from 'lodash/filter';

import {
  isRunning,
  startRunning,
  stopRunning,
} from '../../components/RunZones';

async function runZones(e) {
  // chang the button state imedaatly

  const { id, runningDevices, time } = e;
  const zones = _filter(runningDevices, o => id === o.id || id === o.parent);

  const runZones = [];
  let zoneCounter = 1;
  let runTime = time * 60;

  // not going to run for less them 1 minute
  if (runTime < 60) return;
  // max runtime is 3 hours
  if (runTime > 10800) runTime = 10800;
  // change the button state before sending the API call, update the UI now
  startRunning(e);
  // run them in the same order is there numbers
  const sortedZones = _sortBy(zones, ['zoneNumber']);
  _map(sortedZones, o => {
    const { id, status, maxRuntime, parent } = o;

    // dont run disable zones, they must be disable for a reason
    if (!status) return;
    // dont run the device it self just zones
    if (!parent) return;

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
      if (_size(runZones) > 1) {
        await runMultitpleZones(runZones);
      } else {
        const { id, duration } = _head(runZones);
        await runOneZone({ id, duration });
      }
    } catch (err) {
      // stop the timer on API errors
      stopRunning(e);
    }
  } else {
    // stop the timer if there are no Zones to run
    stopRunning(e);
  }
}

const OffLine = props => {
  const { size = 'lg' } = props;
  return (
    <Button variant="warning" size={size} disabled>
      <i className="fa fa-ban fa-fw r10"></i>Unavailable
    </Button>
  );
};

const RunButton = props => {
  const {
    runningDevices,
    setRunningDevices,
    title = '',
    titleRunning = '...',
    id,
    size = 'lg',
  } = props;

  const thisDeviceUnit = _find(runningDevices, { id });
  const { status } = thisDeviceUnit;

  const runnig = isRunning({ runningDevices, id });

  if (!status) return <OffLine size={size} />;
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
          <Button variant="success" size={size}>
            <i className="fa fa-refresh fa-spin fa-fw r10"></i>
            {titleRunning}
          </Button>
        </OverlayTrigger>
      ) : (
        <ButtonGroup>
          <DropdownButton
            size={size}
            as={ButtonGroup}
            title={
              <span>
                <i className="fa fa-play r10 "></i>
                {title}
              </span>
            }
            id="bg-nested-dropdown"
            onSelect={time => {
              runZones({
                id,
                time,
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
