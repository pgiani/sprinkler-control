import React, { Fragment, useState } from 'react';
import { Button, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import _sortBy from 'lodash/sortBy';
import { runMultitpleZones } from '../../components/racioApi';

async function runZones(e, setRunning) {
  // chang the button state imedaatly
  setRunning(true);

  const { zones, time } = e;
  const runZones = [];
  let zoneCounter = 1;
  const runTime = time * 60;
  // not going to run for less them 1 minute
  if (runTime < 60) return;
  // try to run them in the same order is there numbers
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
    const res = await runMultitpleZones(runZones);

    const { ok } = res;
    if (ok) {
      Swal.fire({
        icon: 'success',
        title: `Running all zones for ${time} minutes`,
        showConfirmButton: false,
        timer: 2500,
      });
      setTimeout(() => {
        setRunning(false);
      }, runTime * 1000);
    } else {
      setRunning(false);
    }
  }
}

const RunAllZones = props => {
  const [runnig, setRunning] = useState(false);
  const { location = {} } = props;
  const { state = {} } = location;
  const { data = {} } = state;
  const { id, name, zones } = data;

  console.log({ runnig }, '--- runnig ---');

  return (
    <div className="row">
      <div className="col-lg-8">
        <h2>{name}</h2>
      </div>
      <div className="col-lg-4">
        {runnig ? (
          <Button variant="primary">
            <i className="fa fa-refresh fa-spin fa-fw r10"></i>Running...
          </Button>
        ) : (
          <ButtonGroup>
            <DropdownButton
              as={ButtonGroup}
              title={
                <span>
                  <i className="fa fa-play r10 "></i>All Zones
                </span>
              }
              id="bg-nested-dropdown"
              onSelect={e => {
                runZones({ id, time: e, zones }, setRunning);
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
    </div>
  );
};

export default RunAllZones;
