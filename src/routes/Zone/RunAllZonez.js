import React, { Fragment } from 'react';
import { Button, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import _sortBy from 'lodash/sortBy';
import { runMultitpleZones } from '../../components/racioApi';

const RunAllZones = props => {
  const { location = {} } = props;
  const { state = {} } = location;
  const { data = {} } = state;
  const { id, name, zones } = data;
  console.log(data);

  const RunAllZones = e => {
    const { id, zones, time } = e;

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
      const res = runMultitpleZones(runZones);
      console.log('RunAllZones', { id, time, runZones, res });
    }
  };

  return (
    <div className="row">
      <div className="col-lg-8">
        <h2>{name}</h2>
      </div>
      <div className="col-lg-4">
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
              console.log({ e }, 'onSelect');
              RunAllZones({ id, time: e, zones });
            }}
          >
            <Dropdown.Item eventKey="5">5 minutes</Dropdown.Item>
            <Dropdown.Item eventKey="10">10 minutes</Dropdown.Item>
            <Dropdown.Item eventKey="15">15 minutes</Dropdown.Item>
            <Dropdown.Item eventKey="20">20 minutes</Dropdown.Item>
            <Dropdown.Item eventKey="30">30 minutes</Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default RunAllZones;
